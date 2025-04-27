import st from './resourceComponent.module.css';
import stresources from './resourcesShared.module.css';
import { useMemo } from 'react';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import PurchasePointGroup from '../../components/purchasePointGroup/purchasePointGroup';
import TextField from '../../components/inputs/textField/TextField';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes';

import icoHeart from '/images/icons/ico.heartbeat.scarlet.svg';
import icoBrainPurple from '/images/icons/ico.brain.purple.svg';
import icoMagicPurple from '/images/icons/ico.magic.purple.svg';

function ResourceComponent({ type, mode }: { type: "mana" | "verve" | "psi", mode: MoveDisplayMode }) {
	const { character, characterPurchaseUpdater, characterValueUpdater, maxSkillPoints } = useCharacterContext(true);

	const resourceDetails = useMemo(() => {
		switch (type) {
			case "verve":
				return {
					label: 'Verve',
					icon: icoHeart,
					currentResource: character.verve.current,
					bonusResource: character.verve.bonus,
					totalResource: character.baseVerve + character.verve.bonus + character.purchases.verve * character.vervePerPoint,
					purchaseString: 'verve',
					purchased: character.purchases.verve
				}
			case "mana":
				return {
					label: 'Mana',
					icon: icoMagicPurple,
					currentResource: character.mana.current,
					bonusResource: character.mana.bonus,
					totalResource: character.baseMana + character.mana.bonus + character.purchases.mana * character.manaPerPoint,
					purchaseString: 'mana',
					purchased: character.purchases.mana
				}
			case "psi":
				return {
					label: 'Psi',
					icon: icoBrainPurple,
					currentResource: character.psi.current,
					bonusResource: character.psi.bonus,
					totalResource: character.basePsi + character.psi.bonus + character.purchases.psi * character.psiPerPoint,
					purchaseString: 'psi',
					purchased: character.purchases.psi
				}
			default:
				return {
					label: '',
					currentResource: 0,
					bonusResource: 0,
					totalResource: 0,
					purchaseString: 'loading',
					purchased: 0
				}
		}
	}, [type, character]);

	return (
		<div className={st.resourceContainer}>
			<div className={st.resourceMeta}>
				<BlockHeading
					icon={resourceDetails.icon}
					label={resourceDetails.label}
					addendum={<div className={stresources.maxLabel}>{character.baseVerve} + {character.vervePerPoint} / point.</div>} />
				{mode != MoveDisplayMode.display && (<div><PurchasePointGroup count={30} columns={15} purchased={resourceDetails.purchased} purchaseCallback={characterPurchaseUpdater(resourceDetails.purchaseString)!} maxPurchases={5 + maxSkillPoints * 2} /></div>)}
			</div>
			<div className={stresources.resourceFields}>
				<TextField label="Current" type="number" initialValue={resourceDetails.currentResource} onChange={characterValueUpdater(`${resourceDetails.purchaseString}.current`)!} className={(resourceDetails.currentResource > resourceDetails.totalResource) ? st.overResourced : ''} />
				<TextField label="Bonus" type="number" initialValue={resourceDetails.bonusResource} onChange={characterValueUpdater(`${resourceDetails.purchaseString}.bonus`)!} />
				<TextField label="Total" type="number" initialValue={resourceDetails.totalResource} disabled={true} />
			</div>
		</div>
	)
}

export default ResourceComponent;
