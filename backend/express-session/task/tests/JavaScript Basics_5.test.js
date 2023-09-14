import { fun1, fun2, fun3, fun4, fun5, fun6, fun7, fun8 } from "../src/index.js";

test("fun1 merges objects", () => {
	expect(fun1({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
});

test("fun2 updates car owner", () => {
	const car = { brand: "BMW", hp: 300, owner: { firstname: "John", lastname: "Doe" } };
	expect(fun2(car)).toEqual({
		brand: "BMW",
		hp: 300,
		owner: { firstname: "Lars", lastname: "Stock" },
	});
});

test("fun3 deep copies car object", () => {
	const car = { brand: "Audi", hp: 200, owner: { firstname: "Jane", lastname: "Doe" } };
	expect(fun3(car)).toEqual(car);
	expect(fun3(car)).not.toBe(car);
});

test("fun4 merges arrays", () => {
	expect(fun4([1, 2, 3], [4, 5])).toEqual([1, 4, 5, 2, 3]);
});

test("fun5 returns brand and hp", () => {
	const car = { brand: "Mercedes", hp: 250, owner: { firstname: "Bob", lastname: "Smith" } };
	expect(fun5(car)).toEqual(["Mercedes", 250]);
});

test("fun6 returns firstname and lastname", () => {
	const car = { brand: "Tesla", hp: 450, owner: { firstname: "Elon", lastname: "Musk" } };
	expect(fun6(car)).toEqual(["Elon", "Musk"]);
});

test("fun7 removes the first element from an array", () => {
	expect(fun7([1, 2, 3, 4])).toEqual([2, 3, 4]);
});

test("fun8 swaps values", () => {
	expect(fun8(1, 2)).toEqual([2, 1]);
});

test("fun1 uses spread operator", () => {
	expect(fun1.toString()).toContain("...");
});

test("fun2 uses spread operator", () => {
	expect(fun2.toString()).toContain("...");
});

test("fun3 uses spread operator", () => {
	expect(fun3.toString()).toContain("...");
});

test("fun4 uses spread operator", () => {
	expect(fun4.toString()).toContain("...");
});

test("fun5 uses object destructuring", () => {
	const fun5String = fun5.toString();
	const fun5Body = fun5String.substring(fun5String.indexOf("{") + 1, fun5String.lastIndexOf("}"));
	if (fun5String.includes("=>")) {
		expect(fun5String).toContain("{");
		expect(fun5String).toContain("}");
	} else {
		expect(fun5Body).toContain("{");
		expect(fun5Body).toContain("}");
	}
});

test("fun6 uses object destructuring", () => {
	const fun6String = fun6.toString();
	const fun6Body = fun6String.substring(fun6String.indexOf("{") + 1, fun6String.lastIndexOf("}"));

	expect(fun6Body).toContain("{");
	expect(fun6Body).toContain("}");
});

test("fun7 uses object destructuring", () => {
	const fun7String = fun7.toString();

	expect(fun7String).toContain("[");
	expect(fun7String).toContain("]");
});

test("fun8 uses object destructuring", () => {
	const fun8String = fun8.toString();

	expect(fun8String).toContain("[");
	expect(fun8String).toContain("]");
});
