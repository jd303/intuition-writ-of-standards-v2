import { createSlice } from "@reduxjs/toolkit";
import { GenericModel } from "../../models/genericModel";

interface CompanionMovesData {
	companionMoves: GenericModel[]
}

const initialState: CompanionMovesData = {
	companionMoves: []
}

export const companionMovesDataSlice = createSlice({
	name: "companionMovesData",
	initialState: initialState,
	reducers: {
		updateCompanionMovesData: (state, data) => {
			state.companionMoves = data.payload;
		}
	}
});

export const { updateCompanionMovesData } = companionMovesDataSlice.actions;

export default companionMovesDataSlice.reducer;