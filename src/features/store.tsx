import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import searchReducer from '../features/search/searchSlice';
import charactersDataReducer from './firebase/data/charactersDataSlice';
import movesDataReducer from './firebase/data/movesDataSlice';
import statusesDataReducer from './firebase/data/statusesDataSlice';
import equipmentDataReducer from './firebase/data/equipmentDataSlice';
import menagerieDataReducer from './firebase/data/menagerieDataSlice';
import companionMovesDataReducer from './firebase/data/companionMovesDataSlice';
import magicSpellsDataReducer from './firebase/data/spellsDataSlice';
import alchemicalsDataReducer from './firebase/data/alchemicalsDataSlice';
import gadgetsDataReducer from './firebase/data/gadgetsDataSlice';
import weaponSpecialisationsReducer from './firebase/data/weaponSpecialisationsDataSlice';
import sourcesReducer from './firebase/data/sourcesDataSlice';
import racialBonusesReducer from './firebase/data/racialBonusesDataSlice';
import languagesReducer from './firebase/data/languagesDataSlice';
import synergies from './firebase/data/synergiesDataSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
	search: searchReducer,
	charactersData: charactersDataReducer,
	movesData: movesDataReducer,
	statusesData: statusesDataReducer,
	equipmentData: equipmentDataReducer,
	menagerieData: menagerieDataReducer,
	companionMovesData: companionMovesDataReducer,
	magicSpells: magicSpellsDataReducer,
	alchemicals: alchemicalsDataReducer,
	gadgets: gadgetsDataReducer,
	weaponSpecialisations: weaponSpecialisationsReducer,
	sources: sourcesReducer,
	synergies: synergies,
	racialBonuses: racialBonusesReducer,
	languages: languagesReducer
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;