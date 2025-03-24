import { createSlice } from "@reduxjs/toolkit";
import { MovesCategories, prepareMoves } from "./prepareMoves";

interface MovesData {
	moves: MovesCategories
}

const initialState: MovesData = {
	moves: {}
}

export const movesDataSlice = createSlice({
	name: "movesData",
	initialState: initialState,
	reducers: {
		updateMovesData: (state, data) => {
			const preparedData = prepareMoves(data.payload);
			state.moves = preparedData;
		}
	}
});

export const { updateMovesData } = movesDataSlice.actions;

export default movesDataSlice.reducer;