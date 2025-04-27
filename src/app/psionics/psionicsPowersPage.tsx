import { useMemo } from "react";
import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setPsionicAptitudeSelection, setPsionicLevelSelection, setPsionicPowersSearch } from '../../features/search/searchSlice';
import { UIColours } from "../../features/constants/UIColours";
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";
import ContentList from "../components/contentList/contentList";
import ContentCard from "../components/contentList/contentCard";
import SelectorDropdown, { SELECTOR_DEFAULT } from "../components/controlBar/selectorDropdown";
import { PsionicPowerModel } from "../../features/models/psionicPowerModel";
import { PsionicAptitudes } from "../../features/constants/PsionicAptitudes";
import PsionicPowerBlock from "../components/power/psionicPowerBlock";

function PsionicPowersPage() {
	const dispatch = useAppDispatch();
	const powers = useAppSelector((state) => state.psionicPowers.powers);
	const powersSearch = useAppSelector((state: RootState) => state.search.psionicPowersSearch);
	const powersLevelSelection = useAppSelector((state: RootState) => state.search.psionicLevelSelection);
	const powerAptitudeSelection = useAppSelector((state: RootState) => state.search.psionicAptitudeSelection);
	const levelOptions = [1,2,3,4,5].map((i: number) => { return { label: i.toString(), value: i.toString() } });
	const aptitudeOptions = PsionicAptitudes.map((apt) => { return { label: apt, value: apt } });
	
	const filteredSpells = useMemo(() => {
		console.log(powerAptitudeSelection, powers)
		const powersRefs = [...powers];
		const powersSorted = powersRefs.sort((a, b) => a.level < b.level && -1 || 1);
		const powersSearchFiltered = powersSorted.filter((power: PsionicPowerModel) => JSON.stringify(power).toLowerCase().includes(powersSearch.toLowerCase()));
		const powersLevelFiltered = powersLevelSelection !== SELECTOR_DEFAULT && powersSearchFiltered.filter((power) => power.level == parseInt(powersLevelSelection)) || powersSearchFiltered;
		const spellsAptitudeFiltered = powerAptitudeSelection !== SELECTOR_DEFAULT && powersLevelFiltered.filter((power) => power.aptitude == powerAptitudeSelection) || powersLevelFiltered;
		return spellsAptitudeFiltered;
	}, [powers, powersSearch, powersLevelSelection, powerAptitudeSelection]);

	return (
		<>
			<ControlBar colour={UIColours.scarlet}>
				<SearchControl name="Search" initialValue={powersSearch} onChange={(value: string) => dispatch(setPsionicPowersSearch(value))} />
				<SelectorDropdown label="Level" initialValue={powersLevelSelection} options={levelOptions} onChange={(value) => dispatch(setPsionicLevelSelection(value))} />
				<SelectorDropdown label="Aptitude" initialValue={powerAptitudeSelection} options={aptitudeOptions} onChange={(value) => dispatch(setPsionicAptitudeSelection(value))} />
			</ControlBar>
			<ContentList colour={UIColours.scarlet} style="grid">
				{filteredSpells.map((power: PsionicPowerModel) => (
					<ContentCard colour={UIColours.scarlet} key={power.id}>
						<PsionicPowerBlock power={power} key={power.name} />
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default PsionicPowersPage;
