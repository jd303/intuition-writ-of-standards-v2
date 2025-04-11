import { createSlice } from "@reduxjs/toolkit";
import { WeaponSpecialisationModel } from "../../models/weaponSpecialisationModel";

interface WeaponsSpecialisationsData {
	weaponSpecialisations: WeaponSpecialisationModel[]
}

const initialState: WeaponsSpecialisationsData = {
	weaponSpecialisations: []
}

export const weaponSpecialisationsDataSlice = createSlice({
	name: "weaponSpecialisationsData",
	initialState: initialState,
	reducers: {
		updateWeaponSpecialisationsData: (state, data) => {
			state.weaponSpecialisations = data.payload;
		}
	}
});

export const { updateWeaponSpecialisationsData } = weaponSpecialisationsDataSlice.actions;

export default weaponSpecialisationsDataSlice.reducer;