import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	LoadingStatus,
	CodeFile,
	CodeFiles,
	SandboxResponse,
	Sandbox,
	SandboxSchemaFrontend,
} from "../../types";
import { httpRequest } from "../../network/httpRequest";
import { AppDispatch, RootState } from "../store";
import { AxiosResponse } from "axios";

type Errors = {
	filename: string;
	errors: { message: string; line: number }[];
}[];

interface SandboxState extends SandboxSchemaFrontend {
	currentFiles: CodeFiles;
	loadingStatus: LoadingStatus;
	buildStatus: LoadingStatus;
	errors?: Errors;
}

const initialState: SandboxState = {
	currentFiles: [],
	loadingStatus: "Idle",
	buildStatus: "Idle",
};

export const sandboxSlice = createSlice({
	name: "sandbox",
	initialState,
	reducers: {
		resetSandboxState: (state) => {
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
	},
	extraReducers: (builder) => {
		builder.addCase("auth/logout/fulfilled", (state) => {
			return initialState;
		});
		builder.addCase(fetchSandbox.pending, (state) => {
			state.loadingStatus = "Pending";
		});
		builder.addCase(fetchSandbox.rejected, (state) => {
			state.loadingStatus = "Error";
		});
		builder.addCase(fetchSandbox.fulfilled, (state, action: PayloadAction<SandboxResponse>) => {
			return {
				...state,
				...action.payload,
				currentFiles:
					state.currentFiles.length > 0 ? state.currentFiles : action.payload.defaultFiles ?? [],
				loadingStatus: "Success",
			};
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

export const { resetSandboxState, setCurrentFiles, updateFile, deleteFileByName } =
	sandboxSlice.actions;

export default sandboxSlice.reducer;

export const updateCode = (files: CodeFiles) => (dispatch: AppDispatch) => {
	dispatch(updateCodeThunk(files)).then((response) => {
		if (response.payload.status === 202) dispatch(updateCodeThunk(files));
	});
};

/* --------- async thunks --------- */

export const fetchSandbox = createAsyncThunk<SandboxResponse, void, { state: RootState }>(
	"sandbox/fetchSandbox",
	async (payload, thunkApi) => {
		const response = await httpRequest.fetchSandbox(thunkApi.getState().user.sandbox.sandboxId);
		return response.data;
	}
);

export const updateCodeThunk = createAsyncThunk<any, CodeFiles, { state: RootState }>(
	"sandbox/updateCode",
	async (payload, thunkApi) => {
		const response = await httpRequest.updateCode(payload, "sandbox");
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
>("sandbox/addNewFile", async (payload, thunkApi) => {
	const files = thunkApi.getState().sandbox.currentFiles;
	if (files.some((elem) => elem.filename === payload.filename))
		return thunkApi.rejectWithValue("Datei existiert bereits");
	else return thunkApi.fulfillWithValue({ filename: payload.filename });
});
