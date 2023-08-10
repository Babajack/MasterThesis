import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { httpRequest } from "../../network/httpRequest";
import {
	CodeFiles,
	CodeType,
	LoadingStatus,
	Task,
	TaskResponse,
	TaskSchemaFrontend,
	UserSchemaFrontend,
} from "../../types";
import { RootState } from "../store";

interface UserState extends UserSchemaFrontend {
	isLoggedIn: boolean;
	loadingStatus: LoadingStatus;
	error?: string;
}

const initialState: UserState = {
	username: "",
	isLoggedIn: false,
	loadingStatus: "Idle",
	tasks: [],
	sandbox: { sandboxId: "" },
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		setError: (state, action: PayloadAction<string | undefined>) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.pending, (state) => {
				state.loadingStatus = "Pending";
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.loadingStatus = "Success";
				state.isLoggedIn = true;
				state.sandbox = action.payload.sandbox;
				state.tasks = action.payload.tasks;
				state.username = action.payload.username;
				state.currentTaskId = action.payload.currentTaskId;
			})
			.addCase(getUserData.rejected, (state, action) => {
				//state.error = action.payload as string;
				state.loadingStatus = "Error";
				state.isLoggedIn = false;
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				state.sandbox = action.payload.sandbox;
				state.tasks = action.payload.tasks;
				state.username = action.payload.username;
				state.currentTaskId = action.payload.currentTaskId;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.username = action.payload.username;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isLoggedIn = false;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.username = action.payload.username;
				state.isLoggedIn = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload as string;
				state.isLoggedIn = false;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				// state.isLoggedIn = false;
				// state.username = undefined;
				return { ...initialState, loadingStatus: "Success" };
			})
			.addCase("task/fetchTask/fulfilled", (state, action: any) => {
				state.currentTaskId = action.payload.task._id;
			})
			.addCase("task/runTestThunk/fullfilled", (state, action: any) => {
				if (action.payload.passed) {
					const index = state.tasks.findIndex((elem) => elem.task._id === action.payload.taskId);
					if (index !== -1) {
						// unlock tasks
					}
				}
			});
	},
});

export const { setIsLoggedIn, setUsername, setError } = userSlice.actions;

export default userSlice.reducer;

export const getTasksByCategory = (state: RootState) => {
	return state.user.tasks.reduce(
		(previous, current) => {
			const index = previous.findIndex((elem) => elem.category === current.task.category);
			if (index === -1) {
				previous.push({ category: current.task.category, tasks: [current] });
			} else {
				previous[index].tasks.push(current);
			}
			return previous;
		},
		[] as { category: string; tasks: Task[] }[]
	);
};

/* --------- async thunks --------- */

export const getUserData = createAsyncThunk("user/getUser", async (payload: void, thunkApi) => {
	const user = await httpRequest.getUserData();
	if (!user) return thunkApi.rejectWithValue("Error");
	else if ("error" in user.data) return thunkApi.rejectWithValue(user.data.error);
	else return thunkApi.fulfillWithValue(user.data);
});

export const updateUserData = createAsyncThunk(
	"user/updateUser",
	async (payload: void, thunkApi) => {
		const user = await httpRequest.getUserData();
		if ("error" in user.data) return thunkApi.rejectWithValue(user.data.error);
		else return thunkApi.fulfillWithValue(user.data);
	}
);

export const updateUserCode = createAsyncThunk<
	any,
	{ files: CodeFiles; type: CodeType; taskId?: string },
	{ state: RootState }
>("user/updateUserCode", async (payload, thunkApi) => {
	return await httpRequest.updateUserCode(payload.files, payload.type, payload.taskId);
});

export const loginUser = createAsyncThunk(
	"auth/login",
	async (payload: { username: string; password: string }, thunkApi) => {
		const user = await httpRequest.loginUser(payload.username, payload.password);
		if ("error" in user.data) return thunkApi.rejectWithValue(user.data.error);
		else return thunkApi.fulfillWithValue(user.data);
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (payload: { username: string; password: string }, thunkApi) => {
		const user = await httpRequest.registerUser(payload.username, payload.password);
		if ("error" in user.data) return thunkApi.rejectWithValue(user.data.error);
		else return thunkApi.fulfillWithValue(user.data);
	}
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
	const user = await httpRequest.logout();
	return user.data;
});
