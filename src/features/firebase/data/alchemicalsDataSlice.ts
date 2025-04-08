import { createSlice } from "@reduxjs/toolkit";
import { GenericModel } from "../../models/genericModel";
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
			state.recipes = data.payload.filter((item: GenericModel) => item.type == "recipe");
			state.reagents = data.payload.filter((item: GenericModel) => item.type == "reagent");
		}
	}
});

export const { updateAlchemicalsData } = alchemicalsDataSlice.actions;

export default alchemicalsDataSlice.reducer;