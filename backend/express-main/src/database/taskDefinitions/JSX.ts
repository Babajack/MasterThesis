/******************************************************************************************************************************************************/
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import { getHTMLFile, getAppFile, getIndexFile, getCSSFile } from "./configuration";

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
					text: `In this example, JSX allows you to define a React element that represents an <b>h1</b> HTML element with the text "Hello, JSX!" inside it. Under the hood, JSX is transpiled (converted) into regular JavaScript code that creates and manipulates the virtual DOM in React applications.`,
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
					text: "<h5>1. JSX elements must have a single root element</h5><div>You cannot return multiple elements at the top level without wrapping them in a parent element.</div>",
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// This is valid
<div>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>

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
					text: `<h5>3. HTML attributes are written in camelCase</h5><div>In JSX, HTML attributes like "class" and "for" should be written in camelCase as "className" and "htmlFor"</div>`,
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
					code: `// YOUR TASK
					`,
				},
			],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
		{
			// -- TASK 3 --
			index: index++,
			title: "JSX Basics (2/4)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `// YOUR TASK
					`,
				},
			],
			solutionFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};
