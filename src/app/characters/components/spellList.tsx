import st from './spellList.module.css';
import { useMemo } from 'react';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';
import SelectField from '../../components/inputs/selectField/SelectField';
import { useAppSelector } from '../../../features/firebaseHooks';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes';

import icoMagic from '/images/icons/ico.magic.svg';

function SpellList({ mode }: { mode: MoveDisplayMode }) {
	const { character, characterValueUpdater, updateCharacterValue, setAbilityModalVisible, setAbilityModalSource } = useCharacterContext(true);

	const spellcraftID = '797d1feb';
	const spellsData = useAppSelector((state) => state.magicSpells.spells);
	const spellsOptions = useMemo(() => [{ value: '', label: 'Select a spell' }, ...spellsData.filter(spell => spell.level <= Math.max(1, (character.purchases.skills_and_expertises[spellcraftID] / 2)) && spell.sources.includes(character.vitae.source)).map(spell => { return { value: spell.id, label: `${spell.easyname} - ${spell.name}` } })], [spellsData, character.purchases.skills_and_expertises, character.vitae.source]);
	const characterSpells = useMemo(() => spellsData.filter(spell => character.spells.includes(spell.id)), [spellsData, character.spells]);
	const showAbilityModalSpell = (spellId: string) => { setAbilityModalVisible(true); setAbilityModalSource(characterSpells.find(spell => spell.id == spellId)); };

	return (
		<div data-mode={mode} className={st.container}>
			<BlockHeading icon={icoMagic} label='Spells' />
			<div className={st.spells}>
				{
					Array.from(Array(character.purchases.skills_and_expertises[spellcraftID] * 2)).map((_, index) => (
						<div className={st.spellBlock} key={`spell-${index}`}>
							{character.spells[index] ? (
								<>
									<TextField initialValue={characterSpells.find(charSpell => charSpell.id == character.spells[index])?.name || ''} disabled={true} />
									<button onClick={() => showAbilityModalSpell(character.spells[index])}>Info</button>
									<button onClick={() => updateCharacterValue(`spells.${index}`, '')} className={st.removeSpellButton}>X</button>
								</>
							) : (
								<SelectField options={spellsOptions} initialValue={character.spells[index]} onChange={characterValueUpdater(`spells.${index}`)!} />
							)}
						</div>
					))
				}
			</div>
		</div>
	)
}

export default SpellList;
