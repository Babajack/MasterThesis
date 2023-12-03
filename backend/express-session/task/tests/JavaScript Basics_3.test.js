import { multiply, calculator, counter } from "../src/index.js";

test("Task 1: multiply returns the correct result", () => {
	expect(multiply(5, 3)).toBe(15);
	expect(multiply(1512, 165561)).toBe(1512 * 165561);
});

test("Task 1: multiply is an arrow function", () => {
	const fnString = multiply.toString();
	expect(fnString).toContain("=>");
});

test("Task 2: add method adds two numbers", () => {
	expect(calculator.add(2, 3)).toBe(5);
});

test("Task 2: subtract method subtracts two numbers", () => {
	expect(calculator.subtract(5, 2)).toBe(3);
});

test("Task 2: multiply method multiplies two numbers", () => {
	expect(calculator.multiply(2, 3)).toBe(6);
});

test("Task 2: divide method divides two numbers", () => {
	expect(calculator.divide(6, 2)).toBe(3);
});

test("Task 2: arrow functions are used", () => {
	const add = calculator.add.toString();
	expect(add.includes("=>")).toBe(true);

	const subtract = calculator.subtract.toString();
	expect(subtract.includes("=>")).toBe(true);

	const multiply = calculator.multiply.toString();
	expect(multiply.includes("=>")).toBe(true);

	const divide = calculator.divide.toString();
	expect(divide.includes("=>")).toBe(true);
});

test("Task 3: increment increases the count of counter by 1", () => {
	const count = counter.count;
	counter.increment();
	expect(counter.count).toBe(count + 1);
});
