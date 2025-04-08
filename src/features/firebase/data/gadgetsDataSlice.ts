import { createSlice } from "@reduxjs/toolkit";
import { GadgetModel } from "../../models/gadgetModel";

interface GadgetData {
	gadgets: GadgetModel[]
}

const initialState: GadgetData = {
	gadgets: []
}

export const gadgetsDataSlice = createSlice({
	name: "gadgetData",
	initialState: initialState,
	reducers: {
		updateGadgetsData: (state, data) => {
			state.gadgets = data.payload;
		}
	}
});

export const { updateGadgetsData } = gadgetsDataSlice.actions;

export default gadgetsDataSlice.reducer;