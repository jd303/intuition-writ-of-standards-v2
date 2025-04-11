import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { CharacterModel } from "../../models/character/characterModel";

export const writeCharactersData = (data: CharacterModel[]) => {
	console.log(">> DB", data);
	const auth = getAuth();
	const db = getDatabase();
	set(ref(db, `characters_v2/${auth.currentUser!.uid}`), data);
}

export const saveCharacter = (charactersData: CharacterModel[], character: CharacterModel) => {
	// Prepare Characters
	charactersData = charactersData.map(char => char.id == character.id && character || char);
	writeCharactersData(charactersData);

	// Also create local backups
	const backupsFromStorage = localStorage.getItem('characterbackups');
	const backups = backupsFromStorage && JSON.parse(backupsFromStorage) || { 'date': new Date().getTime(), 'bak1': charactersData, 'bak2': '', 'bak3': '' };

	const now = new Date().getTime();
	const day = 24 * 60 * 60 * 1000;
	if (now - backups['date'] > day) {
		backups['bak3'] = backups['bak2'];
		backups['bak2'] = backups['bak1'];
		backups['bak1'] = charactersData;
		backups['date'] = new Date().getTime();
	}

	localStorage.setItem('characterbackups', JSON.stringify(backups));
}