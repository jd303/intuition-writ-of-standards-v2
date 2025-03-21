import { createSlice } from "@reduxjs/toolkit";

export const movesDataSlice = createSlice({
	name: "movesData",
	initialState: {
		value: [],
	},
	reducers: {
		updateMovesData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateMovesData } = movesDataSlice.actions;

export const selectMovesData = (state) => state.movesData.value;

export default movesDataSlice.reducer;