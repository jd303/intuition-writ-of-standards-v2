import { createSlice } from "@reduxjs/toolkit";
import { SpellModel } from "../../models/spellModel";

interface SpellsData {
	spells: SpellModel[]
}

const initialState: SpellsData = {
	spells: []
}

export const spellsDataSlice = createSlice({
	name: "spellsData",
	initialState: initialState,
	reducers: {
		updateSpellsData: (state, data) => {
			state.spells = data.payload;
		}
	}
});

export const { updateSpellsData } = spellsDataSlice.actions;

export default spellsDataSlice.reducer;