import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";
import sandboxReducer from "./slices/sandboxSlice";

export const store = configureStore({
	reducer: {
		task: taskReducer,
		user: userReducer,
		sandbox: sandboxReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
