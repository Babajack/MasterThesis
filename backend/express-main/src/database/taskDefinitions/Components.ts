/******************************************************************************************************************************************************/
/**************************************************                 Components                       **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import {
	getHTMLFile,
	getAppFile,
	getIndexFile,
	getAppCSSFile,
	getIndexCSSFile,
} from "./configuration";

export const getTasks_Components = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "Components";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to React components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `React components are the building blocks of React applications. Every piece of user interface is expressed using reusable components. For example, if you take a look on this website, you can see a navigation bar at the top, a box with the text you are currently reading, a code editor with some buttons and an area showing the rendered website or the test results. All of these pieces could be implemented as reusable components. These components can be composed of other components and so on, forming a design by composition.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Basically, a React component is just a JavaScript function that returns a JSX element where the function name <b>needs to be capitalized</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Hello() {
	return (
		<h1>Hello!</h1>
	)
}

// or as an arrow function
const Hello = () => {
	return (
		<h1>Hello!</h1>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This component can now be used inside other components:`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function App() {
	return (
		<div>
			<h1>This is my App!</h1>
			<Hello />
			<Hello />
		</div>
	)
}


// what the browser will see in the end:
<div>
	<h1>This is my App!</h1>
	<h1>Hello!</h1>
	<h1>Hello!</h1>
</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `As you can see, HTML tags are lowercase and components are capitalized, so React knows when we want to use a component.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `The choice of using arrow functions vs regular functions as React components is completely opinionated.`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.


export {Title, Paragraph, App}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.
function Title() {
	return (
		<h1>Welcome to React!</h1>
	);
}


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.
function Paragraph() {
	return (
		<p>React makes building user interfaces a breeze.</p>
	);
}


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.
function App() {
	return (
		<div>
			<Title />
			<Paragraph />
		</div>
	);
}


export {Title, Paragraph, App}`,
				},
			],
		},

		{
			// -- TASK 2 --
			index: index++,
			title: "Importing and Exporting",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `As components are supposed to be reusable, nested units of your app and you will create a lot of components as your app grows, it makes sense to split them into different files to keep an overview. The recommended basic structure of a new React app consists of two files: An index file, rendering the root component, and an app file, the actual root component that gets rendered. Every newly created component will then be part of the root component as one of its children or sub-children etc.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `To manage multiple component files, we need to export our component in that specified new file and import it wherever we are going to use it. We can either use "default" or "named" exports and imports.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// default export:
export default function App() {
	return (
		<h1>Hello World</h1>
	)
}

// named export:
export function App() {
	return (
		<h1>Hello World</h1>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// default import:
import App from "./App"
import AnyNameYouWant from "./App" // valid

// named import:
import {App} from "./App"
import {AnyNameYouWant} from "./App" // invalid
import {App as AnyNameYouWant} from "./App" // valid`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `There are a few key aspects for each import and export type:<p> <h5>Default Export</h5> <ul> <li>You can only have one default export per module.</li> <li>When you import a default export, you can name it anything you like.</li> <li>It's useful when a module only exports one thing, like a component in React.</li> </ul> </p>
					<p> <h5>Named Export</h5> <ul> <li>You can have multiple named exports per module.</li> <li>When you import a named export, you have to use the exact name that was used to export it (or use aliasing).</li> <li>Useful when a module exports multiple things.</li> </ul> </p>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `In React, depending on your team, it might be a convention that component files end with ".jsx" instead of ".js". However, React will recognize and process components in files with either extension and is flexible in this regard.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component called "Greeting" in a file named "Greeting.js" or "Greeting.jsx". The component should render an <h2> tag with the text "Hello, React!". Use default export to export the component.
// hint: Don't forget to import React in your components!


// 2) Create two functions "add" and "subtract" in a file named "Utilities.js". Both functions take two parameters and adds or subtracts the two numbers respectively and returns the result. Use named export to export the two functions.


// 3) Import the "Greeting" component in this file and render it in the App component found below.
// hint: all files in this editor are in the same directory, which means "./" as a prefix will find it


export default function App() {
	return (
		<div>
			{/* render your component here */}
		</div>
	)
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import Greeting from "./Greeting"

// YOUR TASK

// 1) Create a React component called "Greeting" in a file named "Greeting.js" or "Greeting.jsx". The component should render an <h2> tag with the text "Hello, React!". Use default export to export the component.
// hint: Don't forget to import React in your components!


// 2) Create two functions "add" and "subtract" in a file named "Utilities.js". Both functions take two parameters and adds or subtracts the two numbers respectively and returns the result. Use named export to export the two functions.


// 3) Import the "Greeting" component in this file and render it in the App component found below.
// hint: all files in this editor are in the same directory, which means "./" as a prefix will find it


export default function App() {
	return (
		<div>
			{/* render your component here */}
			<Greeting />
		</div>
	)
}`,
				},
				{
					filename: "Greeting.jsx",
					code: `import React from 'react';

export default function Greeting() {
	return <h2>Hello, React!</h2>;
}`,
				},
				{
					filename: "Utilities.js",
					code: `export function add(a, b) {
	return a + b;
}

export function subtract(a, b) {
	return a - b;
}`,
				},
			],
		},
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to React components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `React components are the building blocks of React applications. Every piece of user interface is expressed using reusable components. For example, if you take a look on this website, you can see a navigation bar at the top, a box with the text you are currently reading, a code editor with some buttons and an area showing the rendered website or the test results. All of these pieces could be implemented as reusable components. These components can be composed of other components and so on, forming a design by composition.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Basically, a React component is just a JavaScript function that returns a JSX element where the function name <b>needs to be capitalized</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Hello() {
	return (
		<h1>Hello!</h1>
	)
}

// or as an arrow function
const Hello = () => {
	return (
		<h1>Hello!</h1>
	)
}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.


export {Title, Paragraph, App}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.
function Title() {
	return (
		<h1>Welcome to React!</h1>
	);
}


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.
function Paragraph() {
	return (
		<p>React makes building user interfaces a breeze.</p>
	);
}


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.
function App() {
	return (
		<div>
			<Title />
			<Paragraph />
		</div>
	);
}


export {Title, Paragraph, App}`,
				},
			],
		},
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to React components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `React components are the building blocks of React applications. Every piece of user interface is expressed using reusable components. For example, if you take a look on this website, you can see a navigation bar at the top, a box with the text you are currently reading, a code editor with some buttons and an area showing the rendered website or the test results. All of these pieces could be implemented as reusable components. These components can be composed of other components and so on, forming a design by composition.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Basically, a React component is just a JavaScript function that returns a JSX element where the function name <b>needs to be capitalized</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Hello() {
	return (
		<h1>Hello!</h1>
	)
}

// or as an arrow function
const Hello = () => {
	return (
		<h1>Hello!</h1>
	)
}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.


export {Title, Paragraph, App}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.
function Title() {
	return (
		<h1>Welcome to React!</h1>
	);
}


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.
function Paragraph() {
	return (
		<p>React makes building user interfaces a breeze.</p>
	);
}


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.
function App() {
	return (
		<div>
			<Title />
			<Paragraph />
		</div>
	);
}


export {Title, Paragraph, App}`,
				},
			],
		},
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to React components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `React components are the building blocks of React applications. Every piece of user interface is expressed using reusable components. For example, if you take a look on this website, you can see a navigation bar at the top, a box with the text you are currently reading, a code editor with some buttons and an area showing the rendered website or the test results. All of these pieces could be implemented as reusable components. These components can be composed of other components and so on, forming a design by composition.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Basically, a React component is just a JavaScript function that returns a JSX element where the function name <b>needs to be capitalized</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Hello() {
	return (
		<h1>Hello!</h1>
	)
}

// or as an arrow function
const Hello = () => {
	return (
		<h1>Hello!</h1>
	)
}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.


export {Title, Paragraph, App}`,
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
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.
function Title() {
	return (
		<h1>Welcome to React!</h1>
	);
}


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.
function Paragraph() {
	return (
		<p>React makes building user interfaces a breeze.</p>
	);
}


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.
function App() {
	return (
		<div>
			<Title />
			<Paragraph />
		</div>
	);
}


export {Title, Paragraph, App}`,
				},
			],
		},
	];
};
