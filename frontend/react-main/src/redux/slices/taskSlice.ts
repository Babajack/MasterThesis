import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Errors,
	LoadingStatus,
	CodeFile,
	CodeFiles,
	TaskResponse,
	TaskSchemaFrontend,
	Task,
	TestResults,
} from "../../types";
import { httpRequest } from "../../network/httpRequest";
import { AppDispatch, RootState } from "../store";
import { AxiosResponse } from "axios";
import { getUserData, updateUserData } from "./userSlice";

interface TaskState extends Task {
	loadingStatus: LoadingStatus;
	buildStatus: LoadingStatus;
	errors?: Errors | string;
	testResults?: TestResults;
	currentFiles: CodeFiles;
}

const initialState: TaskState = {
	// 	currentFiles: [
	// 		{
	// 			filename: "App.js",
	// 			code: `import "./App.css";
	// import React from "react";

	// function App() {
	// 	return (
	// <div className="App">
	// 	<header className="App-header">
	// 		<img src={""} className="App-logo" alt="logo" />
	// 		<p>TEST</p>
	// 		<a
	// 			className="App-link"
	// 			href="https://reactjs.org"
	// 			target="_blank"
	// 			rel="noopener noreferrer"
	// 		>
	// 			Learn React
	// 		</a>
	// 	</header>
	// </div>
	// 	);
	// }

	// export default App;
	// 			`,
	// 		},
	// 		{
	// 			filename: "index.js",
	// 			code: `import React from "react";
	// import ReactDOM from "react-dom/client";
	// import App from "./App";

	// const root = ReactDOM.createRoot(document.getElementById("root"));
	// root.render(
	// 	<React.StrictMode>
	// 		<App />
	// 	</React.StrictMode>
	// );

	// 			`,
	// 		},
	// 		{
	// 			filename: "App.css",
	// 			code: `.App {
	// 				text-align: center;
	// 			  }

	// 			  .App-logo {
	// 				height: 40vmin;
	// 				pointer-events: none;
	// 			  }

	// 			  @media (prefers-reduced-motion: no-preference) {
	// 				.App-logo {
	// 				  animation: App-logo-spin infinite 20s linear;
	// 				}
	// 			  }

	// 			  .App-header {
	// 				background-color: #282c34;
	// 				min-height: 100vh;
	// 				display: flex;
	// 				flex-direction: column;
	// 				align-items: center;
	// 				justify-content: center;
	// 				font-size: calc(10px + 2vmin);
	// 				color: white;
	// 			  }

	// 			  .App-link {
	// 				color: #61dafb;
	// 			  }

	// 			  @keyframes App-logo-spin {
	// 				from {
	// 				  transform: rotate(0deg);
	// 				}
	// 				to {
	// 				  transform: rotate(360deg);
	// 				}
	// 			  }
	// 			  `,
	// 		},
	// 		{
	// 			filename: "index.html",
	// 			code: `<!DOCTYPE html>
	// <html lang="en">

	// <head>
	//   <meta charset="utf-8" />
	//   <link rel="icon" href="sessionContainer/task/favicon.ico" />
	//   <meta name="viewport" content="width=device-width, initial-scale=1" />
	//   <meta name="theme-color" content="#000000" />
	//   <meta name="description" content="Web site created using create-react-app" />
	//   <link rel="apple-touch-icon" href="sessionContainer/task/logo192.png" />
	//   <!--
	//       manifest.json provides metadata used when your web app is installed on a
	//       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
	//     -->
	//   <link rel="manifest" href="sessionContainer/task/manifest.json" />
	//   <script src="sessionContainer/task/build/App.js" async defer></script>
	//   <link rel="stylesheet" href="sessionContainer/task/build/App.css" />
	//   <title>React App</title>
	// </head>

	// <body style="margin:0;padding:0">
	//    <noscript>You need to enable JavaScript to run this app.</noscript>
	//   <div id="root"></div>

	// </body>

	// </html>
	// 			`,
	// 		},
	// 	],
	currentFiles: [],
	loadingStatus: "Idle",
	buildStatus: "Idle",
	task: { _id: "", category: "", index: 0, title: "" },
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		resetTaskState: (state) => {
			return initialState;
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
		setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
			state.loadingStatus = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase("auth/logout/fulfilled", (state) => {
			return initialState;
		});
		builder.addCase(fetchTask.pending, (state) => {
			state.loadingStatus = "Pending";
			state.buildStatus = "Idle";
		});
		builder.addCase(fetchTask.rejected, (state) => {
			state.loadingStatus = "Error";
		});
		builder.addCase(fetchTask.fulfilled, (state, action) => {
			state.loadingStatus = "Success";
			state.task = action.payload.task;
			state.userCode = action.payload.userCode;
			state.userSolution = action.payload.userSolution;
			state.isUnlocked = action.payload.isUnlocked;
			state.currentFiles =
				state.currentFiles.length > 0
					? state.currentFiles
					: action.payload.userCode?.length ?? 0 > 0
					? action.payload.userCode!
					: action.payload.task.defaultFiles!;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.task = action.payload.task;
			state.userSolution = action.payload.userSolution;
			state.isUnlocked = action.payload.isUnlocked;
		});
		builder.addCase(updateCodeThunk.pending, (state) => {
			state.buildStatus = "Pending";
			state.errors = undefined;
			state.testResults = undefined;
		});
		builder.addCase(updateCodeThunk.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(updateCodeThunk.fulfilled, (state, action: PayloadAction<AxiosResponse>) => {
			state.buildStatus = "Success";
			if (action.payload.data?.error) state.errors = action.payload.data.error;
		});
		builder.addCase(runTestThunk.pending, (state) => {
			state.buildStatus = "Pending";
			state.errors = undefined;
			state.testResults = undefined;
		});
		builder.addCase(runTestThunk.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(runTestThunk.fulfilled, (state, action) => {
			state.buildStatus = "Success";
			if ("error" in action.payload) state.errors = action.payload.error;
			else {
				state.testResults = action.payload.testResults;
				if (action.payload.passed) {
					state.userSolution = action.payload.files;
				}
			}
		});
		builder.addCase(addNewFile.fulfilled, (state, action) => {
			state.currentFiles.push({ filename: action.payload.filename, code: "", isDeletable: true });
		});
	},
});

export const { resetTaskState, setCurrentFiles, updateFile, deleteFileByName, setLoadingStatus } =
	taskSlice.actions;

export default taskSlice.reducer;

export const updateCode = (files: CodeFiles) => (dispatch: AppDispatch) => {
	dispatch(updateCodeThunk(files)).then((response) => {
		if (response.payload.status === 202) dispatch(updateCodeThunk(files));
	});
};

export const runTest = (files: CodeFiles, taskId: string) => async (dispatch: AppDispatch) => {
	var response: any = await dispatch(runTestThunk(files));
	if (response.payload.status === 202) {
		response = await dispatch(runTestThunk(files));
	}
	if (response.payload.passed) {
		dispatch(updateUserData());
		dispatch(updateTask(taskId));
	}
};

/* --------- async thunks --------- */

export const fetchTask = createAsyncThunk<Task, string, any>(
	"task/fetchTask",
	async (payload: string, thunkApi) => {
		const response = await httpRequest.fetchTask(payload);
		if (response) return response.data;
		else return thunkApi.rejectWithValue("error");
	}
);

export const updateTask = createAsyncThunk<Task, string, any>(
	"task/updateTask",
	async (payload: string, thunkApi) => {
		const response = await httpRequest.fetchTask(payload);
		if (response) return response.data;
		else return thunkApi.rejectWithValue("error");
	}
);

export const updateCodeThunk = createAsyncThunk<any, CodeFiles, { state: RootState }>(
	"task/updateCode",
	async (payload, thunkApi) => {
		const response = await httpRequest.updateCode(
			payload,
			"task",
			thunkApi.getState().task.task._id
		);

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
export const runTestThunk = createAsyncThunk<
	| { testResults: TestResults; passed: boolean; files: CodeFiles; status: number }
	| { error: string },
	CodeFiles,
	{ state: RootState }
>("task/runTest", async (payload, thunkApi) => {
	const taskId = thunkApi.getState().task.task._id;
	const response = await httpRequest.runTest(payload, taskId);

	let delay = 0;
	if (response.status === 202) {
		delay = 5000;
	} else {
		delay = 500;
	}
	return await new Promise((resolve) =>
		setTimeout(() => {
			resolve({
				passed: response.data.passed,
				files: payload,
				testResults: response.data.testResults,
				status: response.status,
			});
		}, delay)
	);
});

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
