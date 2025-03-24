import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { setCompanionMovesSearch } from '../../features/search/searchSlice';
import { UIColours } from '../../features/UIColours';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';

import st from './companionMovesPage.module.css';
import stcl from '../components/contentList/contentList.module.css';

import bronzeMedal from "/public/images/icons/ico.medal.bronze.svg";
import silverMedal from "/public/images/icons/ico.medal.silver.svg";
import goldMedal from "/public/images/icons/ico.medal.gold.svg";

export default function CompanionMovesPage() {
	const dispatch = useAppDispatch();
	const companionMovesSearch = useAppSelector((state) => state.search.companionMovesSearch);
	const companionMoves = useAppSelector((state) => state.companionMovesData.companionMoves);

	const filteredItems = useMemo(() => {
		return companionMoves.filter((move) => `${move.name.toString().toLowerCase()} ${move.desc.toString().toLowerCase()} ${move.type.toString().toLowerCase()}`.includes(companionMovesSearch.toLowerCase()));
	}, [companionMoves, companionMovesSearch]);

	const getMedal = (type: string) => {
		switch (type) {
			case "standard": return <img className={st.typeMedal} src={silverMedal} alt="Standard" />;
			case "advanced": return <img className={st.typeMedal} src={goldMedal} alt="Advanced" />;
			default: return <img className={st.typeMedal} src={bronzeMedal} alt="Basic" />;
		}
	}

	return (
		<>
			<ControlBar colour={UIColours.green}>
				<SearchControl name="Search" initialValue={companionMovesSearch} onChange={(value: string) => dispatch(setCompanionMovesSearch(value))} />
			</ControlBar>
			<ContentList color={UIColours.green} style="list">
				{filteredItems.map((move) => (
					<div className={stcl.contentCard}>
						<div className={st.header}>
							<div className={st.name}>{getMedal(move.type.toString())} {move.name}</div>
						</div>
						<div className={st.desc}>{move.desc}</div>
					</div>
				))}
			</ContentList>
		</>
	);
}