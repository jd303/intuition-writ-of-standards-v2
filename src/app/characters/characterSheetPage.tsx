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
import TextareaField from '../components/inputs/textareaField/TextareaField';
import SelectField from '../components/inputs/selectField/SelectField';
import { getAttributeIcon } from '../../features/models/character/attributeIcons';
import ConfirmButton from '../components/confirmButton/confirmButton';
import PurchasePointGroup from '../components/purchasePointGroup/purchasePointGroup';
import SkillBlock from '../components/moves/SkillBlock';

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
	const dbWriteDelay = 3000;
	const updateDelay = 500;

	// Character Data
	const characterSaveTimeout = useRef<NodeJS.Timeout>(null);
	const characterValueUpdateTimeout = useRef<NodeJS.Timeout>(null);
	const characterId = 'ffd1aeb4-a8eb-48c7-87fb-e4d6b02781aa'; // TEMP
	const charactersData = useAppSelector((state) => state.charactersData.characters);
	const characterSheetSearch = useAppSelector((state) => state.search.characterSheetSearch);
	const characterFromData = charactersData.find((character: CharacterModel) => character.id == params.id);
	const [character, setCharacter] = useState<CharacterModel>(new CharacterModel(characterFromData));
	const [characterUpdated, setCharacterUpdated] = useState<boolean>(false);

	useEffect(() => {
		const characterData = charactersData.find((character) => character.id == characterId);
		if (characterData) setCharacter(new CharacterModel(characterData));
	}, [charactersData]);

	useEffect(() => {
		if (characterUpdated) {
			if (characterSaveTimeout.current) clearTimeout(characterSaveTimeout.current);
			characterSaveTimeout.current = setTimeout(() => {
				saveCharacter(charactersData, character);
				setCharacterUpdated(false);
			}, dbWriteDelay);
		}
	}, [characterUpdated, character, charactersData]);

	const updateCharacter = (updatePath: string, value: string | number) => {
		if (characterValueUpdateTimeout.current) clearTimeout(characterValueUpdateTimeout.current);
		characterValueUpdateTimeout.current = setTimeout(() => {
			setCharacter(character.update(updatePath, value));
			setCharacterUpdated(true);
		}, updateDelay);
	}

	const characterUpdater = (updatePath: string) => {
		return (value: string | number) => updateCharacter(updatePath, value);
	}

	// Attribute Data
	const attributeOptions = [0, 1, 2, 3].map(i => { return { value: i, label: i } });

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

	// Sources Data
	const sources = useAppSelector((state) => state.sources.sources);
	const sourceOptions = useMemo(() => sources.map((s) => { return { value: s.id, label: s.name } }), [sources]);

	// Racial Modifiers data
	const racialBonuses = useAppSelector((state) => state.racialBonuses.bonuses);
	const racialBonusesPrimaryOptions = useMemo(() => racialBonuses.filter(s => s.type == "primary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } }), [racialBonuses]);
	const racialBonusesSecondaryOptions = useMemo(() => racialBonuses.filter(s => s.type == "secondary").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } }), [racialBonuses]);
	const racialBonusesStatureOptions = useMemo(() => racialBonuses.filter(s => s.type == "stature").map((s) => { return { value: s.id, label: `${s.name} - ${s.description}` } }), [racialBonuses]);

	// Languages data
	const languages = useAppSelector((state) => state.languages.languages);
	const languageOptions = useMemo(() => languages.map((l) => { return { value: l.id, label: l.name } }), [languages]);

	return (
		<div className={st.characterSheetPageContainer}>
			<ControlBar colour={UIColours.cobalt}>
				<SectionNav sections={sectionDefinitions} label={"Jump to"} />
				<SearchControl name={"Search"} initialValue={characterSheetSearch} onChange={(value: string) => dispatch(setCharacterSheetSearch(value))} />
			</ControlBar>
			<div className={st.sections}>
				<SectionBlock name={`Vitae - ${character.name}`} icon={icoDocument} innerClassName={st.sectionVitae} sectionRefs={sectionRefs}>
					<div data-field="profilephoto">
						<img src="https://fastly.picsum.photos/id/342/200/300.jpg?hmac=Gnal7xeN_WjA5N6yFx34kKTAGt5mbybc2ATiCeq07-k" alt="Profile Photo" />
					</div>
					<div className={`${st.block} ${st.metaData}`}>
						<div className={st.labelField} data-field="name">
							<label className="trattatello">Name</label>
							<TextField initialValue={character.name} />
						</div>
						<div className={st.labelField} data-field="sessions">
							<label className="trattatello">Sessions</label>
							<TextField initialValue={character.sessions} type="number" />
							<label className="trattatello">12 Max skill points</label>
						</div>
						<div data-field="points">
							<div className={st.labelField}>
								<label className="trattatello">Points</label>
								<TextField initialValue='23 / 44' disabled />
							</div>
							<div className={st.labelField}>
								<label className="trattatello">Bonus</label>
								<TextField initialValue='0' />
							</div>
						</div>
						<div className={st.labelField} data-field="race">
							<label className="trattatello">Race</label>
							<TextField initialValue='Hooman' />
						</div>
						<div className={st.labelField} data-field="stats">
							<div className={st.statsFlex}>
								<label className="trattatello">Stats (Max 6 Points)</label>
								<div className={st.statList}>
									{Object.keys(character.attributes).map((attributeKey: string, index) => (
										<div className={st.stat} key={index}>
											<img src={getAttributeIcon(attributeKey)} alt="Icon" />
											<div className="trattatello">{attributeKey.substring(0, 3)}</div>
											<div className={st.statPurchases}>
												{!character.attributeslocked ?
													<SelectField options={attributeOptions} initialValue={character.attributes[attributeKey]} onChange={characterUpdater(`attributes.${attributeKey}`)} />
													:
													<TextField initialValue={character.attributes[attributeKey]} disabled={true} />
												}
											</div>
										</div>
									))}
									{!character.attributeslocked ? <ConfirmButton label="Confirm Attributes" className={st.confirmButton} onClick={() => {/*updateValueFromInput('attributeslocked', true)*/ }} /> : <></>}
								</div>
							</div>
						</div>
						<div data-field="attributes">
							<div className={st.labelField}>
								<label className="trattatello">Speed (sq)</label>
								<TextField initialValue='5' />
							</div>
							<div className={st.labelField}>
								<label className="trattatello">Source</label>
								<SelectField initialValue='Hooman' options={sourceOptions} />
							</div>
						</div>
					</div>
					<div className={`${st.labelField} ${st.block}`} data-field="known_languages">
						<label className="trattatello">
							Known Languages
							<PurchasePointGroup count={2} columns={3} maxPurchases={3} purchased={0} clickCallback={() => { }} purchaseKey='1223' />
						</label>
						<SelectField initialValue='Language 1' options={languageOptions} onChange={characterUpdater('languages.0')} />
						<SelectField initialValue='Language 2' options={languageOptions} onChange={characterUpdater('languages.1')} />
						<SelectField initialValue='Language 3' options={languageOptions} onChange={characterUpdater('languages.2')} />
					</div>
					<div className={`${st.labelField} ${st.block}`} data-field="racial_bonuses">
						<label className="trattatello">Racial Modifiers</label>
						<SelectField initialValue={character.racial_mods.primary} options={racialBonusesPrimaryOptions} onChange={characterUpdater('racial_mods.primary')} />
						<SelectField initialValue={character.racial_mods.secondary} options={racialBonusesSecondaryOptions} onChange={characterUpdater('racial_mods.secondary')} />
						<SelectField initialValue={character.racial_mods.stature} options={racialBonusesStatureOptions} onChange={characterUpdater('racial_mods.stature')} />
					</div>
				</SectionBlock>
				<SectionBlock name="Wellness" icon={icoWellness} innerClassName={`${st.sectionWellness} ${st.gridLayout} ${st.autoGridLeft}`} sectionRefs={sectionRefs}>
					<div data-field="verve" className={st.block}>
						<h2>Verve <div className={st.maxLabel}>{character.baseVerve} + {character.vervePerPoint} / point.</div></h2>
						<div><PurchasePointGroup count={30} columns={15} purchased={3} clickCallback={() => console.log("Purchase Verve")} purchaseKey={'KEY NEEDED'} maxPurchases={6} /></div>
						<div className={st.resourceFields}>
							<TextField label="Current" initialValue={30} />
							<TextField label="Total" initialValue={30} />
							<TextField label="Bonus" initialValue={30} />
						</div>
					</div>
					<div data-field="mana" className={st.block}>
						<h2>Mana <div className={st.maxLabel}>{character.baseMana} + {character.manaPerPoint} / point.</div></h2>
						<div><PurchasePointGroup count={30} columns={15} purchased={3} clickCallback={() => console.log("Purchase Mana")} purchaseKey={'KEY NEEDED'} maxPurchases={6} /></div>
						<div className={st.resourceFields}>
							<TextField label="Current" initialValue={30} />
							<TextField label="Total" initialValue={30} />
							<TextField label="Bonus" initialValue={30} />
						</div>
					</div>
					<div data-field="psi" className={st.block}>
						<h2>Psi <div className={st.maxLabel}>{character.basePsi} + {character.psiPerPoint} / point.</div></h2>
						<div><PurchasePointGroup count={30} columns={15} purchased={3} clickCallback={() => console.log("Purchase Psi")} purchaseKey={'KEY NEEDED'} maxPurchases={6} /></div>
						<div className={st.resourceFields}>
							<TextField label="Current" initialValue={30} />
							<TextField label="Total" initialValue={30} />
							<TextField label="Bonus" initialValue={30} />
						</div>
					</div>
					<div data-field="statuses" className={st.block}>
						<h2>Statuses &amp; Buffs</h2>
						<TextField initialValue='' />
						<TextField initialValue='' />
						<TextField initialValue='' />
						<TextField initialValue='' />
						<TextField initialValue='' />
					</div>
					<div data-field="item_belt" className={st.block}>
						<h2>Item Belt</h2>
						<TextField label="Total Usables" initialValue='' />
						<TextField label="Total Throwables" initialValue='' />
					</div>
					<div data-field="skill_preparedness" className={st.block}>
						<SkillBlock skillCategory={movesByCategory.preparedness} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</div>
				</SectionBlock>
				<SectionBlock name="Combat and Defences" icon={icoCombat} innerClassName={st.sectionCombat} sectionRefs={sectionRefs} className={stcl.contentListParent}>
					<div className={`${st.combatMetaLayout} ${st.gridLayout}`}>
						<div data-field="weapons" className={st.block}>
							<h2><img src={icoCombat} alt="Combat" /> Weapons</h2>
							<div className={st.weaponFields}>
								<TextField label="Name" initialValue="Weapon Name" />
								<SelectField label="Damage" options={damageDiceOptions} initialValue="d6" />
								<TextField label="+ Raw" initialValue="0" />
								<TextField label="+ Dam" initialValue="0" />
								<TextField label="Effects" initialValue="Effects" />
								<TextField initialValue="Weapon Name" />
								<SelectField options={damageDiceOptions} initialValue="d6" />
								<TextField initialValue="0" />
								<TextField initialValue="0" />
								<TextField initialValue="Effects" />
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
							<h2>Weapon Specialisations <PurchasePointGroup count={3} columns={3} purchased={1} maxPurchases={3} purchaseKey='1234' clickCallback={() => { }} /></h2>
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
						<SkillBlock className={st.block} skillCategory={movesByCategory.defences} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
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
					<SkillBlock className={st.block} skillCategory={movesByCategory.magic_spellcraft} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.magic_cast} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.magic_enchanting} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
				</SectionBlock>
				<SectionBlock name="Psionics" icon={icoFist} innerClassName={`${st.sectionPsionics} ${st.gridLayout}`} sectionRefs={sectionRefs}>
					<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_kinetics} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_clair} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_telepath} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_metab} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					<SkillBlock className={st.block} skillCategory={movesByCategory.psionics_metapsi} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
				</SectionBlock>
				<SectionBlock name="Inventory" sectionRefs={sectionRefs} innerClassName={`${st.sectionInventory} ${st.gridLayout}`}>
					<TextareaField initialValue={character.inventory.item1} onChange={characterUpdater('inventory.item1')} />
					<TextareaField initialValue={character.inventory.item2} onChange={characterUpdater('inventory.item2')} />
					<TextareaField initialValue={character.inventory.item3} onChange={characterUpdater('inventory.item3')} />
				</SectionBlock>
				<SectionBlock name="Notes" sectionRefs={sectionRefs} innerClassName={`${st.sectionNotes} ${st.gridLayout}`}>
					<TextareaField initialValue={character.notes.item1} onChange={characterUpdater('notes.item1')} />
					<TextareaField initialValue={character.notes.item2} onChange={characterUpdater('notes.item2')} />
					<TextareaField initialValue={character.notes.item3} onChange={characterUpdater('notes.item3')} />
				</SectionBlock>
			</div>
		</div>
	)
}

export default CharacterSheetPage;
