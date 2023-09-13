import { resultNum, resultObj1, resultObj2 } from "../src/index.js";

test("resultNum has the correct value", () => {
	expect(resultNum).toBe(10);
});

test("resultObj1 has the correct value", () => {
	expect(resultObj1).toEqual({ value: "changed" });
});

test("resultObj2 has the correct value", () => {
	expect(resultObj2).toEqual({ value: "unchanged" });
});
