import st from './armoursComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoArmour from '/images/icons/ico.armour.svg';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes';

function Armours({ mode }: { mode?: MoveDisplayMode }) {
	const { character, characterValueUpdater } = useCharacterContext(true);

	return (
		<div className={st.armourContainer} data-displaymode={mode}>
			<BlockHeading
				icon={icoArmour}
				label='Armour / Shields' />
			{character?.armour.map((armour, index: number) => (
				<div className={st.armourList} key={`armour-${index}`}>
					<TextField className={st.name} label="Armour" initialValue={armour.name} onChange={characterValueUpdater(`armour.${index}.name`)!} />
					<TextField className={st.pres} label="PRes" type="number" initialValue={armour.pres} onChange={characterValueUpdater(`armour.${index}.pres`)!} />
					<TextField className={st.effects} label="Effects" initialValue={armour.effect} onChange={characterValueUpdater(`armour.${index}.effect`)!} />
				</div>
			))}
		</div >
	)
}

export default Armours;
