import { useCallback, useState } from 'react';
import { Move as MoveModel } from '../../../features/models/moveModel';
import PurchaseablePointGroup from '../purchaseablePointGroup/purchaseablePointGroup';

import icoDice from '../../../../public/images/icons/ico.dice.svg';
import st from './moveBlock.module.css';
import { prepareDescription } from '../../../features/prepareDescription';

function MoveBlock( { move, mode }: { move: MoveModel, mode: "default" | "display" } ) {
	const [openState, setOpenState] = useState('closed');
	const toggleOpenState = () => setOpenState(openState == 'closed' ? 'open' : 'closed');

	const getMoveDescription = useCallback((moveDescription: string) => {
		return prepareDescription(moveDescription, { list: true, expertiseDisplay: true });
	}, []);

	// TEMP data
	const purchaseDetails = { points: 1 };
	const clickCallback = () => {}
	const maxPurchases = 10;
	const toggleRollPopup = (a: any, b: any) => {};

	return (
		<div className={[st.move, st[`mode-${mode}`], st[move.type], st[openState]].join(' ')}>
			<div className={st.titleBlock}>
				<div className={st.title + ' ' + (move.type == "Move" && st.moveCategory || '')} onClick={toggleOpenState}>{move.name} <span className={st.titleDetails}>({move.type})</span> <span className={`${st.triangle} ${st[openState]}`}></span></div>
				<div className={st.pointTrack}><PurchaseablePointGroup count={12} columns={12} purchased={purchaseDetails?.points || 0} clickCallback={clickCallback} purchaseKey={`move.${move.id}`} maxPurchases={maxPurchases} /></div>
				<div className={st.bonuses + ' forPrint'}><input defaultValue={`+${purchaseDetails?.points}`} /></div>
				{move.type == "Primary" ? <div className={st.buttons + ' notForPrint'}><button className={st.diceRoll} onClick={toggleRollPopup.bind(null, move.name, purchaseDetails?.points)}><img src={icoDice} alt="Roll this Move" /></button></div> : <></>}
			</div>
			<div className={st.description} dangerouslySetInnerHTML={{ __html: getMoveDescription(move.description) }}></div>
		</div>
	)
}

export default MoveBlock;