import { CodeFile, CodeFiles } from "../../types";
import { TaskCategory, TaskDescriptionDisplayType, TaskSchema } from "../task";
import { getAppFile, getCSSFile, getHTMLFile, getIndexFile } from "./configuration";

/******************************************************************************************************************************************************/
/**************************************************               JavaScript Basics                  **************************************************/
/******************************************************************************************************************************************************/

export const getTasks_Basics = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "JavaScript Basics";

	let index = 1;

	return [
		{
			// ---------------------------------------- TASK 1 ----------------------------------------
			index: index++,
			title: "Reference vs Value",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `In programming, the concepts of "reference" and "value" play a crucial role in understanding how data is stored, accessed, and manipulated. These concepts are closely related to how variables and data types are handled in memory.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Pass by Value</h5><div>When a variable holding a primitive data type (such as numbers, strings, booleans) is assigned to another variable or passed as an argument to a function, a copy of the value is made. This means that any changes made to the copied value do not affect the original value.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// pass by value example:
let num1 = 10;
let num2 = num1; // num2 now holds a copy of the value of num1
num2 = 20; // num1 remains unchanged

console.log(num1); // Output: 10
console.log(num2); // Output: 20`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Pass by Reference</h5><div>When a variable holding a non-primitive data type (such as objects or arrays) is assigned to another variable or passed as an argument to a function, a reference to the original data is passed, not a copy. This means that changes made to the referenced object are reflected in all variables that hold a reference to that object.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// pass by reference example:
let array1 = [1, 2, 3];
let array2 = array1; 
// array2 now holds a reference to the same array as array1
array2.push(4); // This changes both array1 and array2

console.log(array1); // Output: [1, 2, 3, 4]
console.log(array2); // Output: [1, 2, 3, 4]`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>How it works in JavaScript</h5><ul><li>Javascript is always pass by value, but when a variable refers to an object (including arrays), the "value" is a reference to the object.</li><li>Changing the value of a variable never changes the underlying primitive or object, it just points the variable to a new primitive or object.</li><li>However, changing a property of an object referenced by a variable does change the underlying object.</li></ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example 1
function f(a,b,c) {
    // Argument a is re-assigned to a new value.
    // The object or primitive referenced by the original a is unchanged.
    a = 3;
    // Calling b.push changes its properties - it adds
    // a new property b[b.length] with the value "foo".
    // So the object referenced by b has been changed.
    b.push("foo");
    // The "first" property of argument c has been changed.
    // So the object referenced by c has been changed 
	// (unless c is a primitive)
    c.first = false;
}

var x = 4;
var y = ["eeny", "miny", "mo"];
var z = {first: true};
f(x,y,z);
console.log(x, y, z.first); // 4, ["eeny", "miny", "mo", "foo"], false
`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example 2
var a = ["1", "2", {foo:"bar"}];
var b = a[1]; // b is now "2";
var c = a[2]; // c now references {foo:"bar"}
a[1] = "4";   // a is now ["1", "4", {foo:"bar"}]; b still has the value
              // it had at the time of assignment
a[2] = "5";   // a is now ["1", "4", "5"]; c still has the value
              // it had at the time of assignment, i.e. a reference to
              // the object {foo:"bar"}
console.log(b, c.foo); // "2" "bar"
`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `It's important to note that objects and arrays in JavaScript are mutable, which means their contents can be changed after creation. Primitive types like numbers and strings are immutable, meaning their values cannot be changed after creation.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value" target=”_blank”>Source</a>`,
				},
			],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),
				{
					filename: "index.js",
					code: `function changeElements(a, b, c) {
	a = a + 5;
	b.value = "changed";
	c = { value: "changed" };
}

var num = 10;
var obj1 = { value: "unchanged" };
var obj2 = { value: "unchanged" };

changeElements(num, obj1, obj2);

// YOUR TASK: define the expected values

// num
var resultNum = 

// obj1
var resultObj1 = 

// obj2
var resultObj2 = 


export {resultNum, resultObj1, resultObj2}
			`,
				},
			],
			solutionFiles: [
				getHTMLFile(),
				{
					filename: "index.js",
					code: `function changeElements(a, b, c) {
	a = a + 5;
	b.value = "changed";
	c = { value: "changed" };
}

var num = 10;
var obj1 = { value: "unchanged" };
var obj2 = { value: "unchanged" };

changeElements(num, obj1, obj2);

// YOUR TASK: define the expected values

// num
var resultNum = 10

// obj1
var resultObj1 = { value: "changed" }

// obj2
var resultObj2 = { value: "unchanged" }


export {resultNum, resultObj1, resultObj2}
		`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 2 ----------------------------------------
			index: index++,
			title: "Short Circuiting",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Short-circuiting in JavaScript is a behavior that occurs when logical operators (typically && and ||) stop evaluating expressions as soon as the result can be determined without evaluating the entire expression. In JavaScript, when used with non-boolean values, it get's more interesting.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Short-circuiting with the OR (||) operator</h5><div>Logical OR (&&) operands from left to right, returning immediately with the value of the first truthy operand it encounters; if all values are falsy, the value of the last operand is returned.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `true || false 
// returns true

false || 1
// returns 1
`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR" target=”_blank”>More details</a>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Short-circuiting with the AND (&&) operator</h5><div>Logical AND (&&) evaluates operands from left to right, returning immediately with the value of the first falsy operand it encounters; if all values are truthy, the value of the last operand is returned.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `true && false 
// returns false

3 && "Hello"
// returns Hello
`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND" target=”_blank”>More details</a>`,
				},
			],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
// 1) define the expected values

// "Hello" || "Hi"
var result1 =

// false || ""
var result2 =

// 0 || undefined
var result3 =

// "Hello" && "Hi"
var result4 =

// 0 && 1
var result5 =

// "Hello" && ""
var result6 =


// 2) complete the following functions using AND (&&) or OR (||) operators

/**
 * returns the name, with "Guest" as a default value
 */
function getName1(name) {
	// your code
}

/**
 * return the name if isAuthenticated equals true, false otherwise
 */
function getName2(isAuthenticated, name) {
	// your code
}


export { result1, result2, result3, result4, result5, result6, getName1, getName2 }
					`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
// 1) define the expected values

// "Hello" || "Hi"
var result1 = "Hello"

// false || ""
var result2 = ""

// 0 || undefined
var result3 = undefined

// "Hello" && "Hi"
var result4 = "Hi"

// 0 && 1
var result5 = 0

// "Hello" && ""
var result6 = ""

// 2) complete the following functions using AND (&&) or OR (||) operators

/**
 * returns the name, with "Guest" as a default value
 */
function getName1(name) {
	// your code
	return name || "Guest"
}


/**
 * return the name if isAuthenticated equals true, false otherwise
 */
function getName2(isAuthenticated, name) {
	// your code
	return isAuthenticated && name
}


export { result1, result2, result3, result4, result5, result6, getName1, getName2 }
					`,
				},
			],
		},

		{
			// ---------------------------------------- TASK 3 ----------------------------------------
			index: index++,
			title: "Arrow Functions",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Arrow functions are a feature to provide a more concise syntax for writing functions in JavaScript. They are commonly used for defining anonymous functions or short, simple functions. Arrow functions have a few key characteristics:`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Shorter Syntax</h5> <div>Arrow functions have a more concise syntax compared to traditional function expressions.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// standard function:
const add = function(a, b) {
	return a + b;
}

// arrow function:
const add = (a, b) => {
	return a + b;
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Implicit Return</h5> <div>If an arrow function consists of a single expression, you can omit the braces {} and the return keyword. The function will automatically return the result of that expression.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// standard function:
const add = function(a, b) {
	return a + b;
}

// arrow function:
const add = (a, b) => a + b;`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>No Binding of "this"</h5> <div>Arrow functions do not have their own <b>this</b> binding: In regular functions the <b>this</b> keyword represents the object that calls the function. In arrow functions the <b>this</b> keyword represents the object that defined the arrow function, so it refers to the surrounding block (parent). <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// standard function:
function Person() {
	this.age = 0;
	
	setInterval(function growUp() {
		// In this context, 'this' refers to the global object,
		// not the Person instance.
		// It will not increment the "age" property.
		this.age++;
	}, 1000);
}


// arrow function:
function Person() {
	this.age = 0;
	
	setInterval(() => {
		// In this context, 'this' refers to the 'Person' instance.
		// It will increment the "age" property.
		this.age++;
	}, 1000);
}`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://www.w3schools.com/js/js_arrow_function.asp" target=”_blank”>Source</a>`,
				},
			],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:

// 1) Create an arrow function "multiply" that takes two parameters and returns their product.



// 2) Create an object "calculator" with methods for addition, subtraction, multiplication, and division using arrow functions.
// hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects



// 3) Add an "increment" method to the "counter" object that increases its "count" by 1 when called.

const counter = {
    count: 0,
    // your code here
}

export {multiply, calculator, counter}`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:

// 1) Create an arrow function "multiply" that takes two parameters and returns their product.

const multiply = (a, b) => a * b;

// 2) Create an object "calculator" with methods for addition ("add"), subtraction ("substract"), multiplication ("multiply"), and division ("divide") using arrow functions.
// hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

const calculator = {
    add: (a, b) => a + b,
    substract: (a, b) => a - b,
    multiply: multiply,
    divide: (a, b) => a / b
}

// 3) Add an "increment" method to the "counter" object that increases its "count" by 1 when called.

const counter = {
    count: 0,
    // your code
    increment: function () {
        this.count++
    }
}

export { multiply, calculator, counter }`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 4 ----------------------------------------
			index: index++,
			title: "Array Functions",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `JavaScript provides a set of built-in methods for arrays that make it easier to perform common tasks like mapping, filtering, and reducing data sets. These methods are higher-order functions that take a callback function as an argument, making it more readable and efficient to work with arrays. It is common to use arrow functions as callback functions. In the following, we examine some of the most commonly used array functions.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>map</h5> <div>The <b>map</b> method creates a new array by applying a function to every element in an existing array. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const newArray = oldArray.map(callbackFunction);

// example:
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2);
// Output: [2, 4, 6]`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>filter</h5> <div>The <b>filter</b> method method creates a new array by filtering out elements that don't satisfy a given condition. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const newArray = oldArray.filter(callbackFunction);

// example:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(x => x % 2 === 0);
// Output: [2, 4]`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>reduce</h5> <div>The <b>reduce</b> method reduces an array to a single value by accumulating a result through a callback function. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const singleValue = array.reduce(callbackFunction, initialValue);

// example:
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, x) => accumulator + x, 0);
// Output: 10`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>find</h5> <div>The <b>find</b> method returns the first element in the array that satisfies the given condition. If no element is found, undefined is returned. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const foundElement = array.find(callbackFunction);

// example:
const numbers = [1, 2, 3, 4];
const firstEven = numbers.find(x => x % 2 === 0);
// Output: 2`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>sort</h5> <div>The <b>sort</b> method method sorts the elements of an array in place. The return value of the callback function should be a number whose sign indicates the relative order of the two elements: negative if a is less than b, positive if a is greater than b, and zero if they are equal. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" target=”_blank”>more info</a></div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const sortedArray = array.sort(callbackFunction);

// example:
const numbers = [10, 5, 8, 1, 4];
numbers.sort((a, b) => a - b);
// Output: [1, 4, 5, 8, 10]`,
				},
			],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:

/* example object for this task, assume that all cars have a brand, hp and owner */
const exampleCar = { brand: "Porsche", hp: 400, owner: "Hans" }

// 1) map

// Create a function "map1" that takes an array of numbers as parameter and returns an array where each number is squared.


// Create a function "map2" that takes an array of strings as parameter and returns an array where each string is capitalized.


// Create a function "map3" that takes an array of numbers as parameter and returns an array where each odd number is doubled.


// Create a function "map4" that takes an array of car objects as parameter and returns an array where each owner is set to "Peter".




// 2) filter

// Create a function "filter1" that takes an array of numbers as parameter and returns an array only containing the odd numbers.


// Create a function "filter2" that takes an array of strings as parameter and returns an array only containing the strings having an "a" or "A".


// Create a function "filter3" that takes an array of car objects as parameter and returns an array only containing the cars with more than 200 horsepower (hp).




// 3) reduce

// Create a function "reduce1" that takes an array of numbers as parameter and returns the product of all the numbers.


// Create a function "reduce2" that takes an array of numbers as parameter and returns the highest number.


// Create a function "reduce3" that takes an array of car objects as parameter and returns the number of distinct owners.




// 4) find

// Create a function "find1" that takes an array of numbers as parameter and returns the first number greater than 0, or 0 if none are greater.


// Create a function "find2" that takes an array of car objects as parameter and returns the first car with a horsepower (hp) greater than 500, undefined if none are found.





// 5) sort

// Create a function "sort1" that takes an array of strings as parameter and sorts the strings alphabetically.


// Create a function "sort2" that takes an array of car objects as parameter and sorts it by horsepower (hp) in descending order.




export { map1, map2, map3, map4, filter1, filter2, filter3, reduce1, reduce2, reduce3, find1, find2, sort1, sort2}`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:

/* example object for this task, assume that all cars have a brand, hp and owner */
const exampleCar = { brand: "Porsche", hp: 400, owner: "Hans" }

// 1) map

// Create a function "map1" that takes an array of numbers as parameter and returns an array where each number is squared.
const map1 = (arr) => arr.map((num) => num * num);

// Create a function "map2" that takes an array of strings as parameter and returns an array where each string is capitalized.
const map2 = (arr) => arr.map((str) => str.toUpperCase());

// Create a function "map3" that takes an array of numbers as parameter and returns an array where each odd number is doubled.
const map3 = (arr) => arr.map((num) => (num % 2 !== 0 ? num * 2 : num));

// Create a function "map4" that takes an array of car objects as parameter and returns an array where each owner is set to "Peter".
const map4 = (arr) => arr.map((car) => ({ ...car, owner: "Peter" }));



// 2) filter

// Create a function "filter1" that takes an array of numbers as parameter and returns an array only containing the odd numbers.
const filter1 = (arr) => arr.filter((num) => num % 2 !== 0);

// Create a function "filter2" that takes an array of strings as parameter and returns an array only containing the strings having an "a" or "A".
const filter2 = (arr) => arr.filter((str) => /[aA]/.test(str));

// Create a function "filter3" that takes an array of car objects as parameter and returns an array only containing the cars with more than 200 horsepower (hp).
const filter3 = (arr) => arr.filter((car) => car.hp > 200);



// 3) reduce

// Create a function "reduce1" that takes an array of numbers as parameter and returns the product of all the numbers.
const reduce1 = (arr) => arr.reduce((acc, val) => acc * val, 1);

// Create a function "reduce2" that takes an array of positive numbers as parameter and returns the highest number or 0 if none are higher.
const reduce2 = (arr) => arr.reduce((acc, val) => (acc > val ? acc : val), 0);

// Create a function "reduce3" that takes an array of car objects as parameter and returns the number of distinct owners.
const reduce3 = (arr) => {
	const distinctOwners = arr.reduce((acc, car) => {
		acc.add(car.owner);
		return acc;
	}, new Set());

	return distinctOwners.size;
};



// 4) find

// Create a function "find1" that takes an array of numbers as parameter and returns the first number greater than 0, or 0 if none are greater.
const find1 = (arr) => arr.find((num) => num > 0) || 0;

// Create a function "find2" that takes an array of car objects as parameter and returns the first car with a horsepower (hp) greater than 500, undefined if none are found.
const find2 = (arr) => arr.find((car) => car.hp > 500);



// 5) sort

// Create a function "sort1" that takes an array of strings as parameter and sorts the strings alphabetically.
const sort1 = (arr) => [...arr].sort();

// Create a function "sort2" that takes an array of car objects as parameter and sorts it by horsepower (hp) in descending order.
const sort2 = (arr) => [...arr].sort((a, b) => b.hp - a.hp);



export { map1, map2, map3, map4, filter1, filter2, filter3, reduce1, reduce2, reduce3, find1, find2, sort1, sort2}`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 5 ----------------------------------------
			index: index++,
			title: "Spread Operator & Object Destructuring",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `In JavaScript, both the Spread Operator and Object Destructuring are commonly used techniques that make it easier to work with arrays and objects, especially when you want to create a copy, manipulate data, or extract values.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Spread Operator (...)</h5> <div>The spread operator (...) is used to spread the properties of an object (or elements of an array) into a new object (or array).</div>`,
				},

				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const newObject = { ...oldObject, newProperty: 'newValue' };

//example:
const car = {
	brand: "Ford",
	model: "Mustang",
};

// We can create a new object, add or override properties
// -> without mutating the original object
const newCar = { ...car, year: 2020 };
// newCar: { brand: 'Ford', model: 'Mustang', year: 2020 }

// also works with arrays:
const array1 = [1, 2, 3];
const array2 = [...array1, 4, 5]; 
// array2: [1, 2, 3, 4, 5]`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `We need to be careful with nested objects because the spread operator only creates a shallow copy of the original object. This means that while the top-level properties are copied, the nested objects are still references to the original objects. Modifying these nested objects will affect the original object as well.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:
const car = {
	brand: "Ford",
	owner: {
		lastname: "Wurst",
		firstname: "Hans"
	}
};

const newCar = { ...car }
// the "owner" of newCar is only a reference

// Changing a top-level property doesn't affect the original object
newCar.brand = "Audi";
// car.brand remains "Ford"

// Changing a nested object affects the original object
newCar.owner.lastname = "Meyer";
// car.owner.lastname changes to "Ford"`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `If we want to perform a deep copy, we'll need to explicitly do so for each nested object:`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:
const car = {
	brand: "Ford",
	owner: {
		lastname: "Wurst",
		firstname: "Hans"
	}
};

const newCar = {
	...car
	owner: {
		...car.owner
	}
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This is also necessary when working with arrays as object properties.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Object Destructuring</h5> <div>Object destructuring allows you to unpack values from arrays, or properties from objects, into distinct variables. This is particularly useful when you want to use individual properties of an object.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// syntax:
const { propertyName1, propertyName2 } = object; // for objects
const [ value1, value2 ] = array; // for arrays

// example 1:
const car = {
	brand: "Ford",
	model: "Mustang",
	owner: "Hans"
};

const { brand, model } = car;
console.log(brand); // Output: "Ford"
console.log(model);  // Output: "Mustang"

// example 2:
const names = [ "Hans", "Max", "James" ];

const [firstname, secondname] = names;
console.log(firstname); // Output: "Hans"
console.log(secondname);  // Output: "Max"


// also works with nested objects:
const car2 = {
	brand: "Ford",
	owner: {
		lastname: "Wurst",
		firstname: "Hans"
	}
};

// "brand: brand2" works as a rename
const { brand: brand2, owner: { lastname } } = car2;
console.log(brand2); // Output: "Ford"
console.log(lastname);  // Output: "Wurst"
`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `If you want to get some properties and collect the remaining ones into a new object, you can use the rest parameter:`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:
const car = {
	brand: "Ford",
	model: "Mustang",
	owner: "Hans"
};

const { brand, ...rest } = car;

console.log(brand);  // Ford
console.log(rest);   // { model: "Mustand", owner: "Hans" }`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" target=”_blank”>more info on spread operator</a>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target=”_blank”>more info on object destructuring</a>`,
				},
			],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `/* example object for this task, assume that all cars have a brand, hp and owner, also assume that all owners have first- and lastname */
const car = {
	brand: "Porsche",
	hp: 400,
	owner: {
		firstname: "Hans",
		lastname: "Wurst"
	}
}

// YOUR TASK:

// Spread Operator

// 1) Create a function fun1 that takes two objects "a" and "b" as parameters and returns a merged object containing all properties from "a" and "b" using the spread operator. If there are conflicts, the properties from "b" should override those in "a".



// 2) Create a function fun2 that takes a car object as parameter and returns an updated copy of it, where the new owner is {firstname: "Lars", lastname: "Stock"}, using the spread operator.



// 3) Create a function fun3 that takes a car object as parameter and returns a deep copy of it using the spread operator.



// 4) Create a function fun4 that takes two arrays "a" and "b" as parameters and returns a new array containing all content of "a" where the content of "b" is inserted at the second position. Use the spread operator.
// hint: you can also use object destructuring



// Object Destructuring

// 1) Create a function fun5 that takes a car object as parameter and returns the brand and hp properties using object destructuring. Return the values as [brand, hp].



// 2) Create a function fun6 that takes a car object as parameter and returns the firstname and lastname properties using object destructuring. Return the values as [firstname, lastname].



// 3) Create a function fun7 that takes an array of numbers as parameter and returns a new array where the first element is removed. Use object destructuring.



// 4) Create a function fun8 that takes two parameters "a" and "b" and swaps their values using object destructuring.



export { fun1, fun2, fun3, fun4, fun5, fun6, fun7, fun8 }`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `/* example object for this task, assume that all cars have a brand, hp and owner, also assume that all owners have first- and lastname */
const car = {
	brand: "Porsche",
	hp: 400,
	owner: {
		firstname: "Hans",
		lastname: "Wurst"
	}
}

// YOUR TASK:

// Spread Operator

// 1) Create a function fun1 that takes two objects "a" and "b" as parameters and returns a merged object containing all properties from "a" and "b" using the spread operator. If there are conflicts, the properties from "b" should override those in "a".
const fun1 = (a, b) => ({ ...a, ...b });


// 2) Create a function fun2 that takes a car object as parameter and returns an updated copy of it, where the new owner is {firstname: "Lars", lastname: "Stock"}, using the spread operator.
const fun2 = (car) => ({ ...car, owner: { firstname: "Lars", lastname: "Stock" } });


// 3) Create a function fun3 that takes a car object as parameter and returns a deep copy of it using the spread operator.
const fun3 = (car) => ({ ...car, owner: { ...car.owner } });


// 4) Create a function fun4 that takes two arrays "a" and "b" as parameters and returns a new array containing all content of "a" where the content of "b" is inserted at the second position. Use the spread operator.
// hint: you can also use object destructuring
const fun4 = (a, b) => {
	const [first, ...rest] = a;
	return [first, ...b, ...rest];
};


// Object Destructuring

// 1) Create a function fun5 that takes a car object as parameter and returns the brand and hp properties using object destructuring. Return the values as [brand, hp].
const fun5 = ({ brand, hp }) => ([brand, hp]);


// 2) Create a function fun6 that takes a car object as parameter and returns the firstname and lastname properties using object destructuring. Return the values as [firstname, lastname].
const fun6 = ({ owner: { firstname, lastname } }) => ([firstname, lastname]);


// 3) Create a function fun7 that takes an array of numbers as parameter and returns a new array where the first element is removed. Use object destructuring.
const fun7 = ([_, ...rest]) => (rest);


// 4) Create a function fun8 that takes two parameters "a" and "b" and swaps their values using object destructuring.
const fun8 = (a, b) => {
	[a, b] = [b, a];
	return [a, b];
};


export { fun1, fun2, fun3, fun4, fun5, fun6, fun7, fun8 }`,
				},
			],
		},

		/*
		{
			// ---------------------------------------- TASK 6 ----------------------------------------
			index: index++,
			title: "Short Circuiting",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
CODE
					`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
SOLUTION
					`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 7 ----------------------------------------
			index: index++,
			title: "Short Circuiting",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
CODE
					`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
SOLUTION
					`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 8 ----------------------------------------
			index: index++,
			title: "Short Circuiting",
			category: CATEGORY,
			//unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [],
			defaultFiles: [
				{ filename: "index.css", code: "" },
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
CODE
					`,
				},
			],
			solutionFiles: [
				getHTMLFile(),

				{
					filename: "index.js",
					code: `// YOUR TASK:
SOLUTION
					`,
				},
			],
		},
		*/
	];
};
