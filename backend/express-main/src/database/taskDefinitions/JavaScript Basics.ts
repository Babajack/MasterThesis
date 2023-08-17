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
			unlocks: [{ category: CATEGORY, index: index }],
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
					text: `<a href="https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value" target=”_blank”>Answer from Stackoverflow</a>`,
				},
			],
			defaultFiles: [
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
export var resultNum = 

// obj1
export var resultObj1 = 

// obj2
export var resultObj2 = 
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
export var resultNum = 10

// obj1
export var resultObj1 = { value: "changed" }

// obj2
export var resultObj2 = { value: "unchanged" }
		`,
				},
			],
		},
		{
			// ---------------------------------------- TASK 2 ----------------------------------------
			index: index++,
			title: "JSX Basics (2/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [getHTMLFile()],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};
