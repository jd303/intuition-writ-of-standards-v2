import { createSlice } from "@reduxjs/toolkit";

export const statusesDataSlice = createSlice({
	name: "statusesData",
	initialState: {
		value: [],
	},
	reducers: {
		updateStatusesData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateStatusesData } = statusesDataSlice.actions;

export const selectStatusesData = (state) => state.statusesData.value;

export default statusesDataSlice.reducer;