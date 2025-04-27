import st from './weaponsComponent.module.css';
import { useMemo } from 'react';
import BlockHeading from "../blockHeading";
import { useCharacterContext } from '../characterContext';
import TextField from '../../components/inputs/textField/TextField';
import SelectField from '../../components/inputs/selectField/SelectField';
import { DamageDiceOptions, ThreatRangeOptions } from '../../../features/dataStatic/damageDice';
import { WeaponDefinition } from '../../../features/models/character/characterModel';
import PurchasePointGroup from '../../components/purchasePointGroup/purchasePointGroup';
import { useAppSelector } from '../../../features/firebaseHooks';

import icoCombat from '/images/icons/ico.combat.svg';
import icoShuriken from '/images/icons/ico.shuriken.svg';

function Weapons() {
	const { character, characterValueUpdater, updateCharacterValue, characterPurchaseUpdater } = useCharacterContext(true);
	const damageDiceOptions = useMemo(() => { return DamageDiceOptions.map((dd) => { return { value: dd, label: dd } }); }, []);
	const threatRangeOptions = useMemo(() => { return ThreatRangeOptions.map((dd) => { return { value: dd, label: dd } }); }, []);

	// Weapon Specialisation
	const weaponSpecialisationsData = useAppSelector((state) => state.weaponSpecialisations.weaponSpecialisations);
	const weaponSpecialisations = useMemo(() => {
		return weaponSpecialisationsData.map((ws) => { return { value: ws.id, label: `${ws.name} - ${ws.description}` } });
	}, [weaponSpecialisationsData]);

	const addWeapon = () => {
		updateCharacterValue(`weapons.${character.weapons.length}`, { name: "Weapon", damageDice: "d4", bonus_damage: 0, special: '', threat_range: 1 });
	}

	return (
		<div className={st.weaponsContainer}>
			<BlockHeading
				icon={icoCombat}
				label='Weapons'
				addendum={<button className={st.addWeaponButton} onClick={addWeapon}>+ Weapon</button>}
			/>
			<div className={st.weaponFields}>
				{character?.weapons.map((weapon: WeaponDefinition, index: number) => (
					<div className={st.weapon} key={`weapon-${index}`}>
						<TextField label="Weapon" initialValue={weapon.name} onChange={characterValueUpdater(`weapons.${index}.name`)!} />
						<SelectField label="Damage" options={damageDiceOptions} initialValue={weapon.damageDice || damageDiceOptions[0].value} onChange={characterValueUpdater(`weapons.${index}.damageDice`)!} />
						<TextField label="+ Dam" type="number" initialValue={weapon.bonus_damage} onChange={characterValueUpdater(`weapons.${index}.bonus_damage`)!} />
						<SelectField label="Rnge" options={threatRangeOptions} initialValue={weapon.threat_range || threatRangeOptions[0].value} onChange={characterValueUpdater(`weapons.${index}.threat_range`)!} />
						<div className={st.effects}>
							<TextField label="Effects" initialValue={weapon.special} onChange={characterValueUpdater(`weapons.${index}.special`)!} />
							<button onClick={() => updateCharacterValue(`weapons.${index}`, '')}>X</button>
						</div>
					</div>
				))}
			</div>

			<BlockHeading
				icon={icoShuriken}
				label='Specialisations'
				addendum={<PurchasePointGroup count={3} columns={3} purchased={character.purchases.weapon_specialisations} maxPurchases={3} purchaseCallback={characterPurchaseUpdater('weapon_specialisations')!} />} />
			<div className={st.weaponSpecialisations}>
				{Array.from(Array(character.purchases.weapon_specialisations)).map((_, index) => (
					<SelectField options={weaponSpecialisations} initialValue={character.weapon_specialisations[index]} onChange={characterValueUpdater(`weapon_specialisations.${index}`)!} key={`wsp-${index}`} />
				))}
			</div>
		</div>
	)
}

export default Weapons;
