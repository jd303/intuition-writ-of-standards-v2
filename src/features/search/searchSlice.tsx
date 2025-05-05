import { createSlice } from '@reduxjs/toolkit';
import { SELECTOR_DEFAULT } from '../../app/components/controlBar/selectorDropdown';

interface SearchState {
	spellsSearch: string;
	spellLevelSelection: string;
	spellSchoolSelection: string;
	magicSourceSelection: string;
	magicPotionsSearch: string;
	enchantingSelection: string;
	psionicPowersSearch: string;
	psionicLevelSelection: string;
	psionicAptitudeSelection: string;
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
	dmMenagerieSearch: string;
	dmMenagerieTypeSelection: string;
	dmMenagerieDCSelection: string;
}

const initialState: SearchState = {
	spellsSearch: localStorage.getItem('spellsSearch') || '',
	spellLevelSelection: localStorage.getItem('spellLevelSelection') || SELECTOR_DEFAULT,
	spellSchoolSelection: localStorage.getItem('spellSchoolSelection') || SELECTOR_DEFAULT,
	magicSourceSelection: localStorage.getItem('magicSourceSelection') || SELECTOR_DEFAULT,
	magicPotionsSearch: localStorage.getItem('magicPotionsSearch') || '',
	enchantingSelection: localStorage.getItem('enchantingSelection') || SELECTOR_DEFAULT,
	psionicPowersSearch: localStorage.getItem('psionicPowersSearch') || '',
	psionicLevelSelection: localStorage.getItem('psionicLevelSelection') || SELECTOR_DEFAULT,
	psionicAptitudeSelection: localStorage.getItem('psionicAptitudeSelection') || SELECTOR_DEFAULT,
	movesSearch: localStorage.getItem('movesSearch') || '',
	statusesSearch: localStorage.getItem('statusesSearch') || '',
	statusesCategorySelection: localStorage.getItem('statusesCategorySelection') || SELECTOR_DEFAULT,
	alchemyRecipesSearch: localStorage.getItem('alchemyRecipesSearch') || '',
	alchemyRecipesTypeSelector: localStorage.getItem('alchemyRecipesTypeSelector') || SELECTOR_DEFAULT,
	alchemyReagentsSearch: localStorage.getItem('alchemyReagentsSearch') || '',
	alchemyReagentsTypeSelector: localStorage.getItem('alchemyReagentsTypeSelector') || SELECTOR_DEFAULT,
	alchemyReagentsComponentSelector: localStorage.getItem('alchemyReagentsComponentSelector') || SELECTOR_DEFAULT,
	gadgetsSearch: localStorage.getItem('gadgetsSearch') || '',
	companionsSearch: localStorage.getItem('companionsSearch') || '',
	companionMovesSearch: localStorage.getItem('companionMovesSearch') || '',
	equipmentSearch: localStorage.getItem('equipmentSearch') || '',
	characterSheetSearch: localStorage.getItem('characterSheetSearch') || '',
	dmMenagerieSearch: localStorage.getItem('dmMenagerieSearch') || '',
	dmMenagerieTypeSelection: localStorage.getItem('dmMenagerieTypeSelection') || SELECTOR_DEFAULT,
	dmMenagerieDCSelection: localStorage.getItem('dmMenagerieDCSelection') || SELECTOR_DEFAULT,
}

// Writes state to localStorage
let writeTimeout: NodeJS.Timeout | undefined;
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
		setPsionicPowersSearch: (state, action) => {
			state.psionicPowersSearch = action.payload;
			writeLocalStorageValue('psionicPowersSearch', action.payload);
		},
		setPsionicLevelSelection: (state, action) => {
			state.psionicLevelSelection = action.payload;
			writeLocalStorageValue('psionicLevelSelection', action.payload);
		},
		setPsionicAptitudeSelection: (state, action) => {
			state.psionicAptitudeSelection = action.payload;
			writeLocalStorageValue('psionicAptitudeSelection', action.payload);
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
		setDMMenagerieSearch: (state, action) => {
			state.dmMenagerieSearch = action.payload;
			writeLocalStorageValue('dmMenagerieSearch', action.payload);
		},
		setDMMenagerieTypeSelection: (state, action) => {
			state.dmMenagerieTypeSelection = action.payload;
			writeLocalStorageValue('dmMenagerieTypeSelection', action.payload);
		},
		setDMMenagerieDCSelection: (state, action) => {
			state.dmMenagerieDCSelection = action.payload;
			writeLocalStorageValue('dmMenagerieDCSelection', action.payload);
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
	setPsionicPowersSearch,
	setPsionicLevelSelection,
	setPsionicAptitudeSelection,
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
	setDMMenagerieSearch,
	setDMMenagerieTypeSelection,
	setDMMenagerieDCSelection } = searchSlice.actions;

export default searchSlice.reducer;