import st from './resistancesListComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoMagic from '/images/icons/ico.magic.svg';

function ResistancesList() {
	const { character, characterValueUpdater } = useCharacterContext(true);

	return (
		<div className={st.resistancesListContainer}>
			<BlockHeading
				icon={icoMagic}
				label='Resistances' />
			<div className={st.resistanceList}>
				<TextField label="URes" initialValue={character.resistances.URes} onChange={characterValueUpdater('resistances.URes')!} />
				<TextField label="MRes" initialValue={character.resistances.MRes} onChange={characterValueUpdater('resistances.MRes')!} />
				<TextField label="PRes" initialValue={character.resistances.PRes} onChange={characterValueUpdater('resistances.PRes')!} />
				<TextField label="PyRes" initialValue={character.resistances.PyRes} onChange={characterValueUpdater('resistances.PyRes')!} />
				<TextField label="CryRes" initialValue={character.resistances.CryRes} onChange={characterValueUpdater('resistances.CryRes')!} />
				<TextField label="ElecRes" initialValue={character.resistances.ElecRes} onChange={characterValueUpdater('resistances.ElecRes')!} />
				<TextField label="ZephRes" initialValue={character.resistances.ZephRes} onChange={characterValueUpdater('resistances.ZephRes')!} />
				<TextField label="SonRes" initialValue={character.resistances.SonRes} onChange={characterValueUpdater('resistances.SonRes')!} />
				<TextField label="AcidRes" initialValue={character.resistances.AcidRes} onChange={characterValueUpdater('resistances.AcidRes')!} />
				<TextField label="UmbRes" initialValue={character.resistances.UmbRes} onChange={characterValueUpdater('resistances.UmbRes')!} />
				<TextField label="LumRes" initialValue={character.resistances.LumRes} onChange={characterValueUpdater('resistances.LumRes')!} />
			</div>
		</div>
	)
}

export default ResistancesList;
