import {
	result1,
	result2,
	result3,
	result4,
	result5,
	result6,
	getName1,
	getName2,
} from "../src/index.js";

test("result1 has the correct value", () => {
	expect(result1).toBe("Hello");
});

test("result2 has the correct value", () => {
	expect(result2).toBe("");
});

test("result3 has the correct value", () => {
	expect(result3).toBe(undefined);
});

test("result4 has the correct value", () => {
	expect(result4).toBe("Hi");
});

test("result5 has the correct value", () => {
	expect(result5).toBe(0);
});

test("result6 has the correct value", () => {
	expect(result6).toBe("");
});

test("getName1 returns the correct value", () => {
	expect(getName1("Hans")).toBe("Hans");
	expect(getName1("")).toBe("Guest");
	expect(getName1(undefined)).toBe("Guest");
});

test("getName2 uses logical OR operator", () => {
	const functionBody = getName1.toString();
	expect(hasLogicalOR(functionBody)).toBe(true);
});

test("getName2 returns the correct value", () => {
	expect(getName2(true, "Hans")).toBe("Hans");
	expect(getName2(false, "Hans")).toBe(false);
});

test("getName2 uses logical AND operator", () => {
	const functionBody = getName2.toString();
	expect(hasLogicalAnd(functionBody)).toBe(true);
});

function hasLogicalAnd(code) {
	return /\&\&/.test(code);
}

function hasLogicalOR(code) {
	return /\|\|/.test(code);
}
