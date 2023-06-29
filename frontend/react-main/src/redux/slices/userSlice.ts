import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, UserResponse } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { httpRequest } from "../../network/httpRequest";

interface UserState {
	username?: string;
	isLoggedIn: boolean;
	loadingStatus: LoadingStatus;
	error?: string;
}

const initialState: UserState = {
	isLoggedIn: false,
	loadingStatus: "Idle",
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.pending, (state) => {
				state.loadingStatus = "Pending";
			})
			.addCase(getUserData.fulfilled, (state, action: PayloadAction<UserResponse>) => {
				state.loadingStatus = "Success";
				state.username = action.payload.username;
				if (action.payload.username) {
					state.isLoggedIn = true;
				}
			})
			.addCase(getUserData.rejected, (state) => {
				state.loadingStatus = "Error";
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
				state.username = action.payload.username;
				state.error = action.payload.error;
				if (action.payload.username) {
					state.isLoggedIn = true;
				}
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
				state.username = action.payload.username;
				state.error = action.payload.error;
				if (action.payload.username) {
					state.isLoggedIn = true;
				}
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.isLoggedIn = false;
				state.username = undefined;
			});
	},
});

export const { setIsLoggedIn, setUsername } = userSlice.actions;

export default userSlice.reducer;

/* --------- async thunks --------- */

export const getUserData = createAsyncThunk("auth/getUser", async () => {
	const user = await httpRequest.getUserData();
	return user.data;
});

export const loginUser = createAsyncThunk(
	"auth/login",
	async (payload: { username: string; password: string }, thunkApi) => {
		const user = await httpRequest.loginUser(payload.username, payload.password);
		return user.data;
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (payload: { username: string; password: string }, thunkApi) => {
		const user = await httpRequest.registerUser(payload.username, payload.password);
		return user.data;
	}
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
	const user = await httpRequest.logout();
	return user.data;
});
