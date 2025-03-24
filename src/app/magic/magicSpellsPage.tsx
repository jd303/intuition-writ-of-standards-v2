import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { setSpellsSearch } from '../../features/search/searchSlice';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";

import st from './magicSpellsPage.module.css';
import { UIColours } from "../../features/UIColours";


function MagicSpellsPage() {
	const dispatch = useAppDispatch();
	
	const spellsSearch = useAppSelector((state: RootState) => state.search.spellsSearch);

	return (
		<>
			<ControlBar colour={UIColours.purple}>
				<SearchControl name="Search" initialValue={spellsSearch} onChange={(value: string) => dispatch(setSpellsSearch(value))} />
			</ControlBar>
			<div className={st.spellsContainer}>
				Spells go here
			</div>
		</>
	)
}

export default MagicSpellsPage;
