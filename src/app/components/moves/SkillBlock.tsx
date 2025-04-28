import st from './skillBlock.module.css';
import stcl from '../../components/contentList/contentList.module.css';
import { useMemo } from 'react';
import { MoveModel } from '../../../features/models/moveModel';
import MoveBlock from './MoveBlock.tsx';
import { MovesCategorisation } from '../../../features/firebase/data/prepareMoves.ts';
import PurchasePointGroup from '../purchasePointGroup/purchasePointGroup.tsx';
import { useToggleableBooleanState } from '../../../features/uiHooks.ts';
import { useCharacterContext } from '../../characters/characterContext.tsx';
import { MoveDisplayMode } from '../../../features/models/moveDisplayModes.ts';

function SkillBlock({ skillCategory, mode, className }: { skillCategory: MovesCategorisation, mode: MoveDisplayMode, className?: string }) {
	const { characterPurchaseUpdater, character, characterSheetSearch, maxSkillPoints } = useCharacterContext();
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
		[...skillStat.split(',')].forEach(stat => characterStatValue = Math.max(characterStatValue, character.attributes[stat.trim()]));
		return Math.min(12, maxSkillPoints + characterStatValue);
	}, [character, maxSkillPoints, skillCategory]);

	const purchasedSkillPoints = useMemo(() => {
		if (character.purchases.skills_and_expertises) {
			return character.purchases.skills_and_expertises[skillCategory?.skill!.id] || 0;
		} else {
			return 0;
		}
	}, [character, skillCategory]);

	if (!skillEmpty) return (
		<div className={`${st.skillBlock} ${className}`} data-open={isOpen} data-mode={mode} data-type="Skill" data-purchases={character?.purchases?.skills_and_expertises[skillCategory?.skill?.id || ''] > 0}>
			<div className={st.heading} onClick={toggleisOpen}>
				<div className={`${st.title} trattatello`}>
					<div className={st.name}>{skillCategory?.skill?.name}</div>
					{mode == MoveDisplayMode.default && <PurchasePointGroup count={12} columns={12} purchased={purchasedSkillPoints} purchaseCallback={characterPurchaseUpdater(skillCategory?.skill!.id, true)!} maxPurchases={maxSkillPurchases} />}
					{mode == MoveDisplayMode.combat && <span className={st.purchasedPointsLabel}>{purchasedSkillPoints}</span>}
				</div>
				<div className={st.description}><span className="trattatello">({skillCategory?.skill?.stat})</span> {skillCategory?.skill?.description}</div>
			</div>
			<div className={[st.movesList, stcl.contentListParent].join(' ')}>
				{filteredMoves.map((move: MoveModel) => (
					<div className={stcl.removeParentWhenEmpty} key={move.id}>
						<MoveBlock move={move} mode={mode} parentSkillPoints={purchasedSkillPoints} />
					</div>
				))}
			</div>
			<div className={[st.passivesContainer, stcl.contentListParent].join(' ')}>
				<div className={[st.passivesList, stcl.removeParentWhenEmpty].join(' ')}>
					{filteredPassives.map((move) => (
						<MoveBlock key={move.id} move={move} mode={mode} parentSkillPoints={purchasedSkillPoints} />
					))}
				</div>
			</div>
		</div>
	)
}

export default SkillBlock;