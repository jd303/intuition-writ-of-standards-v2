import st from './characterCompanion.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';
import MenagerieSpecimenBlock from '../../components/beast/menagerieSpecimenBlock';
import SheetBlock from '../characterSheetBlockComponent';
import { useAppSelector } from '../../../features/firebaseHooks';
import { useMemo } from 'react';
import ConfirmButton from '../../components/confirmButton/confirmButton';
import SelectField from '../../components/inputs/selectField/SelectField';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes';

import icoBeast from '/images/icons/ico.bear.svg';

function CharacterCompanion({ mode }: { mode: MoveDisplayMode }) {
	const { character, characterValueUpdater, updateCharacterValue } = useCharacterContext(true);

	// Companion Data
	const companions = useAppSelector(state => state.menagerieData.menagerie);
	const companionsOptions = useMemo(() => [{ value: '', label: 'Please Choose...' }, ...companions.filter(menagerieSpecimen => menagerieSpecimen.companionable).map(companion => { return { value: companion.id, label: companion.name } })], [companions]);
	const companion = useMemo(() => {
		return companions.find(companion => companion.id == character.companion.id || '');
	}, [character.companion, companions]);

	return (
		<div className={st.companionLayout} data-mode={mode} data-hascompanion={companion != null}>
			<BlockHeading
				icon={icoBeast}
				label='Companion'
				addendum={companion && <ConfirmButton label="Remove" onClick={() => updateCharacterValue('companion.id', '')} />} />
			<div className={st.companionDetails}>
				{companion && (
					<>
						<MenagerieSpecimenBlock specimen={companion} viewMode="med" viewContext="companion" />
						<SheetBlock>
							<BlockHeading label="Current Verve" />
							<TextField initialValue={character.companion.current_verve} onChange={characterValueUpdater('companion.current_verve')!} type="number" />
						</SheetBlock>
						<SheetBlock>
							<BlockHeading label="Notes" />
							<TextField type="textarea" className={st.companionNotes} initialValue={character.companion.notes} onChange={characterValueUpdater('companion.notes')!} />
						</SheetBlock>
					</>
				) || <>
						<div><p>No companion chosen.</p></div>
						<div className={st.chooseCompanion}>
							<h2>Choose Companion</h2>
							<SelectField options={companionsOptions} initialValue={companionsOptions[0]?.value} onChange={characterValueUpdater('companion.id')!} />
						</div>
					</>}
			</div>
		</div>
	);
}

export default CharacterCompanion;
