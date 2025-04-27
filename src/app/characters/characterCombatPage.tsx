import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { JSX, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import st from './characterCombatPage.module.css';
import AbilityModal from '../components/abilityModal/abilityModal';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import { SectionBlock } from '../components/controlBar/sectionBlock';
import SectionNav from '../components/controlBar/sectionNav';
import { CharacterSheetContext } from './characterContext';
import { CharacterModel } from '../../features/models/character/characterModel';
import { SpellModel } from '../../features/models/spellModel';
import { PsionicPowerModel } from '../../features/models/psionicPowerModel';
import { UIColours } from '../../features/constants/UIColours';
import { useSectionNav } from '../components/controlBar/useSectionNav';
import ResourceComponent from './components/resourceComponent';
import { setCharacterSheetSearch } from '../../features/search/searchSlice';
import SkillBlock from '../components/moves/SkillBlock';
import { MoveDisplayMode } from '../../features/models/moveDisplayModes';
import { SynergyModel } from '../../features/models/synergyModel';

import icoWellness from '/images/icons/ico.wellness.svg';

function CharacterCombatPage() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	const charactersData = useAppSelector((state) => state.charactersData.characters);
	const characterSheetSearch = useAppSelector((state) => state.search.characterSheetSearch);
	const characterFromData = charactersData.find((character: CharacterModel) => character.id == params.id);
	const character = new CharacterModel(characterFromData!);

	// Default irrelevant context
	const purchaseMode = 'none';
	const setPurchaseMode = () => { };
	const characterPurchaseUpdater = () => {};
	const characterValueUpdater = () => {};
	const updateCharacterValue = () => {};
	const maxSkillPoints = 100;

	// Modal Controls
	const [abilityModalVisible, setAbilityModalVisible] = useState(false);
	const [abilityModalSource, setAbilityModalSource] = useState<SpellModel | PsionicPowerModel | SynergyModel>();

	// Skill Data to show
	const movesByCategory = useAppSelector((state) => state.movesData.moves);
	console.log(movesByCategory);
	const skillBlocks = useMemo(() => {
		const alwaysIncludedSkills = ['combat', 'defences', 'resist_mental', 'resist_physical', 'athletics', 'perception', 'preparedness', 'knowledge'];
		const elements: JSX.Element[] = [];
		Object.keys(movesByCategory).map((skillKey: string) => {
			const skillId = movesByCategory[skillKey].skill!.id;
			const passiveIds = movesByCategory[skillKey].passives!.map((passive) => passive.id);
			const expertiseIds: string[] = [];
			movesByCategory[skillKey].moves!.forEach((move) => move.expertises?.forEach((expertise) => expertiseIds.push(expertise.id)));
			console.log(skillKey, skillId, passiveIds, expertiseIds);

			if (alwaysIncludedSkills.includes(movesByCategory[skillKey].category)) {
				elements.push(<SkillBlock skillCategory={movesByCategory[skillKey]} mode={MoveDisplayMode.display} />);
			} else {
				elements.push(<SkillBlock skillCategory={movesByCategory[skillKey]} mode={MoveDisplayMode.display} />);
			}
		});
		console.log("EL", elements);
		return <>{elements}</>
	}, [movesByCategory]);

	// Switches to character view
	const characterView = () => {
		navigate(`/characters/${params.id}`);
	}

	return (
		<CharacterSheetContext.Provider value={{ character, purchaseMode, setPurchaseMode, characterPurchaseUpdater, characterValueUpdater, characterSheetSearch, maxSkillPoints, updateCharacterValue, setAbilityModalVisible, setAbilityModalSource }}>
			<AbilityModal ability={abilityModalSource} visible={abilityModalVisible} onClose={() => setAbilityModalVisible(false)} />
			<div className={st.characterCombatPageContainer} data-searching={characterSheetSearch != ''}>
				<ControlBar colour={UIColours.cobalt}>
					<SectionNav sections={sectionDefinitions} label={"Go"} />
					<SearchControl name={"Search"} initialValue={characterSheetSearch} onChange={(value: string) => dispatch(setCharacterSheetSearch(value))} />
					<button onClick={characterView}>Character</button>
				</ControlBar>
				<div className={st.sections}>
					<SectionBlock name={character.vitae.name} icon={icoWellness} innerClassName={st.sectionVitae} sectionRefs={sectionRefs}>
						<div className={st.block}><ResourceComponent type="verve" mode={MoveDisplayMode.display} /></div>
						<div className={st.block}><ResourceComponent type="mana" mode={MoveDisplayMode.display} /></div>
						<div className={st.block}><ResourceComponent type="psi" mode={MoveDisplayMode.display} /></div>
					</SectionBlock>
					<SectionBlock name="Skills" icon={icoWellness} innerClassName={st.sectionVitae} sectionRefs={sectionRefs}>
						{skillBlocks}
					</SectionBlock>
				</div>
			</div>
		</CharacterSheetContext.Provider>
	)
}

export default CharacterCombatPage;
