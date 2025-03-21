import { createSlice } from "@reduxjs/toolkit";

export const menagerieDataSlice = createSlice({
	name: "menagerieData",
	initialState: {
		value: [],
	},
	reducers: {
		updateMenagerieData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateMenagerieData } = menagerieDataSlice.actions;

export const selectMenagerieData = (state) => state.menagerieData.value;

export default menagerieDataSlice.reducer;