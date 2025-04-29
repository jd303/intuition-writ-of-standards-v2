import st from './characterCompanionMoves.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';
import SheetBlock from '../characterSheetBlockComponent';
import { useAppSelector } from '../../../features/firebaseHooks';
import { useMemo } from 'react';
import SelectField from '../../components/inputs/selectField/SelectField';

import icoCombat from '/images/icons/ico.combat.svg';

function CharacterCompanionMoves() {
	const { character, characterValueUpdater } = useCharacterContext(true);

	// Companion Moves
	const companionBondId = 'cb7b1539';
	const companionMoves = useAppSelector(state => state.companionMovesData.companionMoves);
	const companionMoveBasicOptions = useMemo(() => companionMoves.filter(move => move.type == "basic").map((move) => { return { value: move.id as string, label: `${move.name}: ${move.desc}` } }), [companionMoves]);
	const companionMoveOptions = useMemo(() => companionMoves.filter(move => character.purchases.skills_and_expertises[companionBondId] >= 5 && ['advanced', 'standard'].includes(move.type as string) || move.type == "standard").map((move) => { return { value: move.id as string, label: `${move.name}: ${move.desc}` } }), [companionMoves]);

	return (
		<div className={st.beast_skill_and_moves}>
			{character.companion.id && (
				<SheetBlock layout="flex-column">
					<BlockHeading
						icon={icoCombat}
						label='Companion Moves' />
					{companionMoveBasicOptions.map((move, index) => (
						<TextField initialValue={move.label} disabled={true} key={`cm-${index}`} />
					))}
					{Array.from(Array(character.purchases.skills_and_expertises.f73a1fd2)).map((_, index) => (
						<SelectField options={companionMoveOptions} initialValue={character.companion.moves[index]} onChange={characterValueUpdater(`companion.moves.${index}`)} key={`cmnew-${index}`} />
					))}
				</SheetBlock>
			)}
		</div>
	);
}

export default CharacterCompanionMoves;
