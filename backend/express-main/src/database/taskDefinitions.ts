import { SandboxFile, SandboxFiles } from "types";
import { TaskDescriptionDisplayType, TaskSchema } from "./task";

const getIndexFile = (imports?: string, mainBody?: string, extraBody?: string): SandboxFile => {
	return {
		filename: "index.js",
		code: `
        import React from "react"
        import ReactDOM from "react-dom/client";
        import App from "./App";
        ${imports}

        const rootElement = document.getElementById("root");
        const root = createRoot(rootElement);
        root.render(
            <App />
        );
        `,
	};
};

const getAppFile = (imports?: string, mainBody?: string, extraBody?: string): SandboxFile => {
	return {
		filename: "App.js",
		code: `
        import React from "react"
        ${imports}

        export default function App() {
            return (
                <div>Hello World!</div>
            )
        }
        `,
	};
};

const getHTMLFile = (): SandboxFile => {
	return {
		filename: "index.html",
		code: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="sessionContainer/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="sessionContainer/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="sessionContainer/manifest.json" />
  <script src="sessionContainer/build/App.js" async defer></script>
  <link rel="stylesheet" href="sessionContainer/build/App.css" />
  <title>React App</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>`,
	};
};

/******************************************************************************************************************************************************/
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

const getTasks_1 = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY = "JSX";

	let index = 0;

	return [
		{
			// -- TASK 1 --
			index: index++,
			category: CATEGORY,
			unlocks: [index],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [getHTMLFile(), getAppFile(), getIndexFile()],
		},
	];
};

/******************************************************************************************************************************************************/

const allTasks: TaskSchema[][] = [getTasks_1()];

export const getTaskDefinitions = (): TaskSchema[] => {
	return allTasks.reduce((prev, cur) => {
		return prev.concat(cur);
	}, []);
};
