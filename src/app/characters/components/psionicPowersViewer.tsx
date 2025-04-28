import { useMemo, useState } from 'react';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import SelectField from '../../components/inputs/selectField/SelectField';
import { useAppSelector } from '../../../features/firebaseHooks';

import icoSpiralPink from '/images/icons/ico.spiral.pink.svg';

function PsionicPowersViewer() {
	const { setAbilityModalVisible, setAbilityModalSource } = useCharacterContext(true);

	// Psionics Data
	const psionicPowers = useAppSelector((state) => state.psionicPowers.powers);
	const psionicPowersOptions = useMemo(() => psionicPowers.map((p) => { return { value: p.id, label: `${p.aptitude} - ${p.name}` } }), [psionicPowers]);
	const showAbilityModalPower = (powerId: string) => { setAbilityModalVisible(true); setAbilityModalSource(psionicPowers.find(p => p.id == powerId)); };
	const [selectedPsionicPower, setSelectedPsionicPower] = useState<string>();

	return (
		<>
			<BlockHeading label="Psionic Powers" icon={icoSpiralPink} />
			<SelectField options={psionicPowersOptions} initialValue={'Select'} defaultValue="Select" onChange={(value: string | number) => setSelectedPsionicPower(value as string)} />
			<button onClick={() => showAbilityModalPower(selectedPsionicPower!)}>View Power</button>
		</>
	)
}

export default PsionicPowersViewer;
