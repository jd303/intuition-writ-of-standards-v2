import { RootState } from "../../features/store";
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { setSpellsSearch } from '../../features/search/searchSlice';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from "../components/controlBar/searchControl";

import st from './magicSpellsPage.module.css';


function MagicSpellsPage() {
	const dispatch = useAppDispatch();
	
	const spellsSearch = useAppSelector((state: RootState) => state.search.spellsSearch);

	return (
		<>
			<ControlBar>
				<SearchControl value={spellsSearch} onChange={(event) => dispatch(setSpellsSearch(event?.target.value))} onClear={() => dispatch(setSpellsSearch(''))} />
			</ControlBar>

			<div className={st.spellsContainer}>
				Spells go here
			</div>
		</>
	)
}

export default MagicSpellsPage;
