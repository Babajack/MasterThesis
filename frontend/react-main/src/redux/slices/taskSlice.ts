import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Errors, LoadingStatus, CodeFile, CodeFiles, TaskResponse } from "../../types";
import { httpRequest } from "../../network/httpRequest";
import { AppDispatch, RootState } from "../store";
import { AxiosResponse } from "axios";

interface TaskState {
	description: string;
	currentFiles: CodeFiles;
	defaultFiles: CodeFiles;
	successFiles?: CodeFiles;
	loadingStatus: LoadingStatus;
	buildStatus: LoadingStatus;
	errors?: Errors;
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
		},
		{
			filename: "index.html",
			code: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="sessionContainer/task/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="sessionContainer/task/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="sessionContainer/task/manifest.json" />
  <script src="sessionContainer/task/build/App.js" async defer></script>
  <link rel="stylesheet" href="sessionContainer/task/build/App.css" />
  <title>React App</title>
</head>

<body style="margin:0;padding:0">
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
		setCurrentFiles: (state, action: PayloadAction<CodeFiles>) => {
			state.currentFiles = action.payload;
		},
		updateFile: (state, action: PayloadAction<{ old: CodeFile; new: CodeFile }>) => {
			const index = state.currentFiles.findIndex(
				(file) => file.filename === action.payload.old.filename
			);
			if (index !== -1) state.currentFiles[index] = action.payload.new;
		},
		deleteFileByName: (state, action: PayloadAction<string>) => {
			const index = state.currentFiles.findIndex((file) => file.filename === action.payload);
			if (index !== -1) state.currentFiles.splice(index, 1);
		},
	},
	extraReducers: (builder) => {
		builder.addCase("auth/logout/fulfilled", (state) => {
			return initialState;
		});
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
		builder.addCase(updateCodeThunk.pending, (state) => {
			state.buildStatus = "Pending";
		});
		builder.addCase(updateCodeThunk.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(updateCodeThunk.fulfilled, (state, action: PayloadAction<AxiosResponse>) => {
			//setTimeout(() => (state.buildStatus = "Success"), 1000);
			state.buildStatus = "Success";
			if (action.payload.data?.error) state.errors = action.payload.data.error;
			else state.errors = undefined;
		});
		builder.addCase(addNewFile.fulfilled, (state, action) => {
			state.currentFiles.push({ filename: action.payload.filename, code: "", isDeletable: true });
		});
	},
});

export const { resetTaskState, setCurrentFiles, updateFile, deleteFileByName } = taskSlice.actions;

export default taskSlice.reducer;

export const updateCode = (files: CodeFiles) => (dispatch: AppDispatch) => {
	dispatch(updateCodeThunk(files)).then((response) => {
		if (response.payload.status === 202) dispatch(updateCodeThunk(files));
	});
};

/* --------- async thunks --------- */

export const fetchTask = createAsyncThunk(
	"task/fetchTask",
	async (payload: { taskID: string }, thunkApi) => {
		const response = await httpRequest.fetchTask(payload.taskID);
		return response.data;
	}
);

export const updateCodeThunk = createAsyncThunk<any, CodeFiles, { state: RootState }>(
	"task/updateCode",
	async (payload, thunkApi) => {
		const response = await httpRequest.updateCode(payload, "task");

		let delay = 0;
		if (response.status === 202) {
			delay = 5000;
		} else {
			delay = 500;
		}
		return await new Promise((resolve) =>
			setTimeout(() => {
				resolve({ data: response.data, status: response.status });
			}, delay)
		);
	}
);

export const addNewFile = createAsyncThunk<
	{ filename: string },
	{ filename: string },
	{ state: RootState }
>("task/addNewFile", async (payload, thunkApi) => {
	const files = thunkApi.getState().task.currentFiles;
	if (files.some((elem) => elem.filename === payload.filename))
		return thunkApi.rejectWithValue("Datei existiert bereits");
	else return thunkApi.fulfillWithValue({ filename: payload.filename });
});
