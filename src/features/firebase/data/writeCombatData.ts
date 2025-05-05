import { getDatabase, ref, set } from "firebase/database";
import { MenagerieSpecimenLocalCombatModel } from "../../models/menagerieSpecimenModel";

export const writeCombatData = (data: { creatures: MenagerieSpecimenLocalCombatModel[] }) => {
	console.log(">> DB", data);
	const db = getDatabase();
	set(ref(db, 'combats'), data);
}