import st from './statusesComponent.module.css';
import BlockHeading from "../blockHeading";
import SelectField from '../../components/inputs/selectField/SelectField';
import { useAppSelector } from '../../../features/firebaseHooks';
import { useMemo } from 'react';
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoCircles from '/images/icons/ico.circles.svg';

function Statuses() {
	const { character, characterValueUpdater, updateCharacterValue } = useCharacterContext(true);
	
	// Statuses Data
	const statusesData = useAppSelector((state) => state.statusesData.statuses);
	const statusesOptions = useMemo(() => [{ value: '', label: 'Prefill from Statuses...' }, ...statusesData.map((st: Record<string, string>) => { return { value: `${st.negative && '🌩️' || '⭐'} ${st.name} - ${st.effect}`, label: `${st.negative && '🌩️' || '⭐'} ${st.name}` } })], [statusesData]);
	const activeStatuses = useMemo(() => [...character.statuses.map(status => status || ''), ''], [character]);

	return (
		<>
			<BlockHeading
				icon={icoCircles}
				label='Statuses & Buffs' />
			{activeStatuses.map((value, index) => (
				<div className={st.status} key={`buff-${index}`}>
					<TextField type="textarea" initialValue={value} onChange={characterValueUpdater(`statuses.${index}`)!} autosize={true} />
					<button onClick={() => updateCharacterValue(`statuses.${index}`, '')}>X</button>
				</div>
			))}
			<SelectField initialValue='Prefill' options={statusesOptions} onChange={characterValueUpdater(`statuses.${activeStatuses.length}`)!} />
		</>
	)
}

export default Statuses;
