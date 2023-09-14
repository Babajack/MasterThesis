import { CodeFile, CodeFiles } from "types";
import { TaskCategory, TaskDescriptionDisplayType, TaskSchema } from "./task";
import { SandboxSchema } from "./sandbox";

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

const getAppFile = (imports?: string, mainBody?: string, extraBody?: string): CodeFile => {
	return {
		filename: "App.js",
		code: `import "./App.css";
import React from "react"${imports ? "\n" + imports : ""}

export default function App() {
    return (
        <div>Hello World!</div>
    )
}
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
  <script src="sessionContainer/sandbox/build/App.js" async defer></script>
  <link rel="stylesheet" href="sessionContainer/sandbox/build/App.css" />
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
/**************************************************                                                  **************************************************/
/******************************************************************************************************************************************************/

const getSandbox = (): SandboxSchema => {
	return {
		defaultFiles: [getHTMLFile(), getIndexFile(), getAppFile(), getCSSFile()],
	};
};

/******************************************************************************************************************************************************/

export const getSandboxDefinition = (): SandboxSchema => {
	return getSandbox();
};
