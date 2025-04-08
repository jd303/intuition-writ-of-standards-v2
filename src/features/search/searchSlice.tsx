import { createSlice } from '@reduxjs/toolkit';
import { SELECTOR_DEFAULT } from '../../app/components/controlBar/selectorDropdown';

interface SearchState {
	spellsSearch: string;
	spellLevelSelection: string;
	spellSchoolSelection: string;
	magicSourceSelection: string;
	magicPotionsSearch: string;
	enchantingSelection: string;
	movesSearch: string;
	statusesSearch: string;
	statusesCategorySelection: string;
	alchemyRecipesSearch: string;
	alchemyRecipesTypeSelector: string;
	alchemyReagentsSearch: string;
	alchemyReagentsTypeSelector: string;
	alchemyReagentsComponentSelector: string;
	gadgetsSearch: string;
	companionsSearch: string;
	companionMovesSearch: string;
	equipmentSearch: string;
	characterSheetSearch: string;
	menagerieSearch: string;
	combatSearch: string;
}

const initialState: SearchState = {
	spellsSearch: localStorage.getItem('spellsSearch') || '',
	spellLevelSelection: localStorage.getItem('spellLevelSelection') || '',
	spellSchoolSelection: localStorage.getItem('spellSchoolSelection') || '',
	magicSourceSelection: localStorage.getItem('magicSourceSelection') || '',
	magicPotionsSearch: localStorage.getItem('magicPotionsSearch') || '',
	enchantingSelection: localStorage.getItem('enchantingSelection') || '',
	movesSearch: localStorage.getItem('movesSearch') || '',
	statusesSearch: localStorage.getItem('statusesSearch') || '',
	statusesCategorySelection: localStorage.getItem('statusesCategorySelection') || SELECTOR_DEFAULT,
	alchemyRecipesSearch: localStorage.getItem('alchemyRecipesSearch') || '',
	alchemyRecipesTypeSelector: localStorage.getItem('alchemyRecipesTypeSelector') || '',
	alchemyReagentsSearch: localStorage.getItem('alchemyReagentsSearch') || '',
	alchemyReagentsTypeSelector: localStorage.getItem('alchemyReagentsTypeSelector') || '',
	alchemyReagentsComponentSelector: localStorage.getItem('alchemyReagentsComponentSelector') || '',
	gadgetsSearch: localStorage.getItem('gadgetsSearch') || '',
	companionsSearch: localStorage.getItem('companionsSearch') || '',
	companionMovesSearch: localStorage.getItem('companionMovesSearch') || '',
	equipmentSearch: localStorage.getItem('equipmentSearch') || '',
	characterSheetSearch: localStorage.getItem('characterSheetSearch') || '',
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
		setEnchantingSelection: (state, action) => {
			state.enchantingSelection = action.payload;
			writeLocalStorageValue('enchantingSelection', action.payload);
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
		setAlchemyRecipesTypeSelection: (state, action) => {
			state.alchemyRecipesTypeSelector = action.payload;
			writeLocalStorageValue('alchemyRecipesTypeSelector', action.payload);
		},
		setAlchemyReagentsSearch: (state, action) => {
			state.alchemyReagentsSearch = action.payload;
			writeLocalStorageValue('alchemyReagentsSearch', action.payload);
		},
		setAlchemyReagentsTypeSelector: (state, action) => {
			state.alchemyReagentsTypeSelector = action.payload;
			writeLocalStorageValue('alchemyReagentsTypeSelector', action.payload);
		},
		setAlchemyReagentsComponentSelector: (state, action) => {
			state.alchemyReagentsComponentSelector = action.payload;
			writeLocalStorageValue('alchemyReagentsComponentSelector', action.payload);
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
		setCharacterSheetSearch: (state, action) => {
			state.characterSheetSearch = action.payload;
			writeLocalStorageValue('characterSheetSearch', action.payload);
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

export const {
	setSpellsSearch,
	setSpellLevelSelection,
	setMagicSourceSelection,
	setSpellSchoolSelection,
	setMagicPotionsSearch,
	setEnchantingSelection,
	setMovesSearch,
	setStatusesSearch,
	setStatusesCategorySelection,
	setAlchemyRecipesSearch,
	setAlchemyRecipesTypeSelection,
	setAlchemyReagentsSearch,
	setAlchemyReagentsTypeSelector,
	setAlchemyReagentsComponentSelector,
	setGadgetsSearch,
	setCompanionsSearch,
	setCompanionMovesSearch,
	setEquipmentSearch,
	setCharacterSheetSearch,
	setMenagerieSearch,
	setCombatSearch } = searchSlice.actions;

export default searchSlice.reducer;