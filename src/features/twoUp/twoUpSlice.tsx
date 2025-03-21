import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TwoUpState {
	twoUpEnabled: boolean;
}

export interface SetTwoUpStateAction{
	payload: {
		twoUpEnabled: boolean;
	}
}

const initialState: TwoUpState = {
	twoUpEnabled: false
}

const twoUpSlice = createSlice({
	name: 'twoUp',
	initialState: initialState,
	reducers: {
		setTwoUp: (state: TwoUpState, action: PayloadAction<boolean>) => {
			state.twoUpEnabled = action.payload;
		}
	}
});

export const { setTwoUp } = twoUpSlice.actions;

export default twoUpSlice.reducer;