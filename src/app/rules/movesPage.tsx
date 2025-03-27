import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setMovesSearch } from '../../features/search/searchSlice';
import { UIColours } from '../../features/constants/UIColours';
import { Move } from '../../features/models/moveModel';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import SectionNav, { SectionNavDefinition } from '../components/controlBar/sectionNav';
import MoveBlock from '../components/moves/MoveBlock';
import st from './movesPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import ContentCard from '../components/contentList/contentCard';

export default function MovesPage() {
	const dispatch = useAppDispatch();
	const movesSearch = useAppSelector((state) => state.search.movesSearch);
	const movesByCategory = useAppSelector((state) => state.movesData.moves);

	const filteredMoves = useCallback((categoryKey: string) => {
		return movesByCategory[categoryKey].moves.filter((move) => JSON.stringify(move).toLowerCase().includes(movesSearch.toLowerCase()));
	}, [movesSearch, movesByCategory]);

	const filteredExpertises = useCallback((moves: Move[]) => {
		return moves.filter((move) => JSON.stringify(move).toLowerCase().includes(movesSearch.toLowerCase()));
	}, [movesSearch]);

	const filteredPassives = useCallback((categoryKey: string) => {
		return movesByCategory[categoryKey].passives.filter((item) => ((item.name as string).toLowerCase() + (item.description as string).toLowerCase()).includes(movesSearch.toLowerCase()));
	}, [movesSearch, movesByCategory]);

	// Setup section refs for the SectionNav (TODO: Can we automate this?)
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const [sectionNavDefinitions, setSectionNavDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		setSectionNavDefinitions(sectionRefs.current.map((sectionRef) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } }));
	}, [movesByCategory]);

	return (
		<ContentPageContainer>
			<ContentList colour={UIColours.orange} style="list" className={st.contentList}>
				<ControlBar colour={UIColours.orange} className={st.controlBar}>
					<SectionNav label="Section" sections={sectionNavDefinitions} />
					<SearchControl name="Search" initialValue={movesSearch} onChange={(value: string) => dispatch(setMovesSearch(value))}></SearchControl>
				</ControlBar>
				{Object.keys(movesByCategory).map((category, index) => (
					<section className={[st.categoryParent, stcl.contentListParent].join(' ')} key={`category-${category}`} id={category} ref={(el) => (sectionRefs.current[index] = el)}>
						<div className={st.category}>{category.replace("_", " ")} ({movesByCategory[category].moves[0].stat})</div>
						<ContentCard colour={UIColours.orange} className={st.categoryContainer}>
							<div className={st.skill}> {movesByCategory[category].skill?.description}</div>
							<div className={[st.movesList, stcl.removeParentWhenEmpty].join(' ')}>
								{filteredMoves(category).map((move, index) => (
									<div className={st.moveContainer} key={`${move.name.replace(/ /g, '_')}-${index}`}>
										<MoveBlock move={move} mode="display" />
										<div className={st.expertises}>
											{filteredExpertises(move.expertises || []).map((move, index) => (
												<MoveBlock key={index} move={move} mode="display"></MoveBlock>
											))}
										</div>
									</div>
								))}
							</div>
							<div className={[st.passivesContainer, stcl.contentListParent].join(' ')}>
								<div className={[st.passivesList, stcl.removeParentWhenEmpty].join(' ')}>
									{filteredPassives(category).map((move, index) => (
										<MoveBlock key={`${move.name.replace(/ /g, '_')}-${index}`} move={move} mode="display" />
									))}
								</div>
							</div>
						</ContentCard>
					</section>
				))}
			</ContentList>
		</ContentPageContainer>
	);
}