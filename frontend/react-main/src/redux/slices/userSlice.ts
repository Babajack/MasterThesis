import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, SandboxFiles, TaskSchema, UserResponse } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { httpRequest } from "../../network/httpRequest";

interface UserState {
	username?: string;
	isLoggedIn: boolean;
	loadingStatus: LoadingStatus;
	error?: string;
	tasks: {
		task: TaskSchema;
		solutionFiles: SandboxFiles;
		userFiles: SandboxFiles;
	}[];
}

const initialState: UserState = {
	isLoggedIn: false,
	loadingStatus: "Idle",
	tasks: [],
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
				return { ...state, ...action.payload, loadingStatus: "Success", isLoggedIn: true };
			})
			.addCase(getUserData.rejected, (state, action) => {
				//state.error = action.payload as string;
				state.loadingStatus = "Error";
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
			});
	},
});

export const { setIsLoggedIn, setUsername, setError } = userSlice.actions;

export default userSlice.reducer;

/* --------- async thunks --------- */

export const getUserData = createAsyncThunk("auth/getUser", async (payload: void, thunkApi) => {
	const user = await httpRequest.getUserData();
	if ("error" in user.data) return thunkApi.rejectWithValue(user.data.error);
	else return thunkApi.fulfillWithValue(user.data);
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
