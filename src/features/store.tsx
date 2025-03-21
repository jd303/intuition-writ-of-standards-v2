import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import searchReducer from '../features/search/searchSlice';
import charactersDataReducer from './firebase/data/charactersDataSlice';
import equipmentDataReducer from './firebase/data/equipmentDataSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
	search: searchReducer,
	charactersData: charactersDataReducer,
	equipmentData: equipmentDataReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;