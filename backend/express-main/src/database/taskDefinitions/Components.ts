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
			title: "Intro to React Components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
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
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: ``,
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
					code: ``,
				},
			],
		},
	];
};
