import { useMemo } from "react";
import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setAlchemyRecipesSearch, setAlchemyRecipesTypeSelection } from '../../features/search/searchSlice';
import { UIColours } from "../../features/constants/UIColours";
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";
import ContentList from "../components/contentList/contentList";
import ContentCard from "../components/contentList/contentCard";
import SelectorDropdown, { SELECTOR_DEFAULT } from "../components/controlBar/selectorDropdown";
import { AlchemicalModel } from "../../features/models/alchemicalModel";
import AlchemicalBlock from "../components/alchemical/alchemicalBlock";

function AlchemyRecipesPage() {
	const dispatch = useAppDispatch();
	const recipes = useAppSelector((state) => state.alchemicals.recipes);
	const recipesSearch = useAppSelector((state: RootState) => state.search.alchemyRecipesSearch);
	const recipeTypeSelection = useAppSelector((state: RootState) => state.search.alchemyRecipesTypeSelector);
	const recipesTypeOptions = ['potion', 'bomb', 'poison', 'applicant', 'salve', 'misc'].map((recipeType) => { return { label: recipeType, value: recipeType } });
	
	const filteredRecipes = useMemo(() => {
		const recipeRefs = [...recipes];
		const recipesSorted = recipeRefs.sort((a, b) => a.name < b.name && -1 || 1);
		const receipesTypeSelected = recipeTypeSelection != SELECTOR_DEFAULT.toString() && recipesSorted.filter((recipe) => recipe.subtype.toLowerCase() == recipeTypeSelection) || recipesSorted;
		const recipesSearchFiltered = recipesSearch.length && receipesTypeSelected.filter((recipe) => (JSON.stringify(recipe)).toLowerCase().includes(recipesSearch.toLowerCase())) || receipesTypeSelected;
		return recipesSearchFiltered;
	}, [recipes, recipeTypeSelection, recipesSearch]);

	return (
		<>
			<ControlBar colour={UIColours.cyan}>
				<SearchControl name="Search" initialValue={recipesSearch} onChange={(value: string) => dispatch(setAlchemyRecipesSearch(value))} />
				<SelectorDropdown label="Type" initialValue={recipeTypeSelection} options={recipesTypeOptions} onChange={(value) => dispatch(setAlchemyRecipesTypeSelection(value))} />
			</ControlBar>
			<ContentList colour={UIColours.cyan} style="grid">
				{filteredRecipes.map((recipe: AlchemicalModel) => (
					<ContentCard colour={UIColours.cyan} key={recipe.id}>
						<AlchemicalBlock alchemical={recipe}></AlchemicalBlock>
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default AlchemyRecipesPage;
