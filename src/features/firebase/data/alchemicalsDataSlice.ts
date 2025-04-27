import { createSlice } from "@reduxjs/toolkit";
import { AlchemicalModel } from "../../models/alchemicalModel";

interface AlchemicalsData {
	recipes: AlchemicalModel[];
	reagents: AlchemicalModel[];
}

const initialState: AlchemicalsData = {
	recipes: [],
	reagents: [],
}

export const alchemicalsDataSlice = createSlice({
	name: "alchemicalsData",
	initialState: initialState,
	reducers: {
		updateAlchemicalsData: (state, data) => {
			state.recipes = data.payload.filter((item: AlchemicalModel) => item.type == "recipe");
			state.reagents = data.payload.filter((item: AlchemicalModel) => item.type == "reagent");
		}
	}
});

export const { updateAlchemicalsData } = alchemicalsDataSlice.actions;

export default alchemicalsDataSlice.reducer;