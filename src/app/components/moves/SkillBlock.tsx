import st from './skillBlock.module.css';
import stcl from '../../components/contentList/contentList.module.css';
import { useCallback } from 'react';
import { MoveModel } from '../../../features/models/moveModel';
import MoveBlock from './MoveBlock.tsx';
import { MovesCategorisation } from '../../../features/firebase/data/prepareMoves.ts';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';

function SkillBlock({ skillCategory, mode, searchFilter, purchasedPoints }: { skillCategory: MovesCategorisation, mode: "default" | "display", searchFilter: string, purchasedPoints: number }) {

	const filteredMoves = useCallback(() => {
		return skillCategory?.moves.filter((move: MoveModel) => JSON.stringify(move).toLowerCase().includes(searchFilter.toLowerCase()));
	}, [searchFilter, skillCategory?.moves]);

	const filteredExpertises = useCallback((moves: MoveModel[]) => {
		return moves.filter((move) => JSON.stringify(move).toLowerCase().includes(searchFilter.toLowerCase()));
	}, [searchFilter]);

	const filteredPassives = useCallback(() => {
		return skillCategory?.passives.filter((item) => ((item.name as string).toLowerCase() + (item.description as string).toLowerCase()).includes(searchFilter.toLowerCase()));
	}, [searchFilter, skillCategory?.passives]);

	return (
		<div className={st.skillBlock}>
			<div className={st.heading}>
				<div className={`${st.title} trattatello`}>{skillCategory?.skill.name} <PurchasePointGroup count={12} columns={12} purchased={1} clickCallback={() => console.log('click purchase group')} maxPurchases={12} purchaseKey='1234' /></div>
				<div>{skillCategory?.skill.description}</div>
			</div>
			{filteredMoves()?.map((move: MoveModel, index: number) => (
				<div className={st.moveContainer} key={`${move.name.replace(/ /g, '_')}-${index}`}>
					<MoveBlock move={move} mode={mode} skillPoints={purchasedPoints} />
					<div className={st.expertises}>
						{filteredExpertises(move.expertises || []).map((move, index) => (
							<MoveBlock key={index} move={move} mode={mode} skillPoints={purchasedPoints} />
						))}
					</div>
				</div>
			))}
			<div className={[st.passivesContainer, stcl.contentListParent].join(' ')}>
				<div className={[st.passivesList, stcl.removeParentWhenEmpty].join(' ')}>
					{filteredPassives()?.map((move, index) => (
						<MoveBlock key={`${move.name.replace(/ /g, '_')}-${index}`} move={move} mode="display" skillPoints={purchasedPoints} />
					))}
				</div>
			</div>
		</div>
	)
}

export default SkillBlock;