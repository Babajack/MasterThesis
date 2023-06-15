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
			.addCase(fetchUser.pending, (state) => {
				state.loadingStatus = "Pending";
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
				state.loadingStatus = "Success";
				state.username = action.payload.username;
				if (action.payload.username) {
					state.isLoggedIn = true;
				}
			})
			.addCase(fetchUser.rejected, (state) => {
				state.loadingStatus = "Error";
			});
	},
});

export const { setIsLoggedIn, setUsername } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = createAsyncThunk("data/fetchUser", async () => {
	const user = await httpRequest.getUserData();
	return user.data;
});
