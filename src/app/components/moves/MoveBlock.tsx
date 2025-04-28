import { useMemo } from 'react';
import st from './moveBlock.module.css';
import { MoveModel } from '../../../features/models/moveModel';
import { prepareDescription } from '../../../features/prepareDescription';
import { useCharacterContext } from '../../characters/characterContext.tsx';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';
import { useToggleableBooleanState } from '../../../features/uiHooks.ts';

import icoDice from '/images/icons/ico.dice.svg';
import icoMovePrimary from '/images/icons/ico.move.primary.svg';
import icoMoveQuick from '/images/icons/ico.move.quick.svg';
import icoMoveReaction from '/images/icons/ico.move.reaction.svg';
import icoMoveFree from '/images/icons/ico.move.free.svg';
import icoMoveExpertise from '/images/icons/ico.move.expertise.svg';
import icoMovePassive from '/images/icons/ico.move.passive.svg';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes.ts';

function MoveBlock({ move, mode, parentSkillPoints = 0 }: { move: MoveModel, mode: MoveDisplayMode, parentSkillPoints?: number }) {
	let { characterPurchaseUpdater } = useCharacterContext(mode != MoveDisplayMode.default);
	if (!characterPurchaseUpdater) characterPurchaseUpdater = () => { };
	const { character } = useCharacterContext(mode != MoveDisplayMode.default);
	const [isOpen, toggleIsOpen] = useToggleableBooleanState();

	const [moveDescription, moveIcon] = useMemo(() => {
		let icon;

		switch (move.type) {
			case "Expertise": icon = icoMoveExpertise; break;
			case "Passive": icon = icoMovePassive; break;
			default:
				if (move.type == "Primary") icon = icoMovePrimary;
				else if (move.type == "Quick") icon = icoMoveQuick;
				else if (move.type == "Reaction") icon = icoMoveReaction;
				else if (move.type == "Free") icon = icoMoveFree;
		}
		return [prepareDescription(move.description, { list: true, expertiseDisplay: move.type == "Expertise", purchasedPoints: character?.purchases?.skills_and_expertises[move.id] || 0 }, st.expertiseUpcoming), icon];
	}, [move, character?.purchases?.skills_and_expertises]);

	// TEMP DATA
	const toggleRollPopup = (name: string, bonus: number) => { console.log("ROLL POPUP", name, bonus); };

	return (
		<div className={[st.move, st[`mode-${mode}`], (isOpen) && st.open || st.closed].join(' ')} data-mode={mode} data-type={move.type} data-purchases={character?.purchases?.skills_and_expertises[move.id] > 0}>
			<div className={`${st.titleBlock} trattatello`}>
				<div className={st.title} onClick={toggleIsOpen}>
					<img className={st.icon} src={moveIcon} alt="Icon" /> {move.name} {mode == MoveDisplayMode.combat && move.type != "Primary" && <span className={st.purchasedPointsLabel}>{character?.purchases?.skills_and_expertises[move.id] || 0}</span>}
				</div>
				{move.type == "Expertise" && mode == MoveDisplayMode.default && <PurchasePointGroup count={6} columns={6} purchased={character?.purchases?.skills_and_expertises[move.id] || 0} purchaseCallback={characterPurchaseUpdater(move.id, true)!} maxPurchases={parentSkillPoints} />}
				{move.type == "Passive" && mode == MoveDisplayMode.default && <PurchasePointGroup count={1} columns={1} purchased={character?.purchases?.skills_and_expertises[move.id] || 0} purchaseCallback={characterPurchaseUpdater(move.id, true)!} maxPurchases={1} />}
			</div>
			<div className={st.description} dangerouslySetInnerHTML={{ __html: moveDescription }}></div>
			{move.type == "Primary" ? <div className={st.diceRoll}><button className={st.diceRoll} onClick={toggleRollPopup.bind(null, move.name, character?.purchases?.skills_and_expertises[move.id])}>Roll <img src={icoDice} alt="Roll this Move" /></button></div> : <></>}

			{move.expertises?.length && (
				<div className={st.expertises}>
					{move.expertises?.map((expertise, index) => (
						<MoveBlock key={index} move={expertise} mode={mode} parentSkillPoints={parentSkillPoints} />
					))}
				</div>)}
		</div>
	)
}

export default MoveBlock;