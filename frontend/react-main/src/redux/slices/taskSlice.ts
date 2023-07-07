import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, SandboxFile, SandboxFiles, TaskResponse } from "../../types";
import { httpRequest } from "../../network/httpRequest";
import { RootState } from "../store";

interface TaskState {
	description: string;
	currentFiles: SandboxFiles;
	defaultFiles: SandboxFiles;
	successFiles?: SandboxFiles;
	loadingStatus: LoadingStatus;
	buildStatus: LoadingStatus;
}

const initialState: TaskState = {
	description: "",
	currentFiles: [
		{
			filename: "App.js",
			code: `import "./App.css";
import React from "react";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={""} className="App-logo" alt="logo" />
				<p>TEST</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
			`,
		},
		{
			filename: "index.js",
			code: `import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

			`,
		},
		{
			filename: "style.css",
			code: "",
		},
		{
			filename: "index.html",
			code: `<!DOCTYPE html>
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

</html>
			`,
		},
	],
	defaultFiles: [{ filename: "app.js", code: "" }],
	loadingStatus: "Idle",
	buildStatus: "Idle",
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		resetTaskState: (state) => {
			state.description = "";
			state.currentFiles = [];
			state.defaultFiles = [];
			state.successFiles = undefined;
			state.loadingStatus = "Idle";
		},
		setCurrentFiles: (state, action: PayloadAction<SandboxFiles>) => {
			state.currentFiles = action.payload;
		},
		updateFile: (state, action: PayloadAction<{ old: SandboxFile; new: SandboxFile }>) => {
			const index = state.currentFiles.findIndex(
				(file) => file.filename === action.payload.old.filename
			);
			if (index !== -1) state.currentFiles[index] = action.payload.new;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTask.pending, (state) => {
			state.loadingStatus = "Pending";
		});
		builder.addCase(fetchTask.rejected, (state) => {
			state.loadingStatus = "Error";
		});
		builder.addCase(fetchTask.fulfilled, (state, action: PayloadAction<TaskResponse>) => {
			state.loadingStatus = "Success";
			state.description = action.payload.description;
			state.currentFiles = action.payload.currentFiles ?? action.payload.defaultFiles;
			state.defaultFiles = action.payload.defaultFiles;
			state.successFiles = action.payload.successFiles ?? undefined;
		});
		builder.addCase(updateCode.pending, (state) => {
			state.buildStatus = "Pending";
		});
		builder.addCase(updateCode.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(updateCode.fulfilled, (state, action) => {
			//setTimeout(() => (state.buildStatus = "Success"), 1000);
			state.buildStatus = "Success";
		});
	},
});

export const { resetTaskState, setCurrentFiles, updateFile } = taskSlice.actions;

export default taskSlice.reducer;

/* --------- async thunks --------- */

export const fetchTask = createAsyncThunk(
	"task/fetchTask",
	async (payload: { taskID: string }, thunkApi) => {
		const response = await httpRequest.fetchTask(payload.taskID);
		return response.data;
	}
);

export const updateCode = createAsyncThunk<void, void, { state: RootState }>(
	"task/updateCode",
	async (payload, thunkApi) => {
		const response = await httpRequest.updateCode(thunkApi.getState().task.currentFiles);
		return response.data;
	}
);
