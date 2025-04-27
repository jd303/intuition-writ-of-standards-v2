import { createSlice } from "@reduxjs/toolkit";
import { PsionicPowerModel } from "../../models/psionicPowerModel";

interface PsionicPowersData {
	powers: PsionicPowerModel[]
}

const initialState: PsionicPowersData = {
	powers: []
}

export const psionicPowersDataSlice = createSlice({
	name: "psionicPowersData",
	initialState: initialState,
	reducers: {
		updatePsionicPowersData: (state, data) => {
			state.powers = data.payload;
		}
	}
});

export const { updatePsionicPowersData } = psionicPowersDataSlice.actions;

export default psionicPowersDataSlice.reducer;