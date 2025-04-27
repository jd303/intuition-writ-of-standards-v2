import { createSlice } from "@reduxjs/toolkit";

export const combatDataSlice = createSlice({
	name: "combatData",
	initialState: {
		value: [],
	},
	reducers: {
		updateCombatData: (state, data) => {
			state.value = data.payload;
		}
	}
});

export const { updateCombatData } = combatDataSlice.actions;

export default combatDataSlice.reducer;