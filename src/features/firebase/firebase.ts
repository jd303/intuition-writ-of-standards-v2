import { useContext, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { AuthContextType } from './firebaseAuthContextType.ts';
import firebaseConfig from './firebaseconfig.json';

const superAdminUID = "LrOb5kepZdSNuzkH6qGlmIrphas1";
export const firebaseApp = initializeApp(firebaseConfig);
/*const analytics = */ getAnalytics(firebaseApp);

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthState = () => {
	const auth = useContext(AuthContext);

	if (!auth) return { isAuthenticated: false, authLevel: 0 };
	else {
		let isAuthenticated;
		if (auth.user === undefined) isAuthenticated = undefined;
		else if (auth.user === null) isAuthenticated = false;
		else isAuthenticated = true;

		const authLevel = (auth.user && auth.user.uid == superAdminUID && 2) || auth.user && 1 || 0;
		return { ...auth, isAuthenticated: isAuthenticated, authLevel: authLevel }
	}
}