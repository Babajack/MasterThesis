import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, SandboxFile, SandboxFiles, TaskResponse } from "../../types";
import { httpRequest } from "../../network/httpRequest";

interface TaskState {
	description: string;
	currentFiles: SandboxFiles;
	defaultFiles: SandboxFiles;
	successFiles?: SandboxFiles;
	loadingStatus: LoadingStatus;
}

const initialState: TaskState = {
	description: "",
	currentFiles: [
		{
			filename: "app.js",
			code: "import React from 'react';\r\n\r\nexport function App(props) {\r\n    return (\r\n        <div className='App'>\r\n            <h1>Hello React.</h1>\r\n            <h2>Start editing to see some magic happen!</h2>\r\n        </div>\r\n    );\r\n}\r\n\r\n// Log to console\r\nconsole.log('Hello console')",
		},
		{ filename: "index.js", code: "" },
		{
			filename: "style.css",
			code: "",
		},
		{
			filename: "index.html",
			code: '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n    <meta charset="utf-8" />\r\n    <link rel="icon" href="favicon.ico" />\r\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\r\n    <meta name="theme-color" content="#000000" />\r\n    <meta name="description" content="Web site created using create-react-app" />\r\n    <link rel="apple-touch-icon" href="logo192.png" />\r\n    <!--\r\n      manifest.json provides metadata used when your web app is installed on a\r\n      user\'s mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/\r\n    -->\r\n    <link rel="manifest" href="manifest.json" />\r\n    <!--\r\n      Notice the use of %PUBLIC_URL% in the tags above.\r\n      It will be replaced with the URL of the `public` folder during the build.\r\n      Only files inside the `public` folder can be referenced from the HTML.\r\n\r\n      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\r\n      work correctly both with client-side routing and a non-root public URL.\r\n      Learn how to configure a non-root public URL by running `npm run build`.\r\n    -->\r\n    <script src="build/App.js" async defer></script>\r\n    <link rel="stylesheet" href="build/App.css" />\r\n    <title>React App</title>\r\n</head>\r\n\r\n<body>\r\n    <noscript>You need to enable JavaScript to run this app.</noscript>\r\n    <div id="root"></div>\r\n\r\n\r\n    <!--\r\n      This HTML file is a template.\r\n      If you open it directly in the browser, you will see an empty page.\r\n\r\n      You can add webfonts, meta tags, or analytics to this file.\r\n      The build step will place the bundled scripts into the <body> tag.\r\n\r\n      To begin the development, run `npm start` or `yarn start`.\r\n      To create a production bundle, use `npm run build` or `yarn build`.\r\n    -->\r\n</body>\r\n\r\n</html>',
		},
	],
	defaultFiles: [{ filename: "app.js", code: "" }],
	loadingStatus: "Idle",
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
