import { createSlice } from '@reduxjs/toolkit';

interface UIState {
	title: string;
	subtitle: string;
	path: string;
	colour: string;
	section: string,
	menuOpen: boolean;
	isLoggedIn: boolean;
}

const initialState: UIState = {
	title: '',
	subtitle: '',
	path: '',
	section: '',
	colour: 'silver',
	menuOpen: false,
	isLoggedIn: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setSubtitle: (state, action) => {
			state.subtitle = action.payload;
		},
		setSection: (state, action) => {
			state.section = action.payload;
		},
		setColour: (state, action) => {
			state.colour = action.payload;
		},
		setMenu: (state, action) => {
			state.menuOpen = action.payload;
		}
	},
});

export const { setTitle, setSubtitle, setSection, setColour, setMenu } = uiSlice.actions;

export default uiSlice.reducer;