import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setStatusesSearch, setStatusesCategorySelection } from '../../features/search/searchSlice';
import { UIColours } from '../../features/constants/UIColours';
import { StatusModel } from '../../features/models/statusModel';
import Status from '../components/statuses/status';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import SelectorDropdown, { SELECTOR_DEFAULT } from '../components/controlBar/selectorDropdown';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import ContentCard from '../components/contentList/contentCard';

import st from './statusesPage.module.css';

export default function StatusesPage() {
	const dispatch = useAppDispatch();
	const statusesSearch = useAppSelector((state) => state.search.statusesSearch);
	const statusesCategorySelection = useAppSelector((state) => state.search.statusesCategorySelection);
	const statuses = useAppSelector((state) => state.statusesData.statuses);
	const categoryOptions = [{ value: 'corpus', label: 'Corpus' }, { value: 'mentus', label: 'Mentus' }, { value: 'ciar', label: 'Ciar' }];

	const filteredStatuses = useMemo(() => {
		const statusesRef = [...statuses];
		const sorted = statusesRef.sort((a: StatusModel, b: StatusModel) => {
			const boolCompare = Number(a.negative) - Number(b.negative);
			if (boolCompare !== 0) return boolCompare;
			return a.name < b.name && -1 || 1;
		});

		const categoryFilterered = statusesCategorySelection !== SELECTOR_DEFAULT && sorted.filter((status: StatusModel) => status.domain == statusesCategorySelection) || sorted;
		const searchFiltered = statusesSearch.length && categoryFilterered.filter((status: StatusModel) => JSON.stringify(status).toLowerCase().includes(statusesSearch.toLowerCase())) || categoryFilterered;

		return searchFiltered;
	}, [statusesSearch, statuses, statusesCategorySelection]);

	return (
		<ContentPageContainer>
			<ContentList colour={UIColours.orange} style="list">
				<ControlBar colour={UIColours.orange} className={st.controlBar}>
					<SelectorDropdown label="Type" options={categoryOptions} initialValue={statusesCategorySelection} onChange={(value: string) => dispatch(setStatusesCategorySelection(value))} />
					<SearchControl name="Search" initialValue={statusesSearch} onChange={(value: string) => dispatch(setStatusesSearch(value))}></SearchControl>
				</ControlBar>
				{filteredStatuses.map((status: StatusModel) => (
					<ContentCard colour={UIColours.orange} key={status.name}>
						<Status status={status} />
					</ContentCard>
				))}
			</ContentList>
		</ContentPageContainer>
	);
}