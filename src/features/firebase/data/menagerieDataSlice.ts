import { createSlice } from "@reduxjs/toolkit";
import { MenagerieSpecimen, MenagerieSpecimenDatabaseModel, MenagerieSpecimenLocalModel } from "../../models/menagerieSpecimenModel";

interface MenagerieSliceData {
	menagerie: MenagerieSpecimenLocalModel[]
}

const initialState: MenagerieSliceData = {
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

function createMenagerie(menagerie: MenagerieSpecimenDatabaseModel[]) {
	const menagerieResponse: MenagerieSpecimen[] = [];

	let lastSpecimen: MenagerieSpecimen;
	menagerie.forEach((specimen) => {
		if (specimen.id !== undefined) {
			const newSpecimen = new MenagerieSpecimen({
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
				resistances: specimen.resistances,
				weaknesses: specimen.weaknesses,
				properties: specimen.properties,
				description: specimen.description,
				companionable: specimen.companionable,
				combatMoves: [{
					movename: specimen.movename!,
					moveshape: specimen.moveshape!,
					movecooldown: specimen.movecooldown!,
					moveenergy: specimen.moveenergy!,
					movedesc: specimen.movedesc!,
					moveeffects: specimen.moveeffects!,
					movesave: specimen.movesave!,
				}]
			});

			lastSpecimen = newSpecimen;
			menagerieResponse.push(newSpecimen);
		} else {
			lastSpecimen.combatMoves.push({
				movename: specimen.movename!,
				moveshape: specimen.moveshape!,
				movecooldown: specimen.movecooldown!,
				moveenergy: specimen.moveenergy!,
				movedesc: specimen.movedesc!,
				moveeffects: specimen.moveeffects!,
				movesave: specimen.movesave!
			});
		}
	});

	return JSON.parse(JSON.stringify(menagerieResponse));
}