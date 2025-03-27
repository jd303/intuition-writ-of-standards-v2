import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setCompanionsSearch } from '../../features/search/searchSlice';
import { UIColours } from '../../features/constants/UIColours';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import { GenericModel } from '../../features/models/genericModel';
import ContentList from '../components/contentList/contentList';

import st from './companionsPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import ContentCard from '../components/contentList/contentCard';

export default function CompanionsPage() {
	const dispatch = useAppDispatch();
	const companionsSearch = useAppSelector((state) => state.search.companionsSearch);
	const menagerie = useAppSelector<GenericModel[]>((state) => state.menagerieData.menagerie);

	// Choose and remember only companionable creatures
	const companionableCreatures = useMemo(() => {
		return [...menagerie].sort((a, b) => a.dc < b.dc ? -1 : 1).filter((item) => item.companionable);
	}, [menagerie]);

	// Categories the creatures
	const categorisedMenagerie: Record<string, GenericModel[]> = useMemo(() => {
		if (!companionableCreatures.length) return {};

		const categorisedMenagerie: Record<string, GenericModel[]> = {};
		companionableCreatures.map((item) => {
			const key = item.type.toString();
			if (!categorisedMenagerie[key]) categorisedMenagerie[key] = [];
			categorisedMenagerie[key].push(item);
		});

		return categorisedMenagerie;
	}, [companionableCreatures]);

	// Filter based on user input
	const filteredMenagerie = useCallback((companionCategory: string) => {
		const contentCopy: GenericModel[] = [...categorisedMenagerie[companionCategory]];
		return contentCopy.sort((a, b) => a.dc < b.dc ? -1 : 1)
			.filter((item) => item.type.toString() == companionCategory)
			.filter((item) => `${(item.name.toString()).toLowerCase()} ${(item.type.toString()).toLowerCase()}`.includes(companionsSearch.toLowerCase()));
	}, [companionsSearch, categorisedMenagerie]);

	return (

		<ContentList colour={UIColours.green} style="grid">
			<ControlBar colour={UIColours.green}>
				<SearchControl name="Search" initialValue={companionsSearch} onChange={(value: string) => dispatch(setCompanionsSearch(value))} />
			</ControlBar>
			{Object.keys(categorisedMenagerie).map((companionCategory: string) => (
				<div className={[st.menagerieContainer, stcl.contentListParent].join(' ')}>
					<div className={st.header}>{companionCategory}</div>
					<div className={[st.menagerieList, stcl.removeParentWhenEmpty].join(' ')}>
						{filteredMenagerie(companionCategory).map((companion) => (
							<ContentCard colour={UIColours.green} key={`companion-${companion.name}`}>
								{companion.name}
							</ContentCard>
						))}
					</div>
				</div>
			))}
		</ContentList>
	);
}