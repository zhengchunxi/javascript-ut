/**
 * describe函数 一个测试组（suite）开始于Jasmine 的describe函数。 describe函数有两个参数:
 * 第一个参数：测试组的描述信息 第二个参数：组测组的具体实现函数代码块（具体的干活）
 * 
 * it函数 具体的一个测试规格（Spec）开始于一个it中。 it有两个参数： 第一个参数：对于这个规格测试的描述信息 第二个参数：这个规格测试的具体实现
 * expect函数:expect函数是一个于预期值进行匹配的匹配连。
 * 
 * 禁用测试组和测试规格(测试用例) 使用xdescribe禁用测试组 使用xit禁用测试用例
 */
describe("test add", function() {
	it("add success", function() {
		expect(add(1, 2)).toEqual(3);
	});

	xit("add failure", function() {
		expect(add(1, 2)).toEqual(4);
	});
});

describe("test objects",function() {
	it("should work for objects", function() {
		var foo = {a : 12,b : 34};
		var bar = {a : 12,b : 34
		};
		expect(foo).toEqual(bar);
	});

	it("The 'toMatch' matcher is for regular expressions", function() {
		var message = "foo bar baz";
		expect(message).toMatch(/bar/);
		expect(message).toMatch("bar");
		expect(message).not.toMatch(/quux/);
	});

	it("The 'toBeDefined/toBeUndefined' matcher compares against `undefined`",function() {
		var a = {foo : "foo"};
		expect(a.foo).toBeDefined();
		expect(a.bar).not.toBeDefined();
		expect(a.foo).not.toBeUndefined();
		expect(a.bar).toBeUndefined();
	});

	it("The 'toBeNull' matcher compares against null", function() {
		var a = null;
		var foo = "foo";
	
		expect(null).toBeNull();
		expect(a).toBeNull();
		expect(foo).not.toBeNull();
	});

	it("The 'toBeTruthy' matcher is for boolean casting testing",function() {
		var a, foo = "foo";
		expect(foo).toBeTruthy();
		expect(a).not.toBeTruthy();
	});

	it("The 'toBeFalsy' matcher is for boolean casting testing",function() {
		var a, foo = "foo";
		expect(a).toBeFalsy();
		expect(foo).not.toBeFalsy();
	});

	it("The 'toContain' matcher is for finding an item in an Array",function() {
		var a = [ "foo", "bar", "baz" ];
		expect(a).toContain("bar");
		expect(a).not.toContain("quux");
	});

	it("The 'toBeLessThan' matcher is for mathematical comparisons",function() {
		var pi = 3.1415926, e = 2.78;

		expect(e).toBeLessThan(pi);
		expect(pi).not.toBeLessThan(e);
	});

	it("The 'toBeGreaterThan' matcher is for mathematical comparisons",function() {
		var pi = 3.1415926, e = 2.78;
		expect(pi).toBeGreaterThan(e);
		expect(e).not.toBeGreaterThan(pi);
	});

	it("The 'toBeCloseTo' matcher is for precision math comparison",function() {
		var pi = 3.1415926, e = 2.78;
		expect(pi).not.toBeCloseTo(e, 2);
		expect(pi).toBeCloseTo(e, 0);
	});

	it("The 'toThrow' matcher is for testing if a function throws an exception",function() {
		var foo = function() {
			return 1 + 2;
		};
		var bar = function() {
			return a + 1;
		};

		expect(foo).not.toThrow();
		expect(bar).toThrow();
	});

	it("The 'toThrowError' matcher is for testing a specific thrown exception",function() {
		var foo = function() {
			throw new TypeError("foo bar baz");
		};
		expect(foo).toThrowError("foo bar baz");
		expect(foo).toThrowError(/bar/);
		expect(foo).toThrowError(TypeError);
		expect(foo).toThrowError(TypeError, "foo bar baz");
	});
});

describe("A spec (with setup and tear-down)", function() {
	var foo;

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

	it("can have more than one expectation", function() {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});
});

describe("A spec for this",function() {
	beforeEach(function() {
		this.foo = 0;
	});

	it("can use the `this` to share state", function() {
		expect(this.foo).toEqual(0);
		this.bar = "test pollution?";
	});

	it("prevents test pollution by having an empty `this` created for the next spec",function() {
		expect(this.foo).toEqual(0);
		expect(this.bar).toBe(undefined);
	});
});

describe("A spec with nested inside", function() {
	var foo;

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

	it("can have more than one expectation", function() {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
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

xdescribe("A spec", function() {
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