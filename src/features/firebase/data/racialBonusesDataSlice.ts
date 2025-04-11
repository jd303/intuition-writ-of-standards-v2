import { createSlice } from "@reduxjs/toolkit";
import { RacialBonusesModel } from "../../models/racialBonusesModel";

interface RacialBonusesData {
	bonuses: RacialBonusesModel[]
}

const initialState: RacialBonusesData = {
	bonuses: []
}

export const racialBonusesDataSlice = createSlice({
	name: "racialBonusesData",
	initialState: initialState,
	reducers: {
		updateRacialBonusesData: (state, data) => {
			state.bonuses = data.payload;
		}
	}
});

export const { updateRacialBonusesData } = racialBonusesDataSlice.actions;

export default racialBonusesDataSlice.reducer;