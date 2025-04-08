import { useCallback, useState } from 'react';
import { MoveModel } from '../../../features/models/moveModel';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';

import icoDice from '../../../../public/images/icons/ico.dice.svg';
import st from './moveBlock.module.css';
import { prepareDescription } from '../../../features/prepareDescription';

function MoveBlock( { move, mode, skillPoints }: { move: MoveModel, mode: "default" | "display", skillPoints: number } ) {
	const [openState, setOpenState] = useState('closed');
	const toggleOpenState = () => setOpenState(openState == 'closed' ? 'open' : 'closed');

	const getMoveDescription = useCallback((moveDescription: string) => {
		return prepareDescription(moveDescription, { list: true, expertiseDisplay: true });
	}, []);

	// TEMP DATA
	const toggleRollPopup = (a: any, b: any) => {};

	return (
		<div className={[st.move, st[`mode-${mode}`], st[move.type], st[openState]].join(' ')}>
			<div className={`${st.titleBlock} trattatello`}>
				<div className={st.title + ' ' + (move.type == "Move" && st.moveCategory || '')} onClick={toggleOpenState}>{move.name} <span className={st.titleDetails}>({move.type})</span> <span className={`${st.triangle} ${st[openState]}`}></span></div>
			</div>
			{move.type == "Primary" ? <div className={st.diceRoll + ' notForPrint'}><button className={st.diceRoll} onClick={toggleRollPopup.bind(null, move.name, skillPoints)}>Roll <img src={icoDice} alt="Roll this Move" /></button></div> : <></>}
			<div className={st.description} dangerouslySetInnerHTML={{ __html: getMoveDescription(move.description) }}></div>
		</div>
	)
}

export default MoveBlock;