import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
	spellsSearch: string;
	movesSearch: string;
	alchemyRecipesSearch: string;
	alchemyReagentsSearch: string;
	gadgetsSearch: string;
	companionsSearch: string;
	companionMovesSearch: string;
	equipmentSearch: string;
	menagerieSearch: string;
	combatSearch: string;
}

const initialState: SearchState = {
	spellsSearch: localStorage.getItem('spellsSearch') || '',
	movesSearch: localStorage.getItem('movesSearch') || '',
	alchemyRecipesSearch: localStorage.getItem('alchemyRecipesSearch') || '',
	alchemyReagentsSearch: localStorage.getItem('alchemyReagentsSearch') || '',
	gadgetsSearch: localStorage.getItem('gadgetsSearch') || '',
	companionsSearch: localStorage.getItem('companionsSearch') || '',
	companionMovesSearch: localStorage.getItem('companionMovesSearch') || '',
	equipmentSearch: localStorage.getItem('equipmentSearch') || '',
	menagerieSearch: localStorage.getItem('menagerieSearch') || '',
	combatSearch: localStorage.getItem('combatSearch') || ''
}

// Writes state to localStorage
let writeTimeout: number | undefined;
const writeLocalStorageValue = (key: string, value: string) => {
	clearTimeout(writeTimeout);
	writeTimeout = setTimeout(() => {
		localStorage.setItem(key, value);
	}, 500);
}

const searchSlice = createSlice({
	name: 'search',
	initialState: initialState,
	reducers: {
		setSpellsSearch: (state, action) => {
			state.spellsSearch = action.payload;
			writeLocalStorageValue('spellsSearch', action.payload);
		},
		setMovesSearch: (state, action) => {
			state.movesSearch = action.payload;
			writeLocalStorageValue('movesSearch', action.payload);
		},
		setAlchemyRecipesSearch: (state, action) => {
			state.alchemyRecipesSearch = action.payload;
			writeLocalStorageValue('alchemyRecipesSearch', action.payload);
		},
		setAlchemyReagentsSearch: (state, action) => {
			state.alchemyReagentsSearch = action.payload;
			writeLocalStorageValue('alchemyReagentsSearch', action.payload);
		},
		setGadgetsSearch: (state, action) => {
			state.gadgetsSearch = action.payload;
			writeLocalStorageValue('gadgetsSearch', action.payload);
		},
		setCompanionsSearch: (state, action) => {
			state.companionsSearch = action.payload;
			writeLocalStorageValue('companionsSearch', action.payload);
		},
		setCompanionMovesSearch: (state, action) => {
			state.companionMovesSearch = action.payload;
			writeLocalStorageValue('companionMovesSearch', action.payload);
		},
		setEquipmentSearch: (state, action) => {
			state.equipmentSearch = action.payload;
			writeLocalStorageValue('equipmentSearch', action.payload);
		},
		setMenagerieSearch: (state, action) => {
			state.menagerieSearch = action.payload;
			writeLocalStorageValue('menagerieSearch', action.payload);
		},
		setCombatSearch: (state, action) => {
			state.combatSearch = action.payload;
			writeLocalStorageValue('combatSearch', action.payload);
		},
	}
});

export const { setSpellsSearch, setMovesSearch, setAlchemyRecipesSearch, setAlchemyReagentsSearch, setGadgetsSearch, setCompanionsSearch, setCompanionMovesSearch, setEquipmentSearch, setMenagerieSearch, setCombatSearch } = searchSlice.actions;

export default searchSlice.reducer;