import { useMemo } from 'react';
import st from './moveBlock.module.css';
import { MoveModel } from '../../../features/models/moveModel';
import { prepareDescription } from '../../../features/prepareDescription';
import TriangleNotch from '../triangleNotch/triangleNotch.tsx';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';
import { useToggleableBooleanState } from '../../../features/uiHooks.ts';

import icoDice from '../../../../public/images/icons/ico.dice.svg';
import icoMoveMove from '../../../../public/images/icons/ico.move.move.svg';
import icoMoveExpertise from '../../../../public/images/icons/ico.move.expertise.svg';
import icoMovePassive from '../../../../public/images/icons/ico.move.passive.svg';

function MoveBlock({ move, mode }: { move: MoveModel, mode: "default" | "display", skillPoints?: number, characterSkillPurchases?: Record<string, number> }) {
	const [isOpen, toggleIsOpen] = useToggleableBooleanState();

	const [moveDescription, moveIcon] = useMemo(() => {
		let icon;

		switch (move.type) {
			case "Expertise": icon = icoMoveExpertise; break;
			case "Passive": icon = icoMovePassive; break;
			default: icon = icoMoveMove;
		}
		return [prepareDescription(move.description, { list: true, expertiseDisplay: true }), icon];
	}, [move.description, move.type]);

	const skillPoints = 0;

	// TEMP DATA
	const toggleRollPopup = (a: any, b: any) => { };

	return (
		<div className={[st.move, st[`mode-${mode}`], st[move.type], (isOpen) && st.open || st.closed].join(' ')}>
			<div className={`${st.titleBlock} trattatello`}>
				<div className={st.title} onClick={toggleIsOpen}>
					<img className={st.icon} src={moveIcon} alt="Icon" /> {move.name}
				</div>
				{move.type == "Expertise" && <PurchasePointGroup count={6} columns={6} purchased={1} clickCallback={() => console.log('click purchase group')} maxPurchases={6} purchaseKey='1234' />}
				{move.type == "Passive" && <PurchasePointGroup count={1} columns={1} purchased={0} clickCallback={() => console.log('click purchase group')} maxPurchases={6} purchaseKey='1234' />}
			</div>
			<div className={st.description} dangerouslySetInnerHTML={{ __html: moveDescription }}></div>
			{move.type == "Primary" ? <div className={st.diceRoll + ' notForPrint'}><button className={st.diceRoll} onClick={toggleRollPopup.bind(null, move.name, skillPoints)}>Roll <img src={icoDice} alt="Roll this Move" /></button></div> : <></>}

			{move.expertises?.length && (
				<div className={st.expertises}>
					{move.expertises?.map((move, index) => (
						<MoveBlock key={index} move={move} mode={mode} />
					))}
				</div>)}
		</div>
	)
}

export default MoveBlock;