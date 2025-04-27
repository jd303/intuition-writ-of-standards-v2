import { useMemo } from "react";
import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setAlchemyReagentsComponentSelector, setAlchemyReagentsSearch, setAlchemyReagentsTypeSelector } from '../../features/search/searchSlice';
import { UIColours } from "../../features/constants/UIColours";
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";
import ContentList from "../components/contentList/contentList";
import ContentCard from "../components/contentList/contentCard";
import { AlchemicalModel, ReagentComponents } from "../../features/models/alchemicalModel";
import AlchemicalBlock from "../components/alchemical/alchemicalBlock";
import SelectorDropdown, { SELECTOR_DEFAULT } from "../components/controlBar/selectorDropdown";

import bronzeMedal from "/images/icons/ico.medal.bronze.svg";
import silverMedal from "/images/icons/ico.medal.silver.svg";
import goldMedal from "/images/icons/ico.medal.gold.svg";
import abstrateGoldMedal from "/images/icons/ico.medal.abstrategold.svg";
import st from './alchemyReagentsPage.module.css';

function AlchemyReagentsPage() {
	const dispatch = useAppDispatch();
	const reagents = useAppSelector((state) => state.alchemicals.reagents);
	const reagentsSearch = useAppSelector((state: RootState) => state.search.alchemyReagentsSearch);
	const alchemyReagentsTypeSelector = useAppSelector((state: RootState) => state.search.alchemyReagentsTypeSelector);
	const reagentTypeOptions = ['Chemical', 'Flora', 'Fauna', 'Mineral'].map((recipeType) => { return { label: recipeType, value: recipeType } });
	const alchemyReagentsComponentSelector = useAppSelector((state: RootState) => state.search.alchemyReagentsComponentSelector);
	const reagentComponentsOptions = Object.keys(ReagentComponents).map((component, index) =>  { return { label: Object.values(ReagentComponents)[index], value: component } });

	const filteredreagents = useMemo(() => {
		const recipeRefs = [...reagents];
		const reagentsSorted = recipeRefs.sort((a, b) => a.name < b.name && -1 || 1);
		const reagentsSearchFiltered = reagentsSearch.length && reagentsSorted.filter((reagent) => (reagent.name + reagent.effects + reagent.desc).toLowerCase().includes(reagentsSearch.toLowerCase())) || reagentsSorted;
		const alchemyReagentsTypeSelected = alchemyReagentsTypeSelector != SELECTOR_DEFAULT && reagentsSearchFiltered.filter((reagent) => reagent.subtype == alchemyReagentsTypeSelector) || reagentsSearchFiltered;
		const alchemyReagentsComponentSelected = alchemyReagentsComponentSelector != SELECTOR_DEFAULT && alchemyReagentsTypeSelected.filter((reagent) => reagent.reagents.toLowerCase().includes(alchemyReagentsComponentSelector.toLowerCase())) || alchemyReagentsTypeSelected;
		return alchemyReagentsComponentSelected;
	}, [reagents, reagentsSearch, alchemyReagentsTypeSelector, alchemyReagentsComponentSelector]);

	return (
		<>
			<section className={st.intro}>
				Reagents come in 4 rarities: <img src={bronzeMedal} alt="Common" /> Common, <img src={silverMedal} alt="Uncommon" /> Uncommon, <img src={goldMedal} alt="Rare" /> Rare, <img src={abstrateGoldMedal} alt="Legendary" /> Legendary.
			</section>
			<ControlBar colour={UIColours.cyan}>
				<SearchControl name="Search" initialValue={reagentsSearch} onChange={(value: string) => dispatch(setAlchemyReagentsSearch(value))} />
				<SelectorDropdown label="Type" initialValue={alchemyReagentsTypeSelector} options={reagentTypeOptions} onChange={(value) => dispatch(setAlchemyReagentsTypeSelector(value))} />
				<SelectorDropdown label="Contains" initialValue={alchemyReagentsComponentSelector} options={reagentComponentsOptions} onChange={(value) => dispatch(setAlchemyReagentsComponentSelector(value))} />
			</ControlBar>
			<ContentList colour={UIColours.cyan} style="grid">
				{filteredreagents.map((recipe: AlchemicalModel) => (
					<ContentCard colour={UIColours.cyan} key={recipe.id}>
						<AlchemicalBlock alchemical={recipe} isReagent={true}></AlchemicalBlock>
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default AlchemyReagentsPage;
