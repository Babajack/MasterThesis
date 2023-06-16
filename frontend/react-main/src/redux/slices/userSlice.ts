import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { httpRequest } from "../../network/httpRequest";

interface UserState {
	username?: string;
	isLoggedIn: boolean;
	loadingStatus: LoadingStatus;
}

interface UserResponse {
	username?: string;
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
			.addCase(loginUser.pending, (state) => {
				state.loadingStatus = "Pending";
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
				state.loadingStatus = "Success";
				state.username = action.payload.username;
				if (action.payload.username) {
					state.isLoggedIn = true;
				}
			})
			.addCase(loginUser.rejected, (state) => {
				state.loadingStatus = "Error";
			});
	},
});

export const { setIsLoggedIn, setUsername } = userSlice.actions;

export default userSlice.reducer;

export const getUserData = createAsyncThunk("data/getUser", async () => {
	const user = await httpRequest.getUserData();
	return user.data;
});

export const loginUser = createAsyncThunk(
	"auth/login",
	async (payload: { username: string; passwort: string }, thunkApi) => {
		const user = await httpRequest.loginUser(payload.username, payload.passwort);
		return user.data;
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (payload: { username: string; passwort: string }, thunkApi) => {
		const user = await httpRequest.registerUser(payload.username, payload.passwort);
		return user.data;
	}
);
