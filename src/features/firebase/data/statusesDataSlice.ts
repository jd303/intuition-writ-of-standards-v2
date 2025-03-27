import { createSlice } from "@reduxjs/toolkit";

export const statusesDataSlice = createSlice({
	name: "statusesData",
	initialState: {
		statuses: [],
	},
	reducers: {
		updateStatusesData: (state, data) => {
			state.statuses = data.payload;
		}
	}
});

export const { updateStatusesData } = statusesDataSlice.actions;

export default statusesDataSlice.reducer;