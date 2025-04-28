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
import SheetBlock from './characterSheetBlockComponent';
import Armours from './components/armoursComponent';
import Weapons from './components/weaponsComponent';
import ItemBelt from './components/itemBeltComponent';
import ResistancesList from './components/resistancesListComponent';
import Statuses from './components/statusesComponent';
import SpellList from './components/spellList';
import PsionicPowersViewer from './components/psionicPowersViewer';

import icoWellness from '/images/icons/ico.wellness.svg';
import icoCombat from '/images/icons/ico.combat.svg';
import icoMagic from '/images/icons/ico.magic.svg';

function CharacterCombatPage() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	const charactersData = useAppSelector((state) => state.charactersData.characters);
	const characterSheetSearch = useAppSelector((state) => state.search.characterSheetSearch);
	const characterFromData = charactersData.find((character: CharacterModel) => character.id == params.id);
	const character = useMemo(() => new CharacterModel(characterFromData!), [characterFromData]);

	// Default irrelevant context
	const purchaseMode = 'none';
	const setPurchaseMode = () => { };
	const characterPurchaseUpdater = () => { };
	const characterValueUpdater = () => { };
	const updateCharacterValue = () => { };
	const maxSkillPoints = 100;

	// Modal Controls
	const [abilityModalVisible, setAbilityModalVisible] = useState(false);
	const [abilityModalSource, setAbilityModalSource] = useState<SpellModel | PsionicPowerModel | SynergyModel>();

	// Skill Data to show
	const movesByCategory = useAppSelector((state) => state.movesData.moves);
	const skillBlocks = useMemo(() => {
		const elements: JSX.Element[] = [];
		Object.keys(movesByCategory).map((skillKey: string, index: number) => {
			const hasPurchases = (Object.keys(character.purchases.skills_and_expertises).some(item => movesByCategory[skillKey].purchaseIds.includes(item)));
			if (!movesByCategory[skillKey].skill?.trained || hasPurchases) {
				elements.push(<SkillBlock skillCategory={movesByCategory[skillKey]} mode={MoveDisplayMode.combat} key={`skill-${index}`} />);
			}
		});

		return <>{elements}</>
	}, [movesByCategory, character]);

	// Determine if the user has magic / psionics
	const spellcraftId = '797d1feb';
	const kineticsId = '3f0b799e';
	const clairSentienceId = '55833ba0';
	const telepathyId = '38f4ea1a';
	const metabolismId = '5eefe62e';
	const hasSpellsOrPowers = useMemo(() => {
		const hasSpells = character.spells.length && character.purchases.skills_and_expertises[spellcraftId] > 0;
		const hasPowers = Object.keys(character.purchases.skills_and_expertises).some(item => [kineticsId, clairSentienceId, telepathyId, metabolismId].includes(item));
		if (hasSpells || hasPowers) {
			return { hasSpells: hasSpells, hasPowers: hasPowers };
		} else return false;
	}, [character]);

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
					<SectionBlock name={character.vitae.name} icon={icoWellness} innerClassName={`${st.sectionVitae} ${st.grid}`} sectionRefs={sectionRefs}>
						<SheetBlock><ResourceComponent type="verve" mode={MoveDisplayMode.display} /></SheetBlock>
						<SheetBlock><ItemBelt /></SheetBlock>
						{character.purchases.mana > 0 && <SheetBlock><ResourceComponent type="mana" mode={MoveDisplayMode.display} /></SheetBlock>}
						{character.purchases.psi > 0 && <SheetBlock><ResourceComponent type="psi" mode={MoveDisplayMode.display} /></SheetBlock>}
						<SheetBlock><ResistancesList /></SheetBlock>
						<SheetBlock><Statuses /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Combat" icon={icoCombat} innerClassName={`${st.sectionCombat} ${st.grid}`} sectionRefs={sectionRefs}>
						<SheetBlock><Weapons mode={MoveDisplayMode.display} /></SheetBlock>
						<SheetBlock><Armours mode={MoveDisplayMode.display} /></SheetBlock>
					</SectionBlock>
					{hasSpellsOrPowers && <SectionBlock name="Spells & Powers" icon={icoMagic} innerClassName={`${st.sectionSpellsAndPowers} ${st.flex} ${st.flexColumn}`} sectionRefs={sectionRefs}>
						{hasSpellsOrPowers.hasSpells && <SheetBlock><SpellList mode={MoveDisplayMode.combat} /></SheetBlock> || <></>}
						{hasSpellsOrPowers.hasPowers && <SheetBlock layout="flex-column"><PsionicPowersViewer /></SheetBlock> || <></>}
					</SectionBlock>}
					<SectionBlock name="Skills" icon={icoWellness} innerClassName={st.sectionSkills} sectionRefs={sectionRefs}>
						<SheetBlock className={`${st.skillsList} ${st.grid}`}>{skillBlocks}</SheetBlock>
					</SectionBlock>
				</div>
			</div>
		</CharacterSheetContext.Provider>
	)
}

export default CharacterCombatPage;
