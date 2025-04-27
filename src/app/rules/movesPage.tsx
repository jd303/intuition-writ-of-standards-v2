import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setMovesSearch } from '../../features/search/searchSlice';
import { UIColours } from '../../features/constants/UIColours';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import SectionNav from '../components/controlBar/sectionNav';
import MoveBlock from '../components/moves/MoveBlock';
import st from './movesPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import ContentCard from '../components/contentList/contentCard';
import { MoveDisplayMode } from '../../features/models/moveDisplayModes';
import { SectionBlock } from '../components/controlBar/sectionBlock';
import { useSectionNav } from '../components/controlBar/useSectionNav';

export default function MovesPage() {
	const dispatch = useAppDispatch();
	const [sectionRefs, sectionDefinitions] = useSectionNav();
	const movesSearch = useAppSelector((state) => state.search.movesSearch);
	const movesByCategory = useAppSelector((state) => state.movesData.moves);

	const filteredMoves = useCallback((categoryKey: string) => {
		return movesByCategory[categoryKey].moves.filter((move) => JSON.stringify(move).toLowerCase().includes(movesSearch.toLowerCase()));
	}, [movesSearch, movesByCategory]);

	/*const filteredExpertises = useCallback((moves: MoveModel[]) => {
		return moves.filter((move) => JSON.stringify(move).toLowerCase().includes(movesSearch.toLowerCase()));
	}, [movesSearch]);*/

	const filteredPassives = useCallback((categoryKey: string) => {
		return movesByCategory[categoryKey].passives.filter((item) => ((item.name as string).toLowerCase() + (item.description as string).toLowerCase()).includes(movesSearch.toLowerCase()));
	}, [movesSearch, movesByCategory]);

	return (
		<ContentPageContainer>
			<ContentList colour={UIColours.orange} style="list" className={st.contentList}>
				<ControlBar colour={UIColours.orange} className={st.controlBar}>
					<SectionNav label="Section" sections={sectionDefinitions} />
					<SearchControl name="Search" initialValue={movesSearch} onChange={(value: string) => dispatch(setMovesSearch(value))}></SearchControl>
				</ControlBar>
				{Object.keys(movesByCategory).map((category) => (
					<SectionBlock className={[st.categoryParent, stcl.contentListParent].join(' ')} key={`category-${category}`} name={`${category} (${movesByCategory[category].moves[0].stat})`} sectionRefs={sectionRefs} style="plain">
						<ContentCard colour={UIColours.orange} className={st.categoryContainer}>
							<div className={st.skill}> {movesByCategory[category].skill?.description}</div>
							<div className={[st.movesList, stcl.removeParentWhenEmpty].join(' ')}>
								{filteredMoves(category).map((move, index) => (
									<div className={st.moveContainer} key={`${move.name.replace(/ /g, '_')}-${index}`}>
										<MoveBlock move={move} mode={MoveDisplayMode.display} />
									</div>
								))}
							</div>
							<div className={[st.passivesContainer, stcl.contentListParent].join(' ')}>
								<div className={[st.passivesList, stcl.removeParentWhenEmpty].join(' ')}>
									{filteredPassives(category).map((move, index) => (
										<MoveBlock key={`${move.name.replace(/ /g, '_')}-${index}`} move={move} mode={MoveDisplayMode.display} />
									))}
								</div>
							</div>
						</ContentCard>
					</SectionBlock>
				))}
			</ContentList>
		</ContentPageContainer>
	);
}