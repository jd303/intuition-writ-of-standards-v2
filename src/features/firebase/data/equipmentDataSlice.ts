import { createSlice } from "@reduxjs/toolkit";
import { GenericModel } from "../../models/genericModel";

interface EquipmentData {
	equipment: GenericModel[]
}

const initialState: EquipmentData = {
	equipment: []
}

export const equipmentDataSlice = createSlice({
	name: "equipmentData",
	initialState: initialState,
	reducers: {
		updateEquipmentData: (state, data) => {
			state.equipment = data.payload;
		}
	}
});

export const { updateEquipmentData } = equipmentDataSlice.actions;

export default equipmentDataSlice.reducer;