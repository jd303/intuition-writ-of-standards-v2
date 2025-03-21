import { createSlice } from "@reduxjs/toolkit";

export const spellsDataSlice = createSlice({
	name: "spellsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateSpellsData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateSpellsData } = spellsDataSlice.actions;

export const selectSpellsData = (state) => state.spellsData.value;

export default spellsDataSlice.reducer;