import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { GenericModel } from "./models/genericModel";

export const writeDataForCurrentUser = (data: GenericModel[]) => {
	const auth = getAuth();
	const db = getDatabase();

	if (!auth || !auth.currentUser) return;
	set(ref(db, `characters/${auth.currentUser.uid}`), data);
}