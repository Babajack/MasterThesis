import { CodeFile, CodeFiles } from "types";
import { TaskCategory, TaskDescriptionDisplayType, TaskSchema } from "./task";

const getIndexFile = (imports?: string, mainBody?: string, extraBody?: string): CodeFile => {
	return {
		filename: "index.js",
		code: `import React from "react"
import ReactDOM from "react-dom/client";
import App from "./App";${imports ? "\n" + imports : ""}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);`,
	};
};

const getAppFile = (
	imports?: string,
	mainBody?: string,
	returnBody?: string,
	extraBody?: string
): CodeFile => {
	return {
		filename: "App.js",
		code: `import "./App.css";
import React from "react"${imports ? "\n" + imports : ""}

export default function App() {
	${mainBody ? mainBody + "\n" : ""}
    return (
		<div className="App">
			${returnBody ? returnBody : ""}
		</div>
    )
}
${extraBody ? "\n" + extraBody : ""}
`,
	};
};

const getHTMLFile = (): CodeFile => {
	return {
		filename: "index.html",
		code: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="sessionContainer/task/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="sessionContainer/task/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="sessionContainer/task/manifest.json" />
  <script src="sessionContainer/task/build/App.js" async defer></script>
  <link rel="stylesheet" href="sessionContainer/task/build/App.css" />
  <title>React App</title>
</head>

<body style="margin:0;padding:0">
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>`,
	};
};

const getCSSFile = (): CodeFile => {
	return {
		filename: "App.css",
		code: `.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
    `,
	};
};

/******************************************************************************************************************************************************/
/**************************************************               JavaScript Basics                  **************************************************/
/******************************************************************************************************************************************************/

const getTasks_Basics = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "JavaScript Basics";

	let index = 1;

	return [
		{
			// -- TASK 1 --
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
let array2 = array1; // array2 now holds a reference to the same array as array1
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
    // So the object referenced by c has been changed (unless c is a primitive)
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
					text: `<a href="https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value">Answer from Stackoverflow</a>`,
				},
			],
			defaultFiles: [
				getHTMLFile(),
				{
					filename: "App.js",
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
			`,
				},
			],
			solutionFiles: [
				getHTMLFile(),
				{
					filename: "App.js",
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
		`,
				},
			],
		},
		{
			// -- TASK 2 --
			index: index++,
			title: "JSX Basics (2/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [
				getHTMLFile(),
				getAppFile(
					undefined,
					"const result = add(2, 3);",
					"<div>{result}</div>",
					`
function add(a, b) {
	return a + b;
}`
				),
				getIndexFile(),
				getCSSFile(),
			],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};

/******************************************************************************************************************************************************/
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

const getTasks_JSX = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "JSX";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "JSX Basics (1/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [
				getHTMLFile(),
				getAppFile(
					undefined,
					"const result = add(2, 3);",
					"<div>{result}</div>",
					`
function add(a, b) {
	return a + b;
}`
				),
				getIndexFile(),
				getCSSFile(),
			],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
		{
			// -- TASK 2 --
			index: index++,
			title: "JSX Basics (2/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [
				getHTMLFile(),
				getAppFile(
					undefined,
					"const result = add(2, 3);",
					"<div>{result}</div>",
					`
function add(a, b) {
	return a + b;
}`
				),
				getIndexFile(),
				getCSSFile(),
			],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};

const getTasks_2 = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "State";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "State Basics (1/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};

/******************************************************************************************************************************************************/

const allTasks: TaskSchema[][] = [getTasks_Basics(), getTasks_JSX(), getTasks_2()];

export const getTaskDefinitions = (): TaskSchema[] => {
	return allTasks.reduce((prev, cur) => {
		return prev.concat(cur);
	}, []);
};
