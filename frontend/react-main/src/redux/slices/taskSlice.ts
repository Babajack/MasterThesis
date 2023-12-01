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

interface currentFilesMap {
	[taskId: string]: CodeFiles;
}

interface TaskState extends Task {
	loadingStatus: LoadingStatus;
	buildStatus: LoadingStatus;
	errors?: Errors | string;
	testResults?: TestResults;
	//currentFiles: CodeFiles;
	currentFilesMap: currentFilesMap;
	showConfetti: boolean;
}

const initialState: TaskState = {
	currentFilesMap: {},
	loadingStatus: "Idle",
	buildStatus: "Idle",
	task: { _id: "", category: "", index: 0, title: "" },
	showConfetti: false,
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		resetTaskState: (state) => {
			return initialState;
		},
		setCurrentFiles: (state, action: PayloadAction<CodeFiles>) => {
			state.currentFilesMap[state.task._id] = action.payload;
		},
		updateFile: (state, action: PayloadAction<{ old: CodeFile; new: CodeFile }>) => {
			const index = state.currentFilesMap[state.task._id as string].findIndex(
				(file) => file.filename === action.payload.old.filename
			);
			if (index !== -1) state.currentFilesMap[state.task._id as string][index] = action.payload.new;
		},
		deleteFileByName: (state, action: PayloadAction<string>) => {
			const index = state.currentFilesMap[state.task._id as string].findIndex(
				(file) => file.filename === action.payload
			);
			if (index !== -1) state.currentFilesMap[state.task._id as string].splice(index, 1);
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
			state.showConfetti = false;
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
			state.currentFilesMap[action.payload.task._id as string] =
				(state.currentFilesMap[action.payload.task._id as string]?.length > 0
					? state.currentFilesMap[action.payload.task._id as string]
					: action.payload.userCode?.length ?? 0 > 0
					? action.payload.userCode!
					: action.payload.task.defaultFiles!) ?? action.payload.task.defaultFiles!;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.task = action.payload.task;
			state.userSolution = action.payload.userSolution;
			state.isUnlocked = action.payload.isUnlocked;
		});
		builder.addCase(runCodeThunk.pending, (state) => {
			state.buildStatus = "Pending";
			state.errors = undefined;
			state.testResults = undefined;
			state.showConfetti = false;
		});
		builder.addCase(runCodeThunk.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(runCodeThunk.fulfilled, (state, action: PayloadAction<AxiosResponse>) => {
			state.buildStatus = "Success";
			if (action.payload.data?.error) state.errors = action.payload.data.error;
		});
		builder.addCase(runTestThunk.pending, (state) => {
			state.buildStatus = "Pending";
			state.errors = undefined;
			state.testResults = undefined;
			state.showConfetti = false;
		});
		builder.addCase(runTestThunk.rejected, (state) => {
			state.buildStatus = "Error";
		});
		builder.addCase(runTestThunk.fulfilled, (state, action) => {
			state.buildStatus = "Success";
			if ("error" in action.payload.data) state.errors = action.payload.data.error;
			else {
				state.testResults = action.payload.data.testResults;
				if (action.payload.data.passed) {
					state.userSolution = action.payload.files;
					state.showConfetti = true;
				}
			}
		});
		builder.addCase(addNewFile.fulfilled, (state, action) => {
			state.currentFilesMap[state.task._id as string].push({
				filename: action.payload.filename,
				code: "",
				isDeletable: true,
			});
		});
	},
});

export const { resetTaskState, setCurrentFiles, updateFile, deleteFileByName, setLoadingStatus } =
	taskSlice.actions;

export default taskSlice.reducer;

export const runCode = (files: CodeFiles) => (dispatch: AppDispatch) => {
	dispatch(runCodeThunk(files)).then((response) => {
		if (response.payload.status === 202) dispatch(runCodeThunk(files));
	});
};

export const runTest = (files: CodeFiles, taskId: string) => async (dispatch: AppDispatch) => {
	var response: any = await dispatch(runTestThunk(files));
	if (response.payload.status === 202) {
		response = await dispatch(runTestThunk(files));
	}
	if (response?.payload?.data?.passed) {
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

export const runCodeThunk = createAsyncThunk<any, CodeFiles, { state: RootState }>(
	"task/runCode",
	async (payload, thunkApi) => {
		const response = await httpRequest.runCode(payload, "task", thunkApi.getState().task.task._id);

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
export const runTestThunk = createAsyncThunk<any, CodeFiles, { state: RootState }>(
	"task/runTest",
	async (payload, thunkApi) => {
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
					data: response.data,
					files: payload,
					status: response.status,
				});
			}, delay)
		);
	}
);

export const addNewFile = createAsyncThunk<
	{ filename: string },
	{ filename: string },
	{ state: RootState }
>("task/addNewFile", async (payload, thunkApi) => {
	const taskState = thunkApi.getState().task;
	const files = taskState.currentFilesMap[taskState.task._id];
	if (files.some((elem) => elem.filename === payload.filename))
		return thunkApi.rejectWithValue("Datei existiert bereits");
	else return thunkApi.fulfillWithValue({ filename: payload.filename });
});
