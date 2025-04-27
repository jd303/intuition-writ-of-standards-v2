import st from './armoursComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoArmour from '/images/icons/ico.armour.svg';

function Armours() {
	const { character, characterValueUpdater } = useCharacterContext(true);

	return (
		<div className={st.armourContainer}>
			<BlockHeading
				icon={icoArmour}
				label='Armour / Shields' />
			<div className={st.armourList}>
				<TextField className={st.name} label="Armour" initialValue={character.armour[0].name} onChange={characterValueUpdater('armour.0.name')!} />
				<TextField className={st.pres} label="PRes" type="number" initialValue={character.armour[0].pres} onChange={characterValueUpdater('armour.0.pres')!} />
				<TextField className={st.effects} label="Effects" initialValue={character.armour[0].effect} onChange={characterValueUpdater('armour.0.effect')!} />
				<TextField className={st.name} label="Armour 2" initialValue={character.armour[1].name} onChange={characterValueUpdater('armour.1.name')!} />
				<TextField className={st.pres} label="PRes" type="number" initialValue={character.armour[1].pres} onChange={characterValueUpdater('armour.1.pres')!} />
				<TextField className={st.effects} label="Effects" initialValue={character.armour[1].effect} onChange={characterValueUpdater('armour.1.effect')!} />
			</div>
		</div>
	)
}

export default Armours;
