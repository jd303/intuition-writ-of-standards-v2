import { useMemo } from "react";
import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setEnchantingSelection, setMagicSourceSelection, setSpellLevelSelection, setSpellSchoolSelection, setSpellsSearch } from '../../features/search/searchSlice';
import { UIColours } from "../../features/constants/UIColours";
import { SpellModel } from "../../features/models/spellModel";
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";
import SpellBlock from "../components/spell/spellBlock";
import ContentList from "../components/contentList/contentList";
import ContentCard from "../components/contentList/contentCard";
import SelectorDropdown, { SELECTOR_DEFAULT } from "../components/controlBar/selectorDropdown";
import { MagicSources, SpellSchools } from "../../features/constants/MagicSources";

function MagicSpellsPage() {
	const dispatch = useAppDispatch();
	const spells = useAppSelector((state) => state.magicSpells.spells);
	const spellsSearch = useAppSelector((state: RootState) => state.search.spellsSearch);
	const spellLevelSelection = useAppSelector((state: RootState) => state.search.spellLevelSelection);
	const spellSchoolSelection = useAppSelector((state: RootState) => state.search.spellSchoolSelection);
	const magicSourceSelection = useAppSelector((state: RootState) => state.search.magicSourceSelection);
	const enchantingSelection = useAppSelector((state: RootState) => state.search.enchantingSelection);
	const levelOptions = [1,2,3,4,5,6,7].map((i: number) => { return { label: i.toString(), value: i.toString() } });
	const sourceOptions = MagicSources.map((source) => { return { label: source.name.toString(), value: source.id.toString() } });
	const schoolOptions = SpellSchools.map((school) => { return { label: school, value: school } });
	const enchantingOptions = ['potable', 'infusable'].map((enchantmentType) => { return { label: enchantmentType, value: enchantmentType } });
	
	const filteredSpells = useMemo(() => {
		const spellsRefs = [...spells];
		const spellsSorted = spellsRefs.sort((a, b) => a.name < b.name && -1 || 1);
		const spellsSearchFiltered = spellsSorted.filter((spell: SpellModel) => (spell.name + spell.easyname + spell.cantrip + spell.standard + spell.empowered).toLowerCase().includes(spellsSearch.toLowerCase()));
		const spellsLevelFiltered = spellLevelSelection !== SELECTOR_DEFAULT && spellsSearchFiltered.filter((spell) => spell.level == parseInt(spellLevelSelection)) || spellsSearchFiltered;
		const spellsSourceFiltered = magicSourceSelection !== SELECTOR_DEFAULT && spellsLevelFiltered.filter((spell) => spell.sources.includes(magicSourceSelection)) || spellsLevelFiltered;
		const spellsSchoolFiltered = spellSchoolSelection !== SELECTOR_DEFAULT && spellsSourceFiltered.filter((spell) => spell.school == spellSchoolSelection) || spellsSourceFiltered;
		const spellsEnchantabilityFiltered = enchantingSelection !== SELECTOR_DEFAULT && spellsSchoolFiltered.filter((spell) => (enchantingSelection == "potable" && spell.potable || enchantingSelection == "infusable" && spell.infusable)) || spellsSchoolFiltered;
		return spellsEnchantabilityFiltered;
	}, [spells, spellsSearch, spellLevelSelection, magicSourceSelection, spellSchoolSelection, enchantingSelection]);

	return (
		<>
			<ControlBar colour={UIColours.purple}>
				<SearchControl name="Search" initialValue={spellsSearch} onChange={(value: string) => dispatch(setSpellsSearch(value))} />
				<SelectorDropdown label="Level" initialValue={spellLevelSelection} options={levelOptions} onChange={(value) => dispatch(setSpellLevelSelection(value))} />
				<SelectorDropdown label="Source" initialValue={magicSourceSelection} options={sourceOptions} onChange={(value) => dispatch(setMagicSourceSelection(value))} />
				<SelectorDropdown label="School" initialValue={spellSchoolSelection} options={schoolOptions} onChange={(value) => dispatch(setSpellSchoolSelection(value))} />
				<SelectorDropdown label="Enchantability" initialValue={enchantingSelection} options={enchantingOptions} onChange={(value) => dispatch(setEnchantingSelection(value))} />
			</ControlBar>
			<ContentList colour={UIColours.purple} style="grid">
				{filteredSpells.map((spell: SpellModel) => (
					<ContentCard colour={UIColours.purple} key={spell.id}>
						<SpellBlock key={spell.name} spell={spell} />
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default MagicSpellsPage;
