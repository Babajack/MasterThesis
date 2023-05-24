import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
	value: number;
}

const initialState: TaskState = {
	value: 0,
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = taskSlice.actions;

export default taskSlice.reducer;
