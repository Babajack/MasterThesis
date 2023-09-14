import {
	map1,
	map2,
	map3,
	map4,
	filter1,
	filter2,
	filter3,
	reduce1,
	reduce2,
	reduce3,
	find1,
	find2,
	sort1,
	sort2,
} from "../src/index.js";

// Spy on higher-order functions
const mapSpy = jest.spyOn(Array.prototype, "map");
const filterSpy = jest.spyOn(Array.prototype, "filter");
const reduceSpy = jest.spyOn(Array.prototype, "reduce");
const findSpy = jest.spyOn(Array.prototype, "find");
const sortSpy = jest.spyOn(Array.prototype, "sort");

// Reset the spies after each test
afterEach(() => {
	mapSpy.mockClear();
	filterSpy.mockClear();
	reduceSpy.mockClear();
	findSpy.mockClear();
	sortSpy.mockClear();
});

// Tests for map functions
test("map1 squares numbers", () => {
	expect(map1([1, 2, 3])).toEqual([1, 4, 9]);
});

test("map2 capitalizes strings", () => {
	expect(map2(["hello", "world"])).toEqual(["HELLO", "WORLD"]);
});

test("map3 doubles odd numbers", () => {
	expect(map3([1, 2, 3])).toEqual([2, 2, 6]);
});

test("map4 sets all owners to Peter", () => {
	expect(
		map4([
			{ brand: "Ford", hp: 150, owner: "John" },
			{ brand: "Toyota", hp: 200, owner: "Jane" },
		])
	).toEqual([
		{ brand: "Ford", hp: 150, owner: "Peter" },
		{ brand: "Toyota", hp: 200, owner: "Peter" },
	]);
});

// Tests for filter functions
test("filter1 only allows odd numbers", () => {
	expect(filter1([1, 2, 3])).toEqual([1, 3]);
});

test("filter2 filters strings containing a or A", () => {
	expect(filter2(["apple", "Banana", "cherry"])).toEqual(["apple", "Banana"]);
});

test("filter3 filters cars with hp over 200", () => {
	expect(
		filter3([
			{ brand: "Ford", hp: 100, owner: "John" },
			{ brand: "Toyota", hp: 300, owner: "Jane" },
		])
	).toEqual([{ brand: "Toyota", hp: 300, owner: "Jane" }]);
});

// Tests for reduce functions
test("reduce1 multiplies numbers", () => {
	expect(reduce1([1, 2, 3])).toBe(6);
});

test("reduce2 finds the highest number or returns 0", () => {
	expect(reduce2([1, 2, 3])).toBe(3);
	expect(reduce2([])).toBe(0);
});

test("reduce3 counts distinct owners", () => {
	expect(
		reduce3([
			{ brand: "Ford", hp: 150, owner: "John" },
			{ brand: "Toyota", hp: 200, owner: "Jane" },
			{ brand: "Honda", hp: 180, owner: "John" },
		])
	).toBe(2);
});

// Tests for find functions
test("find1 finds first number greater than 0 or returns 0", () => {
	expect(find1([-1, 0, 1, 2])).toBe(1);
	expect(find1([-1, 0])).toBe(0);
});

test("find2 finds the first car with hp greater than 500 or returns undefined", () => {
	expect(
		find2([
			{ brand: "Ford", hp: 400, owner: "John" },
			{ brand: "Ferrari", hp: 600, owner: "Jane" },
		])
	).toEqual({ brand: "Ferrari", hp: 600, owner: "Jane" });
	expect(
		find2([
			{ brand: "Ford", hp: 400, owner: "John" },
			{ brand: "Toyota", hp: 300, owner: "Jane" },
		])
	).toBeUndefined();
});

// Tests for sort functions
test("sort1 sorts strings alphabetically", () => {
	expect(sort1(["banana", "apple", "cherry"])).toEqual(["apple", "banana", "cherry"]);
});

test("sort2 sorts cars by hp in descending order", () => {
	expect(
		sort2([
			{ brand: "Ford", hp: 400, owner: "John" },
			{ brand: "Toyota", hp: 300, owner: "Jane" },
		])
	).toEqual([
		{ brand: "Ford", hp: 400, owner: "John" },
		{ brand: "Toyota", hp: 300, owner: "Jane" },
	]);
});

// Group tests by higher-order function
describe("Functions that should use Array.prototype.map", () => {
	test("map functions use Array.prototype.map", () => {
		map1([1, 2, 3]);
		map2(["a", "b"]);
		map3([1, 2, 3]);
		map4([{ brand: "Ford", hp: 100, owner: "Alice" }]);

		expect(mapSpy.mock.calls.length).toBeGreaterThanOrEqual(4);
	});
});

describe("Functions that should use Array.prototype.filter", () => {
	test("filter functions use Array.prototype.filter", () => {
		filter1([1, 2, 3]);
		filter2(["apple", "banana"]);
		filter3([{ brand: "Ford", hp: 100, owner: "Alice" }]);

		expect(filterSpy.mock.calls.length).toBeGreaterThanOrEqual(3);
	});
});

describe("Functions that should use Array.prototype.reduce", () => {
	test("reduce functions use Array.prototype.reduce", () => {
		reduce1([1, 2, 3]);
		reduce2([1, 2, 3]);
		reduce3([{ brand: "Ford", hp: 100, owner: "Alice" }]);

		expect(reduceSpy.mock.calls.length).toBeGreaterThanOrEqual(3);
	});
});

describe("Functions that should use Array.prototype.find", () => {
	test("find functions use Array.prototype.find", () => {
		find1([1, 2, 3]);
		find2([{ brand: "Ford", hp: 100, owner: "Alice" }]);

		expect(findSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
	});
});

describe("Functions that should use Array.prototype.sort", () => {
	test("sort functions use Array.prototype.sort", () => {
		sort1(["apple", "banana"]);
		sort2([{ brand: "Ford", hp: 100, owner: "Alice" }]);

		expect(sortSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
	});
});
