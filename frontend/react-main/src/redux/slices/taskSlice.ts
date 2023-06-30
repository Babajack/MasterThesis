import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, SandboxFiles, TaskResponse } from "../../types";
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
	currentFiles: [],
	defaultFiles: [{ filename: "app,js", code: "" }],
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

export const { resetTaskState } = taskSlice.actions;

export default taskSlice.reducer;

/* --------- async thunks --------- */

export const fetchTask = createAsyncThunk(
	"task/fetchTask",
	async (payload: { taskID: string }, thunkApi) => {
		const response = await httpRequest.fetchTask(payload.taskID);
		return response.data;
	}
);
