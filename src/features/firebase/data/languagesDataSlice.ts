import { createSlice } from "@reduxjs/toolkit";
import { LanguageModel } from "../../models/languageModel";

interface LanguagesData {
	languages: LanguageModel[]
}

const initialState: LanguagesData = {
	languages: []
}

export const languagesDataSlice = createSlice({
	name: "languagesData",
	initialState: initialState,
	reducers: {
		updateLanguagesData: (state, data) => {
			state.languages = data.payload;
		}
	}
});

export const { updateLanguagesData } = languagesDataSlice.actions;

export default languagesDataSlice.reducer;