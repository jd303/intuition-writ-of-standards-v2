import st from './dmtools.module.css';
import stcl from '../components/contentList/contentList.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { useMemo } from 'react';
import { MenagerieSpecimen } from '../../features/models/menagerieSpecimenModel';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import { UIColours } from '../../features/constants/UIColours';
import { setDMMenagerieDCSelection, setDMMenagerieSearch, setDMMenagerieTypeSelection } from '../../features/search/searchSlice';
import ContentCard from '../components/contentList/contentCard';
import MenagerieSpecimenBlock from '../components/beast/menagerieSpecimenBlock';
import { useToggleableBooleanState } from '../../features/uiHooks';
import ToggleButton from '../components/controlBar/toggleButton';
import { MenagerieTypes } from '../../features/constants/MenagerieTypes';
import SelectorDropdown, { SELECTOR_DEFAULT } from '../components/controlBar/selectorDropdown';
import { writeCombatData } from '../../features/firebase/data/writeCombatData';
import { useNavigate } from 'react-router';

export default function DMMenageriePage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [minimalMode, toggleMinimalMode] = useToggleableBooleanState(true);
	const dmMenagerieSearch = useAppSelector((state) => state.search.dmMenagerieSearch);
	const menagerie = useAppSelector<MenagerieSpecimen[]>((state) => state.menagerieData.menagerie);
	const dmMenagerieTypeSelection = useAppSelector((state) => state.search.dmMenagerieTypeSelection);
	const typeOptions = MenagerieTypes.map((type) => { return { label: type, value: type } });
	const dmMenagerieDCSelection = useAppSelector((state) => state.search.dmMenagerieDCSelection);
	const dcOptions = Array.from(Array(6)).map((_, index) => { return { label: (index + 1).toString(), value: (index + 1).toString() } });

	// Filter based on user input
	const filteredMenagerie = useMemo(() => {
		const menagerieRefs = [...menagerie];
		const menagerieSearchFiltered = dmMenagerieSearch.length && menagerieRefs.filter((recipe) => (JSON.stringify(recipe)).toLowerCase().includes(dmMenagerieSearch.toLowerCase())) || menagerieRefs;
		const menagerieTypeFiltered = dmMenagerieTypeSelection !== SELECTOR_DEFAULT && menagerieSearchFiltered.filter((specimen) => specimen.type.toLowerCase() == dmMenagerieTypeSelection) || menagerieSearchFiltered;
		const menagerieDCFiltered = dmMenagerieDCSelection !== SELECTOR_DEFAULT && menagerieTypeFiltered.filter((specimen) => specimen.dc.toString() == dmMenagerieDCSelection) || menagerieTypeFiltered;
		return menagerieDCFiltered;
	}, [menagerie, dmMenagerieSearch, dmMenagerieTypeSelection, dmMenagerieDCSelection]);

	// Combats data
	const combatData = useAppSelector((state) => state.combatData.combat);

	// Add to combat
	const addToCombat = (id: string) => {
		const newCombatData = combatData && JSON.parse(JSON.stringify(combatData)) || { creatures: [] };
		const specimen = menagerie.find(specimen => specimen.id == id);
		newCombatData.creatures.push({
			id: id,
			combatId: uuidv4(),
			specimenDC: specimen?.dc || 0,
			base: '',
			notes: '',
			statuses: [],
			turnTaken: false,
			current_verve: specimen?.verve || 0,
		});
		writeCombatData(newCombatData);
	}

	// Navigation functions
	const combatView = () => {
		navigate(`/combat`);
	}

	return (
		<ContentList colour={UIColours.grey} style="menagerie_grid" className={st.menageriePageLayout}>
			<ControlBar colour={UIColours.grey}>
				<SearchControl name="Search" initialValue={dmMenagerieSearch} onChange={(value: string) => dispatch(setDMMenagerieSearch(value))} />
				<SelectorDropdown label="Type" options={typeOptions} initialValue={dmMenagerieTypeSelection} onChange={(value) => dispatch(setDMMenagerieTypeSelection(value))} />
				<SelectorDropdown label="DC" options={dcOptions} initialValue={dmMenagerieDCSelection} onChange={(value) => dispatch(setDMMenagerieDCSelection(value))} />
				<ToggleButton on={minimalMode} toggle={toggleMinimalMode} label="Minimal" />
				<button onClick={combatView}>Combat</button>
			</ControlBar>
			{filteredMenagerie.map((specimen: MenagerieSpecimen) => (
				<ContentCard colour={UIColours.green} key={`companion-${specimen.id}`} className={stcl.contentListParent}>
					<div className={[st.menagerieList, stcl.removeParentWhenEmpty].join(' ')}>
						<MenagerieSpecimenBlock specimen={specimen} viewMode={minimalMode && "min" || "max"} viewContext="menagerie" combatAddCallback={addToCombat} />
					</div>
				</ContentCard>
			))}
		</ContentList>
	);
}