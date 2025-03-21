import { BrowserRouter, Routes, Route } from 'react-router';
import { RouteDefinition, routes } from '../routes.tsx';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp, useAuthState } from '../features/firebase/firebase.ts';
import { useEffect, useMemo } from 'react';
import RouteListener from '../features/routeListener.tsx';
import { useDispatch } from 'react-redux';
import { updateMovesData } from '../features/firebase/data/movesDataSlice';
import { updateCharactersData } from '../features/firebase/data/charactersDataSlice';
import { updateMenagerieData } from '../features/firebase/data/menagerieDataSlice.ts';
import { updateCombatData } from '../features/firebase/data/combatsDataSlice.ts';
import { updateDcsData } from '../features/firebase/data/dcsDataSlice.ts';
import { updateEquipmentData } from '../features/firebase/data/equipmentDataSlice.ts';

import WritLayout from './layout/writLayout.tsx';
import Home from './home/home.tsx';

export function App() {
	const authState = useAuthState();
	const dispatch = useDispatch();
	const database = getDatabase(firebaseApp);

	// Get public data
	useEffect(() => {
		async function collectData() {

			// Collect moves data
			const movesDataRef = await ref(database, '/moves');
			onValue(movesDataRef, (snapshot) => {
				dispatch(updateMovesData(snapshot.val()));
			});

			// Collect spells data
			const spellsDataRef = await ref(database, '/spells');
			onValue(spellsDataRef, (snapshot) => {
				dispatch(updateMovesData(snapshot.val()));
			});

			// Collect statuses data
			const statusesDataRef = await ref(database, '/statuses');
			onValue(statusesDataRef, (snapshot) => {
				dispatch(updateMovesData(snapshot.val()));
			});
		}

		if (authState.authLevel >= 2) {
			// Collect menagerie data
			const menagerieRef = ref(database, `/menagerie`);
			onValue(menagerieRef, (snapshot) => {
				dispatch(updateMenagerieData(snapshot.val()));
			});

			// Collect combats data
			const combatsRef = ref(database, `/combats`);
			onValue(combatsRef, (snapshot) => {
				dispatch(updateCombatData(snapshot.val()));
			});

			// Collect dcs data
			const dcsRef = ref(database, '/dcs');
			onValue(dcsRef, (snapshot) => {
				dispatch(updateDcsData(snapshot.val()));
			});

			// Collect equipment data
			const equipmentRef = ref(database, '/equipment');
			onValue(equipmentRef, (snapshot) => {
				dispatch(updateEquipmentData(snapshot.val()));
			});
		}

		collectData();
	}, [authState, database, dispatch]);

	// Get user-specific data
	useEffect(() => {
		onAuthStateChanged(getAuth(firebaseApp),
			(user) => {
				if (user && user.uid) {
					const charactersRef = ref(database, `/characters/${user.uid}`);
					onValue(charactersRef, (snapshot) => {
						console.log('Got chars:', snapshot.val());
						dispatch(updateCharactersData(snapshot.val()));
					});
				}
			},
			(error: Error) => {
				console.error("Unable to resolve Firebase Auth", error);
			});
	});

	const routeJSX = useMemo(() => {
		return (
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route element={<WritLayout />}>
					{routes.map((route: RouteDefinition) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				</Route>
			</Routes>
		)
	}, []);

	return (
		<>
			<BrowserRouter>
				<RouteListener />
				{routeJSX}
			</BrowserRouter>
		</>
	);
}
