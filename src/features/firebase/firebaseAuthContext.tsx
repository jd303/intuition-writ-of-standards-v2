import { useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseApp, AuthContext } from './firebase.ts';

interface AuthContextProviderProps {
	children: ReactNode;
}

// Create an auth context
export const AuthContextProvider = (props: AuthContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(firebaseApp),
			(user) => {
				console.log("USER SET", user);
				setUser(user);
			},
			(error) => {
				setError(error);
			});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user, error }}>{props.children}</AuthContext.Provider>
}