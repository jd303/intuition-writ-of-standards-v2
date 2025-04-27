import st from './itemBeltComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';

import icoPotionBlack from '/images/icons/ico.potion.black.svg';

function ItemBelt() {
	const { character, characterValueUpdater } = useCharacterContext(true);

	return (
		<>
			<BlockHeading
				icon={icoPotionBlack}
				label='Item Belt' />
			<div className={st.beltValues}>
				<TextField label="Use" type="number" initialValue={2 + character.item_belt.bonus_usable} disabled={true} />
				<TextField label="+ Bonus" type="number" initialValue={character.item_belt.bonus_usable} onChange={characterValueUpdater('item_belt.bonus_usable')!} />
				<TextField label="Throw" type="number" initialValue={3 + character.item_belt.bonus_throwable} disabled={true} />
				<TextField label="+ Bonus" type="number" initialValue={character.item_belt.bonus_throwable} onChange={characterValueUpdater('item_belt.bonus_throwable')!} />
			</div>
		</>
	)
}

export default ItemBelt;
