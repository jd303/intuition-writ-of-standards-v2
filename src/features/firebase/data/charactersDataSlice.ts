import { createSlice } from "@reduxjs/toolkit";
import { CharacterModel } from "../../models/character/characterModel";

interface CharactersData {
	characters: CharacterModel[]
}

const initialState: CharactersData = {
	characters: []
}

export const charactersDataSlice = createSlice({
	name: "charactersData",
	initialState: initialState,
	reducers: {
		updateCharactersData: (state, data) => {
			state.characters = data.payload;
		}
	}
});

export const { updateCharactersData } = charactersDataSlice.actions;

export default charactersDataSlice.reducer;