/******************************************************************************************************************************************************/
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import { getHTMLFile, getAppFile, getIndexFile, getCSSFile } from "./configuration";

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
