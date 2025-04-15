import st from './characterSheetPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UIColours } from "../../features/constants/UIColours";
import { useAppDispatch, useAppSelector } from "../../features/firebaseHooks";
import { setCharacterSheetSearch } from "../../features/search/searchSlice";
import { saveCharacter } from '../../features/firebase/data/writeCharactersData';
import { DamageDiceOptions } from '../../features/dataStatic/damageDice';
import { ResistanceOptions } from '../../features/dataStatic/resistances';
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
import { CharacterSheetContext } from './purchaseModeContext';
import SelectorDropdown from '../components/controlBar/selectorDropdown';
import profilePhotos from './characterProfilePhotos.ts';

import icoDocument from '/public/images/icons/ico.document.svg';
import icoWellness from '/public/images/icons/ico.wellness.svg';
import icoCircles from '/public/images/icons/ico.circles.svg';
import icoDagger from '/public/images/icons/ico.poisoned.dagger.svg';
import icoTool from '/public/images/icons/ico.magic.svg';
import icoBeast from '/public/images/icons/ico.bear.svg';
import icoFist from '/public/images/icons/ico.fist.svg';
import icoMagic from '/public/images/icons/ico.magic.svg';
import icoCombat from '/public/images/icons/ico.combat.svg';
import icoArmour from '/public/images/icons/ico.armour.svg';

function CharacterSheetPage() {
	const params = useParams();
	const dispatch = useAppDispatch();
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
	const [character, setCharacter] = useState<CharacterModel>(new CharacterModel(characterFromData));
	const [characterUpdated, setCharacterUpdated] = useState<boolean>(false);
	const characterPurchases = useMemo(() => character.purchases, [character]);
	const characterStatValues = useMemo(() => character.attributes, [character]);
	const totalPoints = useMemo(() => character.baseCharacterPoints + character.vitae.sessions + character.points.bonus, [character]);
	const { totalVerve, totalMana, totalPsi } = useMemo(() => { return { totalVerve: character.baseVerve + character.verve.bonus + character.purchases.verve * 5, totalMana: character.baseMana + character.mana.bonus + character.purchases.mana * 5, totalPsi: character.basePsi + character.psi.bonus + character.purchases.psi * 5 } }, [character]);
	const [chooseProfileMode, setChooseProfileMode] = useState<boolean>(false);

	// Update the character
	const [purchaseMode, setPurchaseMode] = useState('disabled');
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
		if (purchaseMode == "disabled") return;
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

	const maxMovePoints = useMemo(() => {
		return Math.max(1, Math.ceil(character.vitae.sessions / 8));
	}, [character]);

	// Weapon Specialisation
	const damageDiceOptions = useMemo(() => { return DamageDiceOptions.map((dd) => { return { value: dd, label: dd } }); }, []);
	const weaponSpecialisationsData = useAppSelector((state) => state.weaponSpecialisations.weaponSpecialisations);
	const weaponSpecialisations = useMemo(() => {
		return weaponSpecialisationsData.map((ws) => { return { value: ws.id, label: `${ws.name} - ${ws.description}` } });
	}, [weaponSpecialisationsData]);

	// Resistances
	const resistanceOptions = useMemo(() => { return ResistanceOptions.map((dd) => { return { value: dd, label: dd } }); }, []);

	// Moves Data
	const movesByCategory = useAppSelector((state) => state.movesData.moves);

	// Statuses Data
	const statusesData = useAppSelector((state) => state.statusesData.statuses);
	const statusesOptions = useMemo(() => [{ value: '', label: 'Prefill from Statuses' }, ...statusesData.map((st: Record<string, string>) => { return { value: `${st.negative && '🌩️' || '⭐'} ${st.name} - ${st.effect}`, label: `${st.negative && '🌩️' || '⭐'} ${st.name}` } })], [statusesData]);
	const activeStatuses = useMemo(() => [...character.statuses.map(status => status || ''), ''], [character]);

	// Sources Data
	const sources = useAppSelector((state) => state.sources.sources);
	const sourceOptions = useMemo(() => sources.map((s) => { return { value: s.id, label: s.name } }), [sources]);

	// Synergies Data
	const synergies = useAppSelector((state) => state.synergies.synergies);
	const synergiesOptions = useMemo(() => synergies.map(syn => { return { value: syn.id, label: `${syn.name}: ${syn.effect}` } }), [synergies]);

	// Racial Modifiers data
	const racialBonuses = useAppSelector((state) => state.racialBonuses.bonuses);
	const racialBonusesPrimaryOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "primary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);
	const racialBonusesSecondaryOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "secondary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);
	const racialBonusesStatureOptions = useMemo(() => [{ value: '', label: '' }, ...racialBonuses.filter(s => s.type == "stature").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } })], [racialBonuses]);

	// Languages data
	const languages = useAppSelector((state) => state.languages.languages);
	const languageOptions = [{ value: '', label: 'Choose' }, ...useMemo(() => languages.map((l) => { return { value: l.id, label: l.name } }), [languages])];

	return (
		<CharacterSheetContext.Provider value={{ purchaseMode, setPurchaseMode, characterPurchases, characterPurchaseUpdater, characterSheetSearch, maxMovePoints, characterStatValues, characterRacialBonuses: { primary: character.vitae.racial_mods.primary, secondary: character.vitae.racial_mods.secondary } }}>
			<div className={st.characterSheetPageContainer} data-purchasemode={purchaseMode} data-searching={characterSheetSearch != ''}>
				<ControlBar colour={UIColours.cobalt}>
					<SectionNav sections={sectionDefinitions} label={"Jump to"} />
					<SearchControl name={"Search"} initialValue={characterSheetSearch} onChange={(value: string) => dispatch(setCharacterSheetSearch(value))} />
					<SelectorDropdown label="Purchase" initialValue={purchaseMode} defaultValue="disabled" options={purchaseModeOptions} onChange={(value) => setPurchaseMode(value)} />
				</ControlBar>
				<div className={st.sections}>
					<SectionBlock name={character.vitae.name} icon={icoDocument} innerClassName={st.sectionVitae} sectionRefs={sectionRefs}>
						<div data-field="profilephoto" className={st[`selectMode${chooseProfileMode}`]} onClick={() => setChooseProfileMode(!chooseProfileMode)}>
							{chooseProfileMode ? (<div className={st.profileSelector}>
								{profilePhotos.map((photo, index: number) => (
									<img src={`/public/images/character_profiles/${photo}`} key={`photo-${index}`} onClick={() => updateCharacterValue('vitae.profile_photo', photo)} />
								))}
							</div>) :
								<img src={`/public/images/character_profiles/${character.vitae.profile_photo}`} alt="Profile Photo" />
							}
						</div>
						<div className={`${st.block} ${st.metaData}`}>
							<div className={st.labelField} data-field="name">
								<label className="trattatello">Name</label>
								<TextField initialValue={character.vitae.name} onChange={characterValueUpdater('vitae.name')} />
							</div>
							<div className={st.labelField} data-field="sessions">
								<label className="trattatello">Sessions</label>
								<TextField initialValue={character.vitae.sessions} type="number" onChange={characterValueUpdater('vitae.sessions')} />
								<label className="trattatello">({maxMovePoints} Max skill points)</label>
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
						</div>
						<div className={`${st.labelField} ${st.block}`} data-field="known_languages">
							<label className="trattatello">
								Known Languages
								<PurchasePointGroup count={2} columns={3} maxPurchases={2} purchased={character.purchases.known_languages} purchaseCallback={characterPurchaseUpdater('known_languages')} />
							</label>
							{Array.from(Array(character.purchases.known_languages + 1)).map((_, index) => (
								<SelectField initialValue={character.vitae.languages[index]} options={languageOptions} onChange={characterValueUpdater(`vitae.languages.${index}`)} key={`language-${index}`} />
							))}
						</div>
						<div className={`${st.labelField} ${st.block}`} data-field="racial_bonuses">
							<label className="trattatello">Racial Modifiers</label>
							<SelectField initialValue={character.vitae.racial_mods.primary} options={racialBonusesPrimaryOptions} onChange={characterValueUpdater('vitae.racial_mods.primary')} />
							<SelectField initialValue={character.vitae.racial_mods.secondary} options={racialBonusesSecondaryOptions} onChange={characterValueUpdater('vitae.racial_mods.secondary')} />
							<SelectField initialValue={character.vitae.racial_mods.stature} options={racialBonusesStatureOptions} onChange={characterValueUpdater('vitae.racial_mods.stature')} />
						</div>
					</SectionBlock>
					<SectionBlock name="Wellness" icon={icoWellness} innerClassName={`${st.sectionWellness} ${st.gridLayout} ${st.autoGridLeft}`} sectionRefs={sectionRefs}>
						<div data-field="verve" className={st.block}>
							<h2>Verve <div className={st.maxLabel}>{character.baseVerve} + {character.vervePerPoint} / point.</div></h2>
							<div><PurchasePointGroup count={30} columns={15} purchased={character.purchases.verve} purchaseCallback={characterPurchaseUpdater('verve')} maxPurchases={5 + maxMovePoints * 2} /></div>
							<div className={st.resourceFields}>
								<TextField label="Current" type="number" initialValue={character.verve.current} onChange={characterValueUpdater('verve.current')} className={(character.verve.current > totalVerve) ? st.overResourced : ''} />
								<TextField label="Bonus" type="number" initialValue={character.verve.bonus} onChange={characterValueUpdater('verve.bonus')} />
								<TextField label="Total" type="number" initialValue={totalVerve} />
							</div>
						</div>
						<div data-field="mana" className={st.block}>
							<h2>Mana <div className={st.maxLabel}>{character.baseMana} + {character.manaPerPoint} / point.</div></h2>
							<div><PurchasePointGroup count={30} columns={15} purchased={character.purchases.mana} purchaseCallback={characterPurchaseUpdater('mana')} maxPurchases={5 + maxMovePoints * 2} /></div>
							<div className={st.resourceFields}>
								<TextField label="Current" type="number" initialValue={character.mana.current} onChange={characterValueUpdater('mana.current')} className={(character.mana.current > totalMana) ? st.overResourced : ''} />
								<TextField label="Bonus" type="number" initialValue={character.mana.bonus} onChange={characterValueUpdater('mana.bonus')} />
								<TextField label="Total" type="number" initialValue={totalMana} />
							</div>
						</div>
						<div data-field="psi" className={st.block}>
							<h2>Psi <div className={st.maxLabel}>{character.basePsi} + {character.psiPerPoint} / point.</div></h2>
							<div><PurchasePointGroup count={30} columns={15} purchased={character.purchases.psi} purchaseCallback={characterPurchaseUpdater('psi')} maxPurchases={5 + maxMovePoints * 2} /></div>
							<div className={st.resourceFields}>
								<TextField label="Current" type="number" initialValue={character.psi.current} onChange={characterValueUpdater('psi.current')} className={(character.psi.current > totalPsi) ? st.overResourced : ''} />
								<TextField label="Bonus" type="number" initialValue={character.psi.bonus} onChange={characterValueUpdater('psi.bonus')} />
								<TextField label="Total" type="number" initialValue={totalPsi} />
							</div>
						</div>
						<div data-field="statuses" className={st.block}>
							<h2>Statuses &amp; Buffs</h2>
							{activeStatuses.map((value, index) => (
								<div className={st.status} key={`buff-${index}`}>
									<TextField type="textarea" initialValue={value} onChange={characterValueUpdater(`statuses.${index}`)} />
									<button onClick={() => updateCharacterValue(`statuses.${index}`, '')}>X</button>
								</div>
							))}
							<SelectField initialValue='Prefill' options={statusesOptions} onChange={characterValueUpdater(`statuses.${activeStatuses.length}`)} />
						</div>
						<div data-field="item_belt" className={st.block}>
							<h2>Item Belt</h2>
							<div className={st.beltValues}>
								<TextField label="Usable" type="number" initialValue={2} disabled={true} /> <TextField label="Usable Bonus" type="number" initialValue={2} />
							</div>
							<div className={st.beltValues}>
								<TextField label="Throwable" type="number" initialValue={3} disabled={true} /> <TextField label="Throwable Bonus" type="number" initialValue={0} />
							</div>
						</div>
						<div data-field="skill_preparedness" className={st.block}>
							<SkillBlock skillCategory={movesByCategory.preparedness} mode="default" purchasedPoints={0} />
						</div>
					</SectionBlock>
					<SectionBlock name="Combat and Defences" icon={icoCombat} innerClassName={st.sectionCombat} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<div className={`${st.combatMetaLayout} ${st.gridLayout}`}>
							<div data-field="weapons" className={st.block}>
								<h2><img src={icoCombat} alt="Combat" /> Weapons</h2>
								<div className={st.weaponFields}>
									<TextField label="Name" initialValue={character.weapons[0].name} onChange={characterValueUpdater('weapons.0.name')} />
									<SelectField label="Damage" options={damageDiceOptions} initialValue={character.weapons[0]!.damageDice || damageDiceOptions[0].value} onChange={characterValueUpdater('weapons.0.damageDice')} />
									<TextField label="+ Dam" type="number" initialValue={character.weapons[0].bonus_damage} onChange={characterValueUpdater('weapons.0.bonus_damage')} />
									<TextField label="+ Raw" type="number" initialValue={character.weapons[0].bonus_raw} onChange={characterValueUpdater('weapons.0.bonus_raw')} />
									<TextField label="Effects" initialValue={character.weapons[0].special} onChange={characterValueUpdater('weapons.0.special')} />
									<TextField initialValue={character.weapons[1].name} onChange={characterValueUpdater('weapons.1.name')} />
									<SelectField options={damageDiceOptions} initialValue={character.weapons[1]!.damageDice || damageDiceOptions[0].value} onChange={characterValueUpdater('weapons.1.damageDice')} />
									<TextField type="number" initialValue={character.weapons[1].bonus_damage} onChange={characterValueUpdater('weapons.1.bonus_damage')} />
									<TextField type="number" initialValue={character.weapons[1].bonus_raw} onChange={characterValueUpdater('weapons.1.bonus_raw')} />
									<TextField initialValue={character.weapons[1].special} onChange={characterValueUpdater('weapons.1.special')} />
								</div>
							</div>
							<div data-field="armour" className={st.block}>
								<h2><img src={icoArmour} alt="Armour" />Armour / Shield</h2>
								<div className={st.armourFields}>
									<TextField label="Name" initialValue="Armour Name" />
									<TextField label="PRes" initialValue="PRes" />
									<TextField label="Effects" initialValue="Effects" />
									<TextField initialValue="Shield Name" />
									<TextField initialValue="PRes" />
									<TextField initialValue="Effects" />
								</div>
							</div>
							<div data-field="weapon_specialisations" className={st.block}>
								<h2>Weapon Specialisations <PurchasePointGroup count={3} columns={3} purchased={character.purchases.weapon_specialisations} maxPurchases={3} purchaseCallback={characterPurchaseUpdater('weapon_specialisations')} /></h2>
								<SelectField options={weaponSpecialisations} initialValue={weaponSpecialisationsData[0]?.id} />
							</div>
							<div data-field="resistances" className={st.block}>
								<h2>Resistances</h2>
								<div className={st.addResistance}>
									<SelectField label="Add Resistance Type" initialValue="URes" options={resistanceOptions} />
									<button onClick={() => console.log("ADD RESISTANCE")}>Add</button>
								</div>
								<div className={st.resistanceList}>
									<div className="trattatello">Active Resistances</div>
									<div className={st.activeResistance}>
										<TextField label="Type" initialValue={"Ures"} />
										<TextField label="Value" initialValue={"-5"} />
										<button onClick={() => console.log("Remove RESISTANCE")}>Remove</button>
									</div>
								</div>
							</div>
						</div>
						<div className={`${st.combatSkillsLayout} ${st.gridLayout}`}>
							<SkillBlock className={st.block} skillCategory={movesByCategory.defences} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} characterPurchaseUpdater={characterPurchaseUpdater} />
							<SkillBlock className={st.block} skillCategory={movesByCategory.combat} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
							<SkillBlock className={st.block} skillCategory={movesByCategory.resist_physical} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
							<SkillBlock className={st.block} skillCategory={movesByCategory.resist_mental} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						</div>
					</SectionBlock>
					<SectionBlock name="General Moves" icon={icoCircles} innerClassName={`${st.sectionGeneral} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.perception} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.athletics} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.knowledge} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.influence} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Subterfuge Moves" icon={icoDagger} innerClassName={`${st.sectionSubterfuge} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.stealthery} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.subterfuge} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Crafting Moves" icon={icoTool} innerClassName={`${st.sectionCrafting} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.creativity} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.alchemy} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.engineering} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.gadgetry} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Beast Mastery" icon={icoBeast} innerClassName={`${st.sectionBeastMastery} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.beast_mastery} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<div data-field="companion" className={st.block}>
							COMPANION
						</div>
					</SectionBlock>
					<SectionBlock name="Inner Power" icon={icoFist} innerClassName={`${st.sectionInnerPower} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.wildform} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.channel_divinity} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.ki} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.rage} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.rhapsody} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Magic" icon={icoMagic} innerClassName={`${st.sectionMagic} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<div className={`${st.block} ${st.synergies}`}>
							<h2>Synergies <PurchasePointGroup count={3} columns={3} purchased={character.purchases.magical_synergy} maxPurchases={3} purchaseCallback={characterPurchaseUpdater('magical_synergy')} /></h2>
							<SelectField options={synergiesOptions} initialValue={character.magical_synergies[0]} onChange={characterValueUpdater('magical_synergies.0')} />
						</div>
						<SkillBlock className={st.block} skillCategory={movesByCategory.magic_spellcraft} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.magic_cast} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.magic_enchanting} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Psionics" icon={icoFist} innerClassName={`${st.sectionPsionics} ${st.gridLayout}`} sectionRefs={sectionRefs} className={stcl.contentListParent}>
						<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_kinetics} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_clair} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_telepath} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_metab} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
						<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_metapsi} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</SectionBlock>
					<SectionBlock name="Inventory" sectionRefs={sectionRefs} innerClassName={`${st.sectionInventory} ${st.gridLayout}`}>
						<TextField type="textarea" initialValue={character.inventory.item1} onChange={characterValueUpdater('inventory.item1')} />
						<TextField type="textarea" initialValue={character.inventory.item2} onChange={characterValueUpdater('inventory.item2')} />
						<TextField type="textarea" initialValue={character.inventory.item3} onChange={characterValueUpdater('inventory.item3')} />
					</SectionBlock>
					<SectionBlock name="Notes" sectionRefs={sectionRefs} innerClassName={`${st.sectionNotes} ${st.gridLayout}`}>
						<TextField type="textarea" initialValue={character.notes.item1} onChange={characterValueUpdater('notes.item1')} />
						<TextField type="textarea" initialValue={character.notes.item2} onChange={characterValueUpdater('notes.item2')} />
						<TextField type="textarea" initialValue={character.notes.item3} onChange={characterValueUpdater('notes.item3')} />
					</SectionBlock>
				</div>
			</div>
		</CharacterSheetContext.Provider>
	)
}

export default CharacterSheetPage;
