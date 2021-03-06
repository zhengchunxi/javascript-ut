/**
 * describe函数 一个测试组（suite）开始于Jasmine 的describe函数。 describe函数有两个参数:
 *     第一个参数：测试组的描述信息 
 *     第二个参数：组测组的具体实现函数代码块（具体的干活）
 * 
 * it函数 具体的一个测试规格（Spec）开始于一个it中。 it有两个参数： 
 *     第一个参数：对于这个规格测试的描述信息 
 *     第二个参数：这个规格测试的具体实现,若不带，则跳过该it
 *     
 * expect函数:expect函数是一个于预期值进行匹配的匹配连。
 * 
 * 禁用测试组和测试规格(测试用例) 使用xdescribe禁用测试组 使用xit禁用测试用例
 * 使用pending();忽略it的测试结果
 */
describe("test add.js", function() {
	it("test add success", function() {
		expect(add(1, 2)).toEqual(3);
		expect(add(1, 2)).not.toEqual(4);
	});
	
	it("should work for objects", function() {
		var x = {a : 12,b : 34};
		var y = {a : 12,b : 34};
		var z = {a : 12,b : 35};
		expect(x).toEqual(y);
		expect(x).not.toEqual(z);
	});
	
	it("The 'toContain' matcher is for finding an item in an Array",function() {
		var a = [ "foo", "bar", "baz" ];
		expect(a).toContain("bar");
		expect(a).not.toContain("quux");
	});
});


describe("A spec with nested inside", function() {
	var foo;
	beforeAll(function(){
		console.log('beforeAll')
		this.x = 'Another way to share variables between a beforeEach, it, and afterEach is through the this keyword'
	});
	
	afterAll(function(){
		console.log(this.x)
		console.log('afterAll')
	});
	
	beforeEach(function() {
		foo = 0;
		foo += 1;
	});

	afterEach(function() {
		foo = 0;
	});

	it("is just a function, so it can contain any code", function() {
		expect(foo).toEqual(1);
	});

	describe("nested inside a second describe", function() {
		var bar;

		beforeEach(function() {
			bar = 1;
		});

		it("can reference both scopes as needed", function() {
			expect(foo).toEqual(bar);
		});
	});
});

xdescribe("A xdescribe spec", function() {
	var foo;
	beforeEach(function() {
		foo = 0;
		foo += 1;
	});

	it("is just a function, so it can contain any code", function() {
		expect(foo).toEqual(1);
	});
});

describe("Pending specs", function() {
	xit("can be declared 'xit'", function() {
		expect(true).toBe(false);
	});
	it("can be declared with 'it' but without a function");
	it("can be declared by calling 'pending' in the spec body", function() {
		expect(true).toBe(false);
		pending();
	});
});


describe("jasmine has test double functions called spies. A spy can stub any function and tracks calls to it and all arguments. A spy only exists in the describe or it block in which it is defined, and will be removed after each spec. There are special matchers for interacting with spies. ", function() {
	  var foo, bar = null;

	  beforeEach(function() {
	    foo = {
	      setBar: function(value) {
	        bar = value;
	      }
	    };

	    spyOn(foo, 'setBar');

	    foo.setBar(123);
	    foo.setBar(456, 'another param');
	  });

	  it("tracks that the spy was called", function() {
	    expect(foo.setBar).toHaveBeenCalled();
	  });

	  it("tracks that the spy was called x times", function() {
	    expect(foo.setBar).toHaveBeenCalledTimes(2);
	  });

	  it("tracks all the arguments of its calls", function() {
	    expect(foo.setBar).toHaveBeenCalledWith(123);
	    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	  });

	  it("stops all execution on a function", function() {
	    expect(bar).toBeNull();
	  });
	});