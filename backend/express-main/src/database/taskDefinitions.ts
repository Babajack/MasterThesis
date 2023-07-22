import { SandboxFile, SandboxFiles } from "types";
import { TaskCategory, TaskDescriptionDisplayType, TaskSchema } from "./task";

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

<body style="margin:0;padding:0">
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>`,
	};
};

const getCSSFile = (): SandboxFile => {
	return {
		filename: "App.css",
		code: `
    .App {
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
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

const getTasks_1 = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "JSX";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			category: CATEGORY,
			unlocks: [index],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
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
			category: CATEGORY,
			unlocks: [index],
			description: [
				{ displayType: TaskDescriptionDisplayType.description, text: "Aufgabentext 1" },
			],
			defaultFiles: [getHTMLFile(), getAppFile(), getIndexFile(), getCSSFile()],
		},
	];
};

/******************************************************************************************************************************************************/

const allTasks: TaskSchema[][] = [getTasks_1(), getTasks_2()];

export const getTaskDefinitions = (): TaskSchema[] => {
	return allTasks.reduce((prev, cur) => {
		return prev.concat(cur);
	}, []);
};
