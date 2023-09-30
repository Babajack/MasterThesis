import { expectedResult1, expectedResult2, expectedResult3 } from "../src/App";

test("TrickyCounter", () => {
	expect(String(expectedResult1)).toBe("2");
});

test("EvenMoreTrickyCounter", () => {
	expect(String(expectedResult2)).toBe("1");
});

test("DelayedNameUpdate", () => {
	expect(expectedResult3).toBe("Alice");
});
