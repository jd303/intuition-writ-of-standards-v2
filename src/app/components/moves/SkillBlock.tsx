import st from './skillBlock.module.css';
import stcl from '../../components/contentList/contentList.module.css';
import { useMemo } from 'react';
import { MoveModel } from '../../../features/models/moveModel';
import MoveBlock from './MoveBlock.tsx';
import { MovesCategorisation } from '../../../features/firebase/data/prepareMoves.ts';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';
import TriangleNotch from '../triangleNotch/triangleNotch.tsx';
import { useToggleableBooleanState } from '../../../features/uiHooks.ts';
import { usePurchaseMode } from '../../characters/purchaseModeContext.tsx';

function SkillBlock({ skillCategory, mode, purchasedPoints, className }: { skillCategory: MovesCategorisation, mode: "default" | "display", purchasedPoints: number, className?: string }) {
	const { characterPurchaseUpdater, characterPurchases, characterRacialBonuses, characterSheetSearch, maxMovePoints, characterStatValues } = usePurchaseMode();
	const [isOpen, toggleisOpen] = useToggleableBooleanState();

	const [skillEmpty, filteredMoves, filteredPassives] = useMemo(() => {
		if (!skillCategory) return [false, [], []];
		const skillEmpty = JSON.stringify(skillCategory.skill).toLowerCase().includes(characterSheetSearch.toLowerCase());
		const filteredMoves = skillCategory.moves.filter((move: MoveModel) => JSON.stringify(move).toLowerCase().includes(characterSheetSearch.toLowerCase()));
		const filteredPassives = skillCategory.passives.filter((passive: MoveModel) => JSON.stringify(passive).toLowerCase().includes(characterSheetSearch.toLowerCase()));

		return [!skillEmpty && !filteredMoves.length && !filteredPassives.length, filteredMoves, filteredPassives];
	}, [characterSheetSearch, skillCategory]);

	const maxSkillPurchases = useMemo(() => {
		const skillStat = skillCategory?.skill?.stat || '';
		let characterStatValue = 0;
		[...skillStat.split(',')].forEach(stat => characterStatValue = Math.max(characterStatValue, characterStatValues[stat.trim()]));
		const jackOfAllTradesBonus = characterRacialBonuses.secondary == '9dee48d6' && 1 || 0;
		return Math.min(12, maxMovePoints + characterStatValue + jackOfAllTradesBonus);
	}, [characterStatValues, maxMovePoints]);

	if (!skillEmpty) return (
		<div className={`${st.skillBlock} ${className}`} data-open={isOpen}>
			<div className={st.heading} onClick={toggleisOpen}>
				<div className={`${st.title} trattatello textHoverEffect`}>
					<div className={st.name}><TriangleNotch isOpen={isOpen} type="plus" /> {skillCategory?.skill?.name}</div>
					<PurchasePointGroup count={12} columns={12} purchased={characterPurchases.skills_and_expertises[skillCategory?.skill!.id] || 0} purchaseCallback={characterPurchaseUpdater(skillCategory?.skill!.id, true)} maxPurchases={maxSkillPurchases} />
				</div>
				<div className={st.description}><span className="trattatello">({skillCategory?.skill?.stat})</span> {skillCategory?.skill?.description}</div>
			</div>
			<div className={[st.movesList, stcl.contentListParent].join(' ')}>
				{filteredMoves.map((move: MoveModel) => (
					<div className={stcl.removeParentWhenEmpty} key={move.id}>
						<MoveBlock move={move} mode={mode} />
					</div>
				))}
			</div>
			<div className={[st.passivesContainer, stcl.contentListParent].join(' ')}>
				<div className={[st.passivesList, stcl.removeParentWhenEmpty].join(' ')}>
					{filteredPassives.map((move) => (
						<MoveBlock key={move.id} move={move} mode="display" skillPoints={purchasedPoints} />
					))}
				</div>
			</div>
		</div>
	)
}

export default SkillBlock;