import { createSlice } from "@reduxjs/toolkit";

export const dcsDataSlice = createSlice({
	name: "dcsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateDcsData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateDcsData } = dcsDataSlice.actions;

export default dcsDataSlice.reducer;