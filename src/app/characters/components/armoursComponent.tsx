import st from './armoursComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoArmour from '/images/icons/ico.armour.svg';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes';

function Armours({ mode }: { mode?: MoveDisplayMode }) {
	const { character, characterValueUpdater, updateCharacterValue } = useCharacterContext(true);

	const addArmour = () => {
		updateCharacterValue(`armour.${character.armour.length}`, { name: "Armour", pres: 0, effect: '' });
	}

	return (
		<div className={st.armourContainer} data-displaymode={mode}>
			<BlockHeading
				icon={icoArmour}
				label='Armour / Shields'
				addendum={<button className={st.addArmourButton} onClick={addArmour}>+ Armour</button>} />
			{character?.armour.map((armour, index: number) => (
				<div className={st.armourList} key={`armour-${index}`}>
					<TextField className={st.name} label="Armour" initialValue={armour.name} onChange={characterValueUpdater(`armour.${index}.name`)!} />
					<TextField className={st.pres} label="PRes" type="number" initialValue={armour.pres} onChange={characterValueUpdater(`armour.${index}.pres`)!} />
					<div className={st.effects}>
						<TextField label="Effects" initialValue={armour.effect} onChange={characterValueUpdater(`armour.${index}.effect`)!} />
						<button className={st.removeArmourButton} onClick={() => updateCharacterValue(`armour.${index}`, '')}>X</button>
					</div>
				</div>
			))}
		</div >
	)
}

export default Armours;
