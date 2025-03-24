import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import searchReducer from '../features/search/searchSlice';
import charactersDataReducer from './firebase/data/charactersDataSlice';
import movesDataReducer from './firebase/data/movesDataSlice';
import equipmentDataReducer from './firebase/data/equipmentDataSlice';
import menagerieDataReducer from './firebase/data/menagerieDataSlice';
import companionMovesDataReducer from './firebase/data/companionMovesDataSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
	search: searchReducer,
	charactersData: charactersDataReducer,
	movesData: movesDataReducer,
	equipmentData: equipmentDataReducer,
	menagerieData: menagerieDataReducer,
	companionMovesData: companionMovesDataReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;