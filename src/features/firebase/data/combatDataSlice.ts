import { createSlice } from "@reduxjs/toolkit";
import { MenagerieSpecimenLocalCombatModel } from "../../models/menagerieSpecimenModel";

interface CombatSliceData {
	combat: {
		creatures: MenagerieSpecimenLocalCombatModel[]
	}
}

const initialState: CombatSliceData = {
	combat: {
		creatures: []
	}
}

export const combatDataSlice = createSlice({
	name: "combatData",
	initialState: initialState,
	reducers: {
		updateCombatData: (state, data) => {
			state.combat = data.payload;
		}
	}
});

export const { updateCombatData } = combatDataSlice.actions;

export default combatDataSlice.reducer;