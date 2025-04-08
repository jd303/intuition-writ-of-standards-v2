import st from './characterSheetPage.module.css';
import { useEffect, useState } from 'react';
import { UIColours } from "../../features/constants/UIColours";
import { useAppDispatch, useAppSelector } from "../../features/firebaseHooks";
import { setCharacterSheetSearch } from "../../features/search/searchSlice";
import ControlBar from "../components/controlBar/controlBar";
import SearchControl from "../components/controlBar/searchControl";
import SectionNav from "../components/controlBar/sectionNav";
import { useSectionNav } from "../components/controlBar/useSectionNav";
import { SectionBlock } from "../components/controlBar/sectionBlock";
import { CharacterModel } from '../../features/models/character/characterModel';
import TextField from '../components/inputs/inputField/TextField';
import SelectField from '../components/inputs/selectField/SelectField';
import { getAttributeIcon } from '../../features/models/character/attributeIcons';
import ConfirmButton from '../components/confirmButton/confirmButton';
import PurchasePointGroup from '../components/purchasePointGroup/purchasePointGroup';
import SkillBlock from '../components/moves/SkillBlock';

import icoDocument from '/public/images/icons/ico.document.svg';
import icoWellness from '/public/images/icons/ico.wellness.svg';
import icoCombat from '/public/images/icons/ico.combat.svg';

function CharacterSheetPage() {
	const dispatch = useAppDispatch();
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	const characterId = 'ffd1aeb4-a8eb-48c7-87fb-e4d6b02781aa';

	const [character, setCharacter] = useState<CharacterModel>(new CharacterModel());
	const charactersData = useAppSelector((state) => state.charactersData.characters);
	useEffect(() => {
		const characterData = charactersData.find((character) => character.id == characterId);
		if (characterData) setCharacter(new CharacterModel(characterData));
	}, [charactersData]);

	const movesByCategory = useAppSelector((state) => state.movesData.moves);

	const characterSheetSearch = useAppSelector((state) => state.search.characterSheetSearch);

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
												<SelectField options={[0, 1, 2, 3]} initialValue={character.attributes[attributeKey]} onChange={(value: number) => {/*updateCharacterAttribute(stat.short, value, true)*/ }} />
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
							<SelectField initialValue='Hooman' options={[]} />
						</div>
					</div>
					<div className={st.labelField} data-field="known_languages">
						<label className="trattatello">Known Languages</label>
						<SelectField initialValue='Language 1' options={[]} />
						<SelectField initialValue='Language 2' options={[]} />
						<SelectField initialValue='Language 3' options={[]} />
					</div>
					<div className={st.labelField} data-field="racial_modifiers">
						<label className="trattatello">Racial Modifiers</label>
						<SelectField initialValue='Mod 1' options={[]} />
						<SelectField initialValue='Mod 2' options={[]} />
						<SelectField initialValue='Mod 3' options={[]} />
					</div>
				</SectionBlock>
				<SectionBlock name="Wellness" icon={icoWellness} innerClassName={st.sectionPreparedness} sectionRefs={sectionRefs}>
					<div data-field="verve" className={st.block}>
						<h2>Verve</h2>
						<div className={st.maxLabel}>Max {character.baseVerve} + {character.vervePerPoint} / point.</div>
						<PurchasePointGroup count={30} columns={10} purchased={3} clickCallback={() => console.log("Purchase Verve")} purchaseKey={'KEY NEEDED'} maxPurchases={6} />
					</div>
					<div data-field="mana" className={st.block}>
						<h2>Mana</h2>
						<div className={st.maxLabel}>Max {character.baseVerve} + {character.vervePerPoint} / point.</div>
						<PurchasePointGroup count={30} columns={10} purchased={3} clickCallback={() => console.log("Purchase Mana")} purchaseKey={'KEY NEEDED'} maxPurchases={6} />
					</div>
					<div data-field="psi" className={st.block}>
						<h2>Psi</h2>
						<div className={st.maxLabel}>Max {character.baseVerve} + {character.vervePerPoint} / point.</div>
						<PurchasePointGroup count={30} columns={10} purchased={3} clickCallback={() => console.log("Purchase Psi")} purchaseKey={'KEY NEEDED'} maxPurchases={6} />
					</div>
					<div data-field="statuses" className={st.block}>
						<h2>Statuses</h2>
					</div>
					<div data-field="item_belt" className={st.block}>
						<h2>Item Belt</h2>
					</div>
					<div data-field="skill_preparedness" className={st.block}>
						<SkillBlock skillCategory={movesByCategory.preparedness} mode="default" searchFilter={characterSheetSearch} purchasedPoints={0} />
					</div>
				</SectionBlock>
				<SectionBlock name="Combat and Defences" icon={icoCombat} innerClassName={st.sectionCombat} sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="General Moves" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Social Moves" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Crafty Moves" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Beast Mastery" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Inner Power" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Magic" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Psionics" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Inventory" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
				<SectionBlock name="Notes" sectionRefs={sectionRefs}>
					<div>Section Works</div>
				</SectionBlock>
			</div>
		</div>
	)
}

export default CharacterSheetPage;
