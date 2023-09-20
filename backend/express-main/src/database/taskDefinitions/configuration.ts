import { TaskSchema } from "database/task";
import { CodeFile } from "types";
import { getTasks_Basics } from "./JavaScript Basics";
import { getTasks_JSX } from "./JSX";

export const getIndexFile = (imports?: string, mainBody?: string, extraBody?: string): CodeFile => {
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

export const getAppFile = (
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

export const getHTMLFile = (): CodeFile => {
	return {
		filename: "index.html",
		code: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
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

export const getAppCSSFile = (): CodeFile => {
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
export const getIndexCSSFile = (): CodeFile => {
	return {
		filename: "index.css",
		code: `body {
  margin: 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}
    `,
	};
};

const allTasks: TaskSchema[][] = [getTasks_Basics(), getTasks_JSX()];

export const getTaskDefinitions = (): TaskSchema[] => {
	return allTasks.reduce((prev, cur) => {
		return prev.concat(cur);
	}, []);
};
