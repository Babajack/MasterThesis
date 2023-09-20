/******************************************************************************************************************************************************/
/**************************************************                      JSX                         **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import {
	getHTMLFile,
	getAppFile,
	getIndexFile,
	getAppCSSFile,
	getIndexCSSFile,
} from "./configuration";

export const getTasks_JSX = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "JSX";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to JSX",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			isDefaultUnlocked: true,
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `JSX (JavaScript XML) is a syntax extension for JavaScript, used with React to describe what the UI should look like. JSX allows us to write HTML-like elements and tags in our React code, which then get transformed into native HTML elements by React.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:
const element = <h1>Hello, JSX!</h1>;`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `In this example, JSX allows you to define a React element that represents an "h1" HTML element with the text "Hello, JSX!" inside it. Under the hood, JSX is transpiled (converted) into regular JavaScript code that creates and manipulates the virtual DOM in React applications.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `JSX elements behave exactly like JavaScript expressions. This means they can be stored as variables or arrays and they can be passed to functions as parameters.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Overall, JSX simplifies the development of React applications by providing an efficient way to define user interfaces with integrated JavaScript logic.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `The "run code" button does not show anything because the JSX is not rendered. You will learn how to render elements later in this chapter.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react";

// YOUR TASK

// 1) Create a "div" element with the text "Hello World!" and save it in the variable "jsx1".


// 2) Create a "h2" element with the text "Hi" nested in a "div" element and save it in the variable "jsx2"


export {jsx1, jsx2}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react";

// YOUR TASK

// 1) Create a "div" element with the text "Hello World!" and save it in the variable "jsx1".
const jsx1 = <div>Hello World!</div>;

// 2) Create a "h2" element with the text "Hi" nested in a "div" element and save it in the variable "jsx2"
const jsx2 = (
	<div>
		<h2>Hi</h2>
	</div>
);

export {jsx1, jsx2}`,
				},
			],
		},
		{
			// -- TASK 2 --
			index: index++,
			title: "The Rules of JSX",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: "JSX is stricter than HTML since it has a few more rules to follow.",
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>1. JSX elements must have a single root element</h5><div>You cannot return multiple elements at the top level without wrapping them in a parent element. If you don't want to wrap elements inside a "div" element, you can use an empty tag "<>".</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// This is valid
<div>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>

<>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</>

// This is not valid
<p>Paragraph 1</p>
<p>Paragraph 2</p>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: "<h5>1. JSX elements must have a closing tag</h5><div>JSX requires tags to be explicitly closed.</div>",
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// This is valid
<img />
<img></img>

<ul>
	<li>hello</li>
	<li>world</li>
</ul>

// This is not valid
<img>

<ul>
	<li>hello
	<li>world
</ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>3. HTML attributes are written in camelCase</h5><div>In JSX, HTML attributes like "class" and "for" should be written in camelCase as "className" and "htmlFor". You can find a refernece <a href="https://react.dev/reference/react-dom/components/common" target=”_blank”>here</a>, but you don't need to remember everything since React will point out potential errors.</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// This is valid
<div className="container">
  <label htmlFor="inputField">Name:</label>
  <input type="text" id="inputField" />
</div>

// This is not valid
<div class="container">
  <label for="inputField">Name:</label>
  <input type="text" id="inputField" />
</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `JSX is transformed into JavaScript, where attributes originally written in JSX become keys within JavaScript objects. You'll frequently need to extract these attributes and store them as variables. However, JavaScript imposes constraints on variable naming, such as prohibiting the use of hyphens or reserved words like "class."	This is why, in React, many HTML attributes are expressed in camelCase. For instance, rather than using "stroke-width," you need to use "strokeWidth." For the reserved word "class," use "className" instead.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx" target=”_blank”>Source</a>`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"

// YOUR TASK

// 1) The following JSX element has some errors. Find all mistakes and correct them.

const jsx1 = 
	<h1>Hello, world!</h1>
	<p>Welcome to my app.</p>


// 2) The following JSX element has some errors. Find all mistakes and correct them.

const jsx2 =
	<div>
		<img>
	</div>


// 3) The following JSX element has some errors. Find all mistakes and correct them.

const jsx3 =
	<div class="myDiv">
		Hello!
	</div>


// 4) The following JSX element has some errors. Find all mistakes and correct them.

const jsx4 =
	<h1>Hello</h1>
	<button onclick={() => {}}>Click Me</button>
	

export {jsx1, jsx2, jsx3, jsx4}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"

// YOUR TASK

// 1) The following JSX element has some errors. Find all mistakes and correct them.

/**
 * using paranthesis makes the code more readable
 */
const jsx1 = (
	<>
		<h1>Hello, world!</h1>
		<p>Welcome to my app.</p>
	</>
);


// 2) The following JSX element has some errors. Find all mistakes and correct them.

const jsx2 = (
	<div>
		<img />
	</div>
);


// 3) The following JSX element has some errors. Find all mistakes and correct them.

const jsx3 = (
	<div className="myDiv">
		Hello!
	</div>
);


// 4) The following JSX element has some errors. Find all mistakes and correct them.

const jsx4 = (
	<div>
		<h1>Hello</h1>
		<button onClick={() => { }}>Click Me</button>
	</div>
);


export {jsx1, jsx2, jsx3, jsx4}`,
				},
			],
		},
		{
			// -- TASK 3 --
			index: index++,
			title: "JavaScript in JSX",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `JSX enables you to use HTML-like syntax within a JavaScript file, allowing you to combine both rendering logic and content within a single location. You may need to inject some JavaScript logic or reference dynamic properties in your HTML. In such cases, you can use curly braces to access JavaScript functionality.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

const name = "John";
const element = <h1>Hello, {name}</h1>;
// output: Hello, John

const a = 10;
const b = 20;
const sumElement = <h1>{a + b}</h1>;
// output: 30

function greet(name) {
	return "Hello, " + name;
}
const element = <h1>{greet('John')}</h1>;
// output: Hello, John

`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Besides displaying dynamic content inside HTML elements, you can also use curly braces as HTML attributes.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

const myClass = "myClass";
const element = <h1 className={myClass}>Hello!</h1>;
// output: Hello!


// also works with objects:
const car = {
	brand: "Porsche",
	id: "Porsche1"
}
const style = {
	backgroundColor: "blue"
}
const element = <h1 id={car.id} style={style}>This is my {car.brand}!</h1>
// output: This is my Porsche!


// passing inline objects to attributes:
const element = <h1 style={{backgroundColor: "blue"}}>Hello!</h1>
// output: Hello!


// using JavaScript expression like the ternary operator:
const element = <h1> {5 > 0 ? "isHigher" : "isLower"} </h1>;
// output: isHigher
`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/javascript-in-jsx-with-curly-braces" target=”_blank”>Source</a>`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"
					
// YOUR TASK

/* example object for this task, assume that all cars have a brand, hp and owner */
const exampleCar = { brand: "Porsche", hp: 400, owner: "Hans" }

// 1) Create a function "fun1" that takes a car object as parameter and returns a JSX element displaying all the car's information


// 2) Create a function "fun2" that takes a boolean "isActive" as parameter and returns a JSX element with the class name "active" if "isActive" is true and "inactive" otherwise.


// 3) Create a function "fun3" that takes a string "text" and a boolean "isEnabled" as parameters and returns a JSX element of a button with the given text as its content and with a disabled state based on "isEnabled".


// 4) Create a function "fun4" that takes a number (representing the current hour in 24-hour format, i.e. having values from 0 to 23) as parameter and returns a JSX elements displaying a different greeting message based on the time of day. From 6-22 it should display "Hello" and otherwise it should display "Good Night".


// 5) Create a function "fun5" that takes a number as parameter and returns a JSX element displaying the number. Use a JavaScript expression to decide the background color of the number: if the number is greater than or equal to 10, make the text "green"; otherwise, make it "red".



export {fun1, fun2, fun3, fun4, fun5}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"
					
// YOUR TASK

/* example object for this task, assume that all cars have a brand, hp and owner */
const exampleCar = { brand: "Porsche", hp: 400, owner: "Hans" }

// 1) Create a function "fun1" that takes a car object as parameter and returns a JSX element displaying all the car's information
const fun1 = (car) => (
	<div>
		<p>Brand: {car.brand}</p>
		<p>Horsepower: {car.hp}</p>
		<p>Owner: {car.owner}</p>
	</div>
);

// 2) Create a function "fun2" that takes a boolean "isActive" as parameter and returns a JSX element with the class name "active" if "isActive" is true and "inactive" otherwise.
const fun2 = (isActive) => (
	<div className={isActive ? 'active' : 'inactive'}>
		{isActive ? 'Active' : 'Inactive'}
	</div>
);

// 3) Create a function "fun3" that takes a string "text" and a boolean "isEnabled" as parameters and returns a JSX element of a button with the given text as its content and with a disabled state based on "isEnabled".
const fun3 = (text, isEnabled) => (
	<button disabled={!isEnabled}>
		{text}
	</button>
);

// 4) Create a function "fun4" that takes a number (representing the current hour in 24-hour format, i.e. having values from 0 to 23) as parameter and returns a JSX elements displaying a different greeting message based on the time of day. From 6-22 it should display "Hello" and otherwise it should display "Good Night".
const fun4 = (hour) => {
	const message = hour >= 6 && hour < 22 ? 'Hello' : 'Good Night';
	return <h1>{message}</h1>;
};

// 5) Create a function "fun5" that takes a number as parameter and returns a JSX element displaying the number. Use a JavaScript expression to decide the background color of the number: if the number is greater than or equal to 10, make the text "green"; otherwise, make it "red".
const fun5 = (count) => (
	<h2 style={{ backgroundColor: count >= 10 ? 'green' : 'red' }}>
		{count}
	</h2>
);


export {fun1, fun2, fun3, fun4, fun5}`,
				},
			],
		},
		{
			// -- TASK 4 --
			index: index++,
			title: "Rendering JSX",
			category: CATEGORY,
			unlocks: [{ category: "Components", index: 1 }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `So far, we have only wrote JSX code but have not displayed anything on our screen. In the following, we will learn how to render JSX.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Call "createRoot" to create a React root for displaying content inside a browser DOM element. In our HTML file we have a "div" with id="root" that will serve as the entry point for our App and that is managed by React.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Now we only need to call "root.render()" with a JSX element as parameter.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `root.render(<h1>Hello World!</h1>)`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a JSX element containing the Text "Hello world" and render it. Try pressing the "run code" button below to see the rendered text on screen.

// Hint: The test is automatically passed for this task, just run your code and see if it works as you expect`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a JSX element containing the Text "Hello world" and render it. Try pressing the "run code" button below to see the rendered text on screen.

// Hint: The test is automatically passed for this task, just run your code and see if it works as you expect

import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<h1>Hello World!</h1>)`,
				},
			],
		},
	];
};
