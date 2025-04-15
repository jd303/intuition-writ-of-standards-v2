import { createSlice } from "@reduxjs/toolkit";
import { SynergyModel } from "../../models/synergyModel";

interface SynergiesData {
	synergies: SynergyModel[];
}

const initialData: SynergiesData = {
	synergies: []
}

export const synergiesDataSlice = createSlice({
	name: "synergiesData",
	initialState: initialData,
	reducers: {
		updateSynergiesData: (state, data) => {
			state.synergies = data.payload;
		}
	}
});

export const { updateSynergiesData } = synergiesDataSlice.actions;

export default synergiesDataSlice.reducer;