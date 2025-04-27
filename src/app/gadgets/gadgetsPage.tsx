import { useMemo } from "react";
import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setGadgetsSearch } from '../../features/search/searchSlice';
import { UIColours } from "../../features/constants/UIColours";
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";
import ContentList from "../components/contentList/contentList";
import ContentCard from "../components/contentList/contentCard";
import { GadgetModel } from "../../features/models/gadgetModel";
import GadgetBlock from "../components/gadgets/gadgetBlock";

function GadgetsPage() {
	const dispatch = useAppDispatch();
	const gadgets = useAppSelector((state) => state.gadgets.gadgets);
	const gadgetsSearch = useAppSelector((state: RootState) => state.search.gadgetsSearch);
	/*const alchemyReagentsTypeSelector = useAppSelector((state: RootState) => state.search.alchemyReagentsTypeSelector);
	const reagentTypeOptions = ['Chemical', 'Flora', 'Fauna', 'Mineral'].map((recipeType) => { return { label: recipeType, value: recipeType } });
	const alchemyReagentsComponentSelector = useAppSelector((state: RootState) => state.search.alchemyReagentsComponentSelector);
	const reagentComponentsOptions = Object.keys(ReagentComponents).map((component, index) =>  { return { label: Object.values(ReagentComponents)[index], value: component } });*/

	const filteredGadgets = useMemo(() => {
		const gadgetsRefs = [...gadgets];
		const gadgetsSorted = gadgetsRefs.sort((a, b) => a.dc < b.dc && -1 || 1);
		const gadgetsSearched = gadgetsSearch.length && gadgetsSorted.filter((gadget) => (gadget.name.toString()+gadget.effect).toLowerCase().includes(gadgetsSearch.toLowerCase())) || gadgetsSorted;
		return gadgetsSearched;
	}, [gadgets, gadgetsSearch]);

	console.log(filteredGadgets);

	return (
		<>
			<ControlBar colour={UIColours.cobalt}>
				<SearchControl name="Search" initialValue={gadgetsSearch} onChange={(value: string) => dispatch(setGadgetsSearch(value))} />
				{/*<SelectorDropdown label="Type" initialValue={alchemyReagentsTypeSelector} options={reagentTypeOptions} onChange={(value) => dispatch(setAlchemyReagentsTypeSelector(value))} />
				<SelectorDropdown label="Contains" initialValue={alchemyReagentsComponentSelector} options={reagentComponentsOptions} onChange={(value) => dispatch(setAlchemyReagentsComponentSelector(value))} />*/}
			</ControlBar>
			<ContentList colour={UIColours.cobalt} style="grid">
				{filteredGadgets.map((gadget: GadgetModel) => (
					<ContentCard colour={UIColours.cobalt} key={gadget.id}>
						<GadgetBlock gadget={gadget}></GadgetBlock>
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default GadgetsPage;
