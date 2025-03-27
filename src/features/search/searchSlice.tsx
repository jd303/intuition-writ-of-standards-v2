import { createSlice } from '@reduxjs/toolkit';
import { SELECTOR_DEFAULT } from '../../app/components/controlBar/selectorDropdown';

interface SearchState {
	spellsSearch: string;
	spellLevelSelection: string;
	spellSchoolSelection: string;
	magicSourceSelection: string;
	magicPotionsSearch: string;
	movesSearch: string;
	statusesSearch: string;
	statusesCategorySelection: string;
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
	spellLevelSelection: localStorage.getItem('spellLevelSelection') || '',
	spellSchoolSelection: localStorage.getItem('spellSchoolSelection') || '',
	magicSourceSelection: localStorage.getItem('magicSourceSelection') || '',
	magicPotionsSearch: localStorage.getItem('magicPotionsSearch') || '',
	movesSearch: localStorage.getItem('movesSearch') || '',
	statusesSearch: localStorage.getItem('statusesSearch') || '',
	statusesCategorySelection: localStorage.getItem('statusesCategorySelection') || SELECTOR_DEFAULT,
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
		setSpellLevelSelection: (state, action) => {
			state.spellLevelSelection = action.payload;
			writeLocalStorageValue('spellLevelSelection', action.payload);
		},
		setSpellSchoolSelection: (state, action) => {
			state.spellSchoolSelection = action.payload;
			writeLocalStorageValue('spellSchoolSelection', action.payload);
		},
		setMagicSourceSelection: (state, action) => {
			state.magicSourceSelection = action.payload;
			writeLocalStorageValue('magicSourceSelection', action.payload);
		},
		setMagicPotionsSearch: (state, action) => {
			state.magicPotionsSearch = action.payload;
			writeLocalStorageValue('magicPotionsSearch', action.payload);
		},
		setMovesSearch: (state, action) => {
			state.movesSearch = action.payload;
			writeLocalStorageValue('movesSearch', action.payload);
		},
		setStatusesSearch: (state, action) => {
			state.statusesSearch = action.payload;
			writeLocalStorageValue('statusesSearch', action.payload);
		},
		setStatusesCategorySelection: (state, action) => {
			state.statusesCategorySelection = action.payload;
			writeLocalStorageValue('statusesCategorySelection', action.payload);
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

export const { setSpellsSearch, setSpellLevelSelection, setMagicSourceSelection, setSpellSchoolSelection, setMagicPotionsSearch, setMovesSearch, setStatusesSearch, setStatusesCategorySelection, setAlchemyRecipesSearch, setAlchemyReagentsSearch, setGadgetsSearch, setCompanionsSearch, setCompanionMovesSearch, setEquipmentSearch, setMenagerieSearch, setCombatSearch } = searchSlice.actions;

export default searchSlice.reducer;