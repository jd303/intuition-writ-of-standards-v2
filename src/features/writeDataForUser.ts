import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { GenericModel } from "./models/genericModel";

export const writeDataForCurrentUser = (data: GenericModel[]) => {
	const auth = getAuth();
	const db = getDatabase();

	if (!auth || !auth.currentUser) return;
	set(ref(db, `characters_v2/${auth.currentUser.uid}`), data);
}