import st from './synergiesComponent.module.css';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import PurchasePointGroup from '../../components/purchasePointGroup/purchasePointGroup';
import SelectField from '../../components/inputs/selectField/SelectField';
import { useAppSelector } from '../../../features/firebaseHooks';
import { useMemo } from 'react';

import icoMagicBlue from '/images/icons/ico.magic.blue.svg';

function Synergies() {
	const { character, characterValueUpdater, characterPurchaseUpdater, setAbilityModalVisible, setAbilityModalSource } = useCharacterContext(true);
	const synergies = useAppSelector((state) => state.synergies.synergies);
	const synergiesOptions = useMemo(() => synergies.map(syn => { return { value: syn.id, label: `${syn.name}: ${syn.effect}` } }), [synergies]);

	const showAbilityModalSynergy = (synergyId: string) => { setAbilityModalVisible(true); setAbilityModalSource(synergies.find(synergy => synergy.id == synergyId)); };

	return (
		<>
			<BlockHeading
				icon={icoMagicBlue}
				label='Synergies'
				addendum={<PurchasePointGroup count={2} columns={3} purchased={character.purchases.magical_synergy} maxPurchases={2} purchaseCallback={characterPurchaseUpdater('magical_synergy')!} />} />
			{
				Array.from(Array(character.purchases.magical_synergy + 1)).map((_, index) => (
					<div className={st.synergy}>
						<SelectField options={synergiesOptions} initialValue={character.magical_synergies[index]} onChange={characterValueUpdater(`magical_synergies.${index}`)!} key={`syn-${index}`} />
						<button onClick={() => showAbilityModalSynergy(character.magical_synergies[index])}>Info</button>
					</div>
				))
			}
		</>
	)
}

export default Synergies;
