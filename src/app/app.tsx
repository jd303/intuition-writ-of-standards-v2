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
import { updateCompanionMovesData } from '../features/firebase/data/companionMovesDataSlice.ts';
import { updateCombatData } from '../features/firebase/data/combatsDataSlice.ts';
import { updateDcsData } from '../features/firebase/data/dcsDataSlice.ts';
import { updateEquipmentData } from '../features/firebase/data/equipmentDataSlice.ts';
import { updateSpellsData } from '../features/firebase/data/spellsDataSlice.ts';
import { updateStatusesData } from '../features/firebase/data/statusesDataSlice.ts';
import { updateAlchemicalsData } from '../features/firebase/data/alchemicalsDataSlice.ts';
import { updateGadgetsData } from '../features/firebase/data/gadgetsDataSlice.ts';
import { updateWeaponSpecialisationsData }  from '../features/firebase/data/weaponSpecialisationsDataSlice.ts';
import { updateSourcesData } from '../features/firebase/data/sourcesDataSlice.ts';
import { updateRacialBonusesData } from '../features/firebase/data/racialBonusesDataSlice.ts';

import WritLayout from './layout/writLayout.tsx';
import Home from './home/home.tsx';
import { updateLanguagesData } from '../features/firebase/data/languagesDataSlice.ts';

export function App() {
	const authState = useAuthState();
	const dispatch = useDispatch();
	const database = getDatabase(firebaseApp);

	// Get public data
	useEffect(() => {
		async function collectData() {

			// Collect moves data
			const movesDataRef = await ref(database, '/moves_v2');
			onValue(movesDataRef, (snapshot) => {
				dispatch(updateMovesData(snapshot.val()));
			});

			// Collect spells data
			const spellsDataRef = await ref(database, '/spells');
			onValue(spellsDataRef, (snapshot) => {
				dispatch(updateSpellsData(snapshot.val()));
			});

			// Collect spells data
			const alchemicalsDataRef = await ref(database, '/alchemicals');
			onValue(alchemicalsDataRef, (snapshot) => {
				dispatch(updateAlchemicalsData(snapshot.val()));
			});

			// Collect statuses data
			const statusesDataRef = await ref(database, '/statuses');
			onValue(statusesDataRef, (snapshot) => {
				dispatch(updateStatusesData(snapshot.val()));
			});

			// Collect menagerie data
			const menagerieRef = ref(database, `/menagerie_v2`);
			onValue(menagerieRef, (snapshot) => {
				dispatch(updateMenagerieData(snapshot.val()));
			});

			// Collect companion moves data
			const companionMovesRef = ref(database, `/companionmoves`);
			onValue(companionMovesRef, (snapshot) => {
				dispatch(updateCompanionMovesData(snapshot.val()));
			});

			// Collect companion moves data
			const gadetsRef = ref(database, `/gadgets`);
			onValue(gadetsRef, (snapshot) => {
				dispatch(updateGadgetsData(snapshot.val()));
			});

			// Collect equipment data
			const equipmentRef = ref(database, '/equipment');
			onValue(equipmentRef, (snapshot) => {
				dispatch(updateEquipmentData(snapshot.val()));
			});

			// Collect Sources data
			const sourcesRef = ref(database, '/sources');
			onValue(sourcesRef, (snapshot) => {
				dispatch(updateSourcesData(snapshot.val()));
			});

			// Collect companion moves data
			const weaponSpecialisationsRef = ref(database, `/weapon_specialisations`);
			onValue(weaponSpecialisationsRef, (snapshot) => {
				dispatch(updateWeaponSpecialisationsData(snapshot.val()));
			});

			// Collect racial bonuses data
			const racialBonusesRef = ref(database, `/racial_bonuses`);
			onValue(racialBonusesRef, (snapshot) => {
				dispatch(updateRacialBonusesData(snapshot.val()));
			});

			// Collect languages data
			const languagesRef = ref(database, `/languages`);
			onValue(languagesRef, (snapshot) => {
				dispatch(updateLanguagesData(snapshot.val()));
			});
		}

		if (authState.authLevel >= 2) {

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
		}

		collectData();
	}, [authState, database, dispatch]);

	// Get user-specific data
	useEffect(() => {
		onAuthStateChanged(getAuth(firebaseApp),
			(user) => {
				if (user && user.uid) {
					const charactersRef = ref(database, `/characters_v2/${user.uid}`);
					onValue(charactersRef, (snapshot) => {
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
