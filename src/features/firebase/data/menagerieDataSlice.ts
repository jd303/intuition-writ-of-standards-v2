import { createSlice } from "@reduxjs/toolkit";
import { GenericModel } from "../../models/genericModel";

interface MenagerieData {
	menagerie: GenericModel[]
}

const initialState: MenagerieData = {
	menagerie: []
}

export const menagerieDataSlice = createSlice({
	name: "menagerieData",
	initialState: initialState,
	reducers: {
		updateMenagerieData: (state, data) => {
			state.menagerie = data.payload;
		}
	}
});

export const { updateMenagerieData } = menagerieDataSlice.actions;

export default menagerieDataSlice.reducer;