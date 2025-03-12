import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from './firebaseconfig.json';

export const firebaseApp = initializeApp(firebaseConfig);
/*const analytics = */ getAnalytics(firebaseApp);

// Create an auth context
export const AuthContext = createContext(null);
export const AuthContextProvider = (props: unknown) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(firebaseApp),
			(user) => {
				setUser(user);
			},
			(error) => {
				setError(error);
			});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={ { user, error } } {...props } />

}

export const useAuthState = () => {
	const auth = useContext(AuthContext);

	if (!auth) return false;
	else {
		let isAuthenticated;
		if (auth.user === undefined) isAuthenticated = undefined;
		else if (auth.user === null) isAuthenticated = false;
		else isAuthenticated = true;
		return { ...auth, isAuthenticated: isAuthenticated }
	}
}