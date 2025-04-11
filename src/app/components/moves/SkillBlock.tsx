import st from './skillBlock.module.css';
import stcl from '../../components/contentList/contentList.module.css';
import { useMemo } from 'react';
import { MoveModel } from '../../../features/models/moveModel';
import MoveBlock from './MoveBlock.tsx';
import { MovesCategorisation } from '../../../features/firebase/data/prepareMoves.ts';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';
import TriangleNotch from '../triangleNotch/triangleNotch.tsx';
import { useToggleableBooleanState } from '../../../features/uiHooks.ts';

function SkillBlock({ skillCategory, mode, searchFilter, purchasedPoints, className }: { skillCategory: MovesCategorisation, mode: "default" | "display", searchFilter: string, purchasedPoints: number, className?: string }) {
	const [isOpen, toggleisOpen] = useToggleableBooleanState();

	const [skillEmpty, filteredMoves, filteredPassives] = useMemo(() => {
		if (!skillCategory) return [false, [], []];
		const skillEmpty = JSON.stringify(skillCategory.skill).toLowerCase().includes(searchFilter.toLowerCase());
		const filteredMoves = skillCategory.moves.filter((move: MoveModel) => JSON.stringify(move).toLowerCase().includes(searchFilter.toLowerCase()));
		const filteredPassives = skillCategory.passives.filter((passive: MoveModel) => JSON.stringify(passive).toLowerCase().includes(searchFilter.toLowerCase()));

		return [!skillEmpty && !filteredMoves.length && !filteredPassives.length, filteredMoves, filteredPassives];
	}, [searchFilter, skillCategory]);

	if (!skillEmpty) return (
		<div className={`${st.skillBlock} ${className}`} data-open={isOpen}>
			<div className={st.heading} onClick={toggleisOpen}>
				<div className={`${st.title} trattatello textHoverEffect`}>
					<div className={st.name}><TriangleNotch isOpen={isOpen} type="plus" /> {skillCategory?.skill?.name}</div>
					<PurchasePointGroup count={12} columns={12} purchased={1} clickCallback={() => console.log('click purchase group')} maxPurchases={12} purchaseKey='1234' />
				</div>
				<div className={st.description}>{skillCategory?.skill?.description}</div>
			</div>
			<div className={st.movesList}>
				{filteredMoves.map((move: MoveModel) => (
					<MoveBlock move={move} mode={mode} key={move.id} />
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