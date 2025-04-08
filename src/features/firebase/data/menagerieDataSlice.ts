import { createSlice } from "@reduxjs/toolkit";
import { MenagerieSpecimenDataModel, MenagerieSpecimenModel } from "../../models/menagerieSpecimenModel";

interface MenagerieData {
	menagerie: MenagerieSpecimenModel[]
}

const initialState: MenagerieData = {
	menagerie: []
}

export const menagerieDataSlice = createSlice({
	name: "menagerieData",
	initialState: initialState,
	reducers: {
		updateMenagerieData: (state, data) => {
			state.menagerie = createMenagerie(data.payload);
		}
	}
});

export const { updateMenagerieData } = menagerieDataSlice.actions;

export default menagerieDataSlice.reducer;

function createMenagerie(menagerie: MenagerieSpecimenDataModel[]): MenagerieSpecimenModel[] {
	const menagerieResponse: MenagerieSpecimenModel[] = [];

	let lastSpecimen: MenagerieSpecimenModel;
	menagerie.forEach((specimen) => {
		if (specimen.id !== undefined) {
			const newSpecimen: MenagerieSpecimenModel = {
				id: specimen.id,
				name: specimen.name,
				type: specimen.type,
				dc: specimen.dc,
				speed: specimen.speed,
				size: specimen.size,
				image: specimen.image,
				str: specimen.str,
				dex: specimen.dex,
				con: specimen.con,
				int: specimen.int,
				wis: specimen.wis,
				cha: specimen.cha,
				verve: specimen.verve,
				combatmoves: [{
					movename: specimen.movename,
					movetype: specimen.movetype,
					movecooldown: specimen.movecooldown,
					moveenergy: specimen.moveenergy,
					movedesc: specimen.movedesc,
					moveeffects: specimen.moveeffects,
					movesave: specimen.movesave,
					companionable: specimen.companionable,
				}],
				resistances: specimen.resistances,
				weaknesses: specimen.weaknesses,
				properties: specimen.properties,
				description: specimen.description,
				companionable: specimen.companionable,
			}
			lastSpecimen = newSpecimen;
			menagerieResponse.push(newSpecimen);
		} else {
			lastSpecimen.combatmoves.push({
				movename: specimen.movename,
				movetype: specimen.movetype,
				movecooldown: specimen.movecooldown,
				moveenergy: specimen.moveenergy,
				movedesc: specimen.movedesc,
				moveeffects: specimen.moveeffects,
				movesave: specimen.movesave,
				companionable: specimen.companionable,
			});
		}
	});

	return menagerieResponse;
}