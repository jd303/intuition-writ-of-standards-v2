import st from './characterSheetPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UIColours } from "../../features/constants/UIColours";
import { useAppDispatch, useAppSelector } from "../../features/firebaseHooks";
import { setCharacterSheetSearch } from "../../features/search/searchSlice";
import { saveCharacter } from '../../features/firebase/data/writeCharactersData';
import ControlBar from "../components/controlBar/controlBar";
import SearchControl from "../components/controlBar/searchControl";
import SectionNav from "../components/controlBar/sectionNav";
import { useSectionNav } from "../components/controlBar/useSectionNav";
import { SectionBlock } from "../components/controlBar/sectionBlock";
import { CharacterModel } from '../../features/models/character/characterModel';
import TextField from '../components/inputs/textField/TextField';
import SelectField from '../components/inputs/selectField/SelectField';
import { getAttributeIcon } from '../../features/models/character/attributeIcons';
import ConfirmButton from '../components/confirmButton/confirmButton';
import PurchasePointGroup from '../components/purchasePointGroup/purchasePointGroup';
import SkillBlock from '../components/moves/SkillBlock';
import { CharacterSheetContext } from './characterContext';
import SelectorDropdown from '../components/controlBar/selectorDropdown';
import profilePhotos from './characterProfilePhotos.ts';
import BlockHeading from './blockHeading.tsx';
import AbilityModal from '../components/abilityModal/abilityModal.tsx';
import { SpellModel } from '../../features/models/spellModel.ts';
import { PsionicPowerModel } from '../../features/models/psionicPowerModel.ts';
import ResourceComponent from './components/resourceComponent.tsx';
import { MoveDisplayMode } from '../../features/models/moveDisplayModes.ts';
import SheetBlock from './characterSheetBlockComponent.tsx';
import ResistancesList from './components/resistancesListComponent.tsx';
import ItemBelt from './components/itemBeltComponent.tsx';
import Armours from './components/armoursComponent.tsx';
import Weapons from './components/weaponsComponent.tsx';
import Synergies from './components/synergiesComponent.tsx';
import { SynergyModel } from '../../features/models/synergyModel.ts';

import icoDocument from '/images/icons/ico.document.svg';
import icoWellness from '/images/icons/ico.wellness.svg';
import icoCircles from '/images/icons/ico.circles.svg';
import icoDagger from '/images/icons/ico.poisoned.dagger.svg';
import icoTool from '/images/icons/ico.magic.svg';
import icoBeast from '/images/icons/ico.bear.svg';
import icoFist from '/images/icons/ico.fist.svg';
import icoSpiral from '/images/icons/ico.spiral.svg';
import icoMagicMulti from '/images/icons/ico.magic.multi.svg';
import icoCombat from '/images/icons/ico.combat.svg';
import icoArmour from '/images/icons/ico.armour.svg';
import icoPotionBlack from '/images/icons/ico.potion.black.svg';
import icoCoin from '/images/icons/ico.medal.silver.svg';
import icoMapPin from '/images/icons/ico.map_pin.svg';
import Statuses from './components/statusesComponent.tsx';
import SpellList from './components/spellList.tsx';
import PsionicPowersViewer from './components/psionicPowersViewer.tsx';
import CharacterCompanion from './components/characterCompanion.tsx';
import CharacterCompanionMoves from './components/characterCompanionMoves.tsx';

function CharacterSheetPage() {
	const params = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	// Constants
	const dbWriteDelay = 2500;
	const updateDelay = 50;

	// Character Data
	const characterSaveTimeout = useRef<NodeJS.Timeout>(null);
	const characterValueUpdateTimeout = useRef<NodeJS.Timeout>(null);
	const charactersData = useAppSelector((state) => state.charactersData.characters);
	const characterSheetSearch = useAppSelector((state) => state.search.characterSheetSearch);
	const characterFromData = charactersData.find((character: CharacterModel) => character.id == params.id);
	const [character, setCharacter] = useState<CharacterModel>(new CharacterModel(characterFromData!));
	const [characterUpdated, setCharacterUpdated] = useState<boolean>(false);
	const totalPoints = useMemo(() => character.baseCharacterPoints + character.vitae.sessions + character.points.bonus, [character]);
	const [chooseProfileMode, setChooseProfileMode] = useState<boolean>(false);

	// Update the character
	const [purchaseMode, setPurchaseMode] = useState('default');
	const purchaseModeOptions = [{ value: "buy", label: "Buy" }, { value: "sell", label: "Sell" }];

	useEffect(() => {
		if (characterUpdated) {
			if (characterSaveTimeout.current) clearTimeout(characterSaveTimeout.current);
			characterSaveTimeout.current = setTimeout(() => {
				saveCharacter(charactersData, character);
				setCharacterUpdated(false);
			}, dbWriteDelay);
		}
	}, [characterUpdated]);

	const updateCharacterValue = (updatePath: string | string[], value: unknown | unknown[]) => {
		const updatedCharacter = character.updateValue(updatePath, value!);
		updateCharacter(updatedCharacter);
	}
	const updateCharacterPurchases = (updatePath: string, isSkill: boolean) => {
		if (purchaseMode == "none") return;
		if (purchaseMode == "buy" && character.points.spent >= totalPoints) return;
		const updatedCharacter = character.updatePurchase(updatePath, isSkill, purchaseMode == "buy");
		updateCharacter(updatedCharacter, true);
	}

	const characterValueUpdater = (updatePath: string) => {
		return (value: string | number | boolean | void) => updateCharacterValue(updatePath, value);
	}
	const characterPurchaseUpdater = (updatePath: string, isSkill?: boolean): VoidFunction => {
		return () => updateCharacterPurchases(updatePath, isSkill || false);
	}

	const updateCharacter = (updatedCharacter: CharacterModel, suppressDelay?: boolean) => {
		if (characterValueUpdateTimeout.current) clearTimeout(characterValueUpdateTimeout.current);
		characterValueUpdateTimeout.current = setTimeout(() => {
			setCharacter(updatedCharacter);
			setCharacterUpdated(true);
		}, suppressDelay ? 0 : updateDelay);
	}

	// Attribute Data
	const attributeOptions = [0, 1, 2, 3].map(i => { return { value: i, label: i } });
	const totalAttributes = useMemo(() => Object.keys(character.attributes).reduce((acc, key) => acc + character.attributes[key], 0), [character]);
	const attributeUpdater = (updatePath: string) => {
		return (value: string | number) => {
			if (totalAttributes + (value as number) <= 6) updateCharacterValue(updatePath, value);
			else setTimeout(() => resetAttributes(), 250);
		}
	}
	const resetAttributes = () => {
		updateCharacterValue(['attributes', 'attributeslocked'], [{ str: 0, con: 0, dex: 0, cha: 0, int: 0, wis: 0 }, false]);
	}

	const maxSkillPoints = useMemo(() => {
		const jackOfAllTradesBonus = character.vitae.racial_mods.secondary == '9dee48d6' && 1 || 0;
		return Math.max(1, Math.ceil(character.vitae.sessions / 8) + jackOfAllTradesBonus);
	}, [character]);

	// Modal Controls
	const [abilityModalVisible, setAbilityModalVisible] = useState(false);
	const [abilityModalSource, setAbilityModalSource] = useState<SpellModel | PsionicPowerModel | SynergyModel>();

	// Moves Data
	const movesByCategory = useAppSelector((state) => state.movesData.moves);

	// Sources Data
	const sources = useAppSelector((state) => state.sources.sources);
	const sourceOptions = useMemo(() => sources.map((s) => { return { value: s.id, label: s.name } }), [sources]);

	// Magic Data
	const spellcraftID = '797d1feb';

	// Racial Modifiers data
	const racialBonuses = useAppSelector((state) => state.racialBonuses.bonuses);
	const racialBonusesPrimaryOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "primary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);
	const racialBonusesSecondaryOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "secondary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);
	const racialBonusesStatureOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "stature").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);

	// Languages data
	const languages = useAppSelector((state) => state.languages.languages);
	const languageOptions = [{ value: '', label: 'Choose' }, ...useMemo(() => languages.map((l) => { return { value: l.id, label: l.name } }), [languages])];

	// Companion Moves
	const companionBondId = 'cb7b1539';
	const hasCompanionPassive = character.purchases.skills_and_expertises[companionBondId] > 0;

	// Inventory data
	const inventoryEquipment = useMemo(() => [...(character.inventory.equipment || []).map(inv => inv || ''), ''], [character]);
	const inventoryAdventuring = useMemo(() => [...(character.inventory.adventuring || []).map(inv => inv || ''), ''], [character]);
	const inventoryConsumables = useMemo(() => [...(character.inventory.consumables || []).map(inv => inv || ''), ''], [character]);

	// Switches to combat view
	const combatView = () => {
		navigate(`/characters/${params.id}/combat`);
	}

	return (
		<CharacterSheetContext.Provider value={{ character, purchaseMode, setPurchaseMode, characterPurchaseUpdater, characterValueUpdater, updateCharacterValue, characterSheetSearch, maxSkillPoints, setAbilityModalVisible, setAbilityModalSource }}>
			<AbilityModal ability={abilityModalSource} visible={abilityModalVisible} onClose={() => setAbilityModalVisible(false)} />
			<div className={st.characterSheetPageContainer} data-purchasemode={purchaseMode} data-searching={characterSheetSearch != ''}>
				<ControlBar colour={UIColours.cobalt}>
					<SectionNav sections={sectionDefinitions} label={"Go"} />
					<SearchControl name={"Search"} initialValue={characterSheetSearch} onChange={(value: string) => dispatch(setCharacterSheetSearch(value))} />
					<SelectorDropdown label="Mode" initialValue={purchaseMode} defaultValue="default" options={purchaseModeOptions} onChange={(value) => setPurchaseMode(value)} />
					<button onClick={combatView}>Combat</button>
				</ControlBar>
				<div className={st.sections}>
					<SectionBlock name={character.vitae.name} icon={icoDocument} innerClassName={st.sectionVitae} className={st.sectionVitaeOuter} sectionRefs={sectionRefs}>
						<div data-field="profilephoto" className={st[`selectMode${chooseProfileMode}`]} onClick={() => setChooseProfileMode(!chooseProfileMode)}>
							{chooseProfileMode ? (<div className={st.profileSelector}>
								{profilePhotos.map((photo, index: number) => (
									<img src={`/images/character_profiles/${photo}`} key={`photo-${index}`} onClick={() => updateCharacterValue('vitae.profile_photo', photo)} />
								))}
							</div>) :
								<img src={`/images/character_profiles/${character.vitae.profile_photo}`} alt="Profile Photo" />
							}
						</div>
						<SheetBlock layout="flex-column">
							<div className={st.labelField} data-field="name">
								<label className="trattatello">Name</label>
								<TextField initialValue={character.vitae.name} onChange={characterValueUpdater('vitae.name')} />
							</div>
							<div className={st.labelField} data-field="sessions">
								<label className="trattatello">Sessions</label>
								<TextField initialValue={character.vitae.sessions} type="number" onChange={characterValueUpdater('vitae.sessions')} />
								<label className="trattatello">({maxSkillPoints} Max skill points)</label>
							</div>
							<div data-field="points">
								<div className={st.labelField}>
									<label className="trattatello">Points</label>
									<TextField initialValue={`${character.points.spent} / ${totalPoints}`} disabled />
								</div>
								<div className={st.labelField}>
									<label className="trattatello">Bonus</label>
									<TextField initialValue={character.points.bonus} type="number" onChange={characterValueUpdater('points.bonus')} />
								</div>
							</div>
							<div className={st.labelField} data-field="race">
								<label className="trattatello">Race</label>
								<TextField initialValue={character.vitae.race} onChange={characterValueUpdater('vitae.race')} />
							</div>
							<div className={st.labelField} data-field="stats">
								<div className={st.statsFlex}>
									<label className="trattatello" onClick={resetAttributes}>Stats (Max 6 Points)</label>
									<div className={st.statList}>
										{Object.keys(character.attributes).map((attributeKey: string) => (
											<div className={st.stat} key={`attr-${attributeKey}`}>
												<img src={getAttributeIcon(attributeKey)} alt="Icon" />
												<div className="trattatello">{attributeKey.substring(0, 3)}</div>
												<div className={st.statPurchases}>
													{!character.attributeslocked ?
														<SelectField options={attributeOptions} initialValue={character.attributes[attributeKey]} onChange={attributeUpdater(`attributes.${attributeKey}`)} type="number" disabled={totalAttributes >= 6} />
														:
														<TextField initialValue={character.attributes[attributeKey]} disabled={true} />
													}
												</div>
											</div>
										))}
										{!character.attributeslocked ? <>
											<ConfirmButton label="Confirm" className={st.confirmButton} onClick={characterValueUpdater(`attributeslocked`)} confirmValue={true} disabled={totalAttributes != 6} />
											<ConfirmButton label="Reset" className={st.confirmButton} onClick={resetAttributes} />
										</> : <></>}
									</div>
								</div>
							</div>
							<div data-field="attributes">
								<div className={st.labelField}>
									<label className="trattatello">Speed (sq)</label>
									<TextField initialValue={character.vitae.speed} type="number" onChange={characterValueUpdater('vitae.speed')} />
								</div>
								<div className={st.labelField}>
									<label className="trattatello">Source</label>
									<SelectField initialValue={character.vitae.source} options={sourceOptions} onChange={characterValueUpdater('vitae.source')} />
								</div>
							</div>
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<BlockHeading
								label='Known Languages'
								addendum={<PurchasePointGroup count={2} columns={3} maxPurchases={2} purchased={character.purchases.known_languages} purchaseCallback={characterPurchaseUpdater('known_languages')} />}
								size="small" />
							{Array.from(Array(character.purchases.known_languages + 1)).map((_, index) => (
								<SelectField initialValue={character.vitae.languages[index]} options={languageOptions} onChange={characterValueUpdater(`vitae.languages.${index}`)} key={`language-${index}`} />
							))}
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<BlockHeading label='Racial Traits' size="small" />
							<SelectField initialValue={character.vitae.racial_mods.primary} options={racialBonusesPrimaryOptions} onChange={characterValueUpdater('vitae.racial_mods.primary')} />
							<SelectField initialValue={character.vitae.racial_mods.secondary} options={racialBonusesSecondaryOptions} onChange={characterValueUpdater('vitae.racial_mods.secondary')} />
							<SelectField initialValue={character.vitae.racial_mods.stature} options={racialBonusesStatureOptions} onChange={characterValueUpdater('vitae.racial_mods.stature')} />
						</SheetBlock>
					</SectionBlock>
					<SectionBlock name="Wellness" icon={icoWellness} innerClassName={`${st.sectionWellness} ${st.gridLayout}`} sectionRefs={sectionRefs}>
						<SheetBlock layout="flex-row">
							<ResourceComponent type="verve" mode={MoveDisplayMode.default} />
						</SheetBlock>
						<SheetBlock layout="flex-row">
							<ResistancesList />
						</SheetBlock>
						<SheetBlock className={st.armoursField}>
							<Armours />
						</SheetBlock>
						<SheetBlock layout="flex-row" className={st.itemBeltField}>
							<ItemBelt />
						</SheetBlock>
						<SheetBlock layout="flex-row" className={st.statusesField}>
							<Statuses />
						</SheetBlock>
						<div className={`${st.skillsField} ${st.gridLayout}`}>
							<SheetBlock><SkillBlock skillCategory={movesByCategory.preparedness} mode={MoveDisplayMode.default} /></SheetBlock>
							<SheetBlock><SkillBlock skillCategory={movesByCategory.defences} mode={MoveDisplayMode.default} /></SheetBlock>
							<SheetBlock><SkillBlock skillCategory={movesByCategory.resist_physical} mode={MoveDisplayMode.default} /></SheetBlock>
							<SheetBlock><SkillBlock skillCategory={movesByCategory.resist_mental} mode={MoveDisplayMode.default} /></SheetBlock>
						</div>
					</SectionBlock>
					<SectionBlock name="Combat" icon={icoCombat} innerClassName={`${st.sectionCombat} ${st.flexLayout} ${st.autoFlexColumn}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock>
							<Weapons />
						</SheetBlock>
						<div data-field="combat_skills">
							<SheetBlock><SkillBlock skillCategory={movesByCategory.combat} mode={MoveDisplayMode.default} /></SheetBlock>
						</div>
					</SectionBlock>
					<SectionBlock name="General" icon={icoCircles} innerClassName={`${st.sectionGeneral} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.perception} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.athletics} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.knowledge} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.influence} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Subterfuge" icon={icoDagger} innerClassName={`${st.sectionSubterfuge} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.stealthery} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.subterfuge} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Crafting" icon={icoTool} innerClassName={`${st.sectionCrafting} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.creativity} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.alchemy} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.engineering} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.gadgetry} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Magic" icon={icoMagicMulti} innerClassName={`${st.sectionMagic} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock>
							<ResourceComponent type="mana" mode={MoveDisplayMode.default} />
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<Synergies />
						</SheetBlock>
						{character.purchases.skills_and_expertises[spellcraftID] > 0 && (
							<SheetBlock className={st.spellsField}>
								<SpellList mode={MoveDisplayMode.default} />
							</SheetBlock>
						)}
						<SheetBlock><SkillBlock skillCategory={movesByCategory.magic_spellcraft} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.magic_cast} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.magic_enchanting} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Beast Mastery" icon={icoBeast} innerClassName={`${st.sectionBeastMastery} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<div className={st.skillAndMovesLayout}>
							<SheetBlock>
								<SkillBlock skillCategory={movesByCategory.beast_mastery} mode={MoveDisplayMode.default} />
							</SheetBlock>
							{hasCompanionPassive && <CharacterCompanionMoves />}
						</div>
						{hasCompanionPassive && (
							<>
								<SheetBlock layout="flex-column" className={st.companionField}>
									<CharacterCompanion mode={MoveDisplayMode.default} />
								</SheetBlock>
							</>
						)}
					</SectionBlock>
					<SectionBlock name="Inner Power" icon={icoFist} innerClassName={`${st.sectionInnerPower} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.wildform} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.channel_divinity} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.ki} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.rage} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.rhapsody} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Psionics" icon={icoSpiral} innerClassName={`${st.sectionPsionics} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SheetBlock>
							<ResourceComponent type="psi" mode={MoveDisplayMode.default} />
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<PsionicPowersViewer />
						</SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.psi_kinetics} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.psi_clairsentience} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.psi_telepathy} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.psi_metabolism} mode={MoveDisplayMode.default} /></SheetBlock>
						<SheetBlock><SkillBlock skillCategory={movesByCategory.metapsi} mode={MoveDisplayMode.default} /></SheetBlock>
					</SectionBlock>
					<SectionBlock name="Inventory" sectionRefs={sectionRefs} innerClassName={`${st.sectionInventory} ${st.gridLayout}`}>
						<SheetBlock className={st.standardsField}>
							<BlockHeading
								icon={icoCoin}
								label='Standards' />
							<TextField type="number" initialValue={character.inventory.standards as number} onChange={characterValueUpdater(`inventory.standards`)} />
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<BlockHeading
								icon={icoArmour}
								label='Equipment' />
							{inventoryEquipment.map((item, index) => (
								<TextField type="text" initialValue={item} onChange={characterValueUpdater(`inventory.equipment.${index}`)} key={`inv-equ-${index}`} />
							))}
						</SheetBlock>
						<SheetBlock layout="flex-column">
							<BlockHeading
								icon={icoMapPin}
								label='Adventuring' />
							{inventoryAdventuring.map((item, index) => (
								<TextField type="text" initialValue={item} onChange={characterValueUpdater(`inventory.adventuring.${index}`)} key={`inv-adv-${index}`} />
							))}
						</SheetBlock>
						<SheetBlock layout="flex-column" className={st.consumablesField}>
							<BlockHeading
								icon={icoPotionBlack}
								label='Consumables' />
							{inventoryConsumables.map((item, index) => (
								<TextField type="text" initialValue={item} onChange={characterValueUpdater(`inventory.consumables.${index}`)} key={`inv-con-${index}`} />
							))}
						</SheetBlock>
					</SectionBlock>
					<SectionBlock name="Notes" sectionRefs={sectionRefs} innerClassName={`${st.sectionNotes} ${st.gridLayout}`}>
						<TextField type="textarea" initialValue={character.notes.notes1} onChange={characterValueUpdater('notes.notes1')} />
						<TextField type="textarea" initialValue={character.notes.notes2} onChange={characterValueUpdater('notes.notes2')} />
						<TextField type="textarea" initialValue={character.notes.notes3} onChange={characterValueUpdater('notes.notes3')} />
					</SectionBlock>
				</div>
			</div >
		</CharacterSheetContext.Provider >
	)
}

export default CharacterSheetPage;
