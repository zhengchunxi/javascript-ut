#!/bin/bash
# Author: zhengchunxi

# 获得当前分支,排除master和dev分支
remote='master'
branch=`git branch | grep -v master | grep -v $remote | grep \* | awk '{print $2}'`
comments=$1

RED="\033[31m"      #红
GREEN="\033[1;32m"  #绿
YELLOW="\033[1;33m" #黄
BLUE="\033[1;34m"   #蓝
PINK="\033[1;35m"   #粉红
RES="\033[0m"       #
do_echo(){
    echo -e "$2$1$RES"
}

# 如果获取的分支为空,说明没有切换到自己的分支
if [ -z $branch ];then
	do_echo 'You are on the defalut branch,Please checkout a new branch for yourself and then you can continue' $YELLOW
	exit -1
fi


# 查看当前状态
do_echo '................git status................' $BLUE
git status

# 同步
do_echo '................git pull................' $BLUE
git pull origin $remote
if [ $? != 0 ];then
    do_echo '................pull error................' $RED
    do_echo 'exit with code -1' $RED
    exit -1
fi

# 获取更新，如果有更新commit=true。后面才会提交
key="新文件:|修改:|删除:|modified:"
updates=$(git status | grep -E "$key" | awk '{print $2}')
commit=false
if [ "$updates" ];then
  adds=`git status | grep  -E "$key" | awk '{print $2}'`
  do_echo "................git add -all $adds"  $BLUE
  git status | grep  -E "$key" | awk '{print $2}'| xargs git add --all
  commit=true
fi


# 如果没有添加comments,不允许提交
if [ -z "$comments" ];then
	do_echo 'Please add comments for git.............' $YELLOW
    exit -1
fi

# 如果有新加的文件，需要将文件路径作为非第一个参数传入，建议用引号引起来
if [ $# -ge 2 ];then
    i=0
	git_status=`git status`
	for path in "$@"; do
        i=`expr 1 + $i`
        if [ "$i" -le 1 ];then
            continue
		else
		    is_new=`echo $git_status | grep $path`
		    if [ -n `$is_new` ];then
		        if [ -f "$path" ] || [ -d "$path" ];then
		            do_echo '................git add -all '$path $PINK
	            	git add  --all $path
                   commit=true
			    else
		            do_echo "$path not exisit" $YELLOW
		        fi
		    fi
		fi
		shift
	done
fi

# 如果没有添加comments,不允许提交
if [ "$#" -lt 1 ];then
    do_echo 'Please add comments for git.............' $YELLOW
    exit -1
fi

if [ "$commit" = true ];then
	do_echo "................git commit -m '$comments'" $BLUE
    git commit -m "$1"
	# 推送到远程自己的分支
	do_echo "\n................git push origin $branch................" $BLUE
	git push origin $branch
fi

git status
result=`git status | wc -l`
if [ "$result" -eq 2 ] || [ "$result" -eq 4 ];then
    do_echo '................success................' $GREEN
fi
