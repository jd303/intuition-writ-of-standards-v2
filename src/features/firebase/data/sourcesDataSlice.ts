import { createSlice } from "@reduxjs/toolkit";
import { SourceModel } from "../../models/sourceModel";

interface SourcesData {
	sources: SourceModel[]
}

const initialState: SourcesData = {
	sources: []
}

export const sourcesDataSlice = createSlice({
	name: "sourcesData",
	initialState: initialState,
	reducers: {
		updateSourcesData: (state, data) => {
			state.sources = data.payload;
		}
	}
});

export const { updateSourcesData } = sourcesDataSlice.actions;

export default sourcesDataSlice.reducer;