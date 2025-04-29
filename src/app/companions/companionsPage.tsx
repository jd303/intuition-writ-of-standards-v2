import st from './companionsPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/firebaseHooks';
import { setCompanionsSearch } from '../../features/search/searchSlice';
import { UIColours } from '../../features/constants/UIColours';
import ControlBar from '../components/controlBar/controlBar';
import SearchControl from '../components/controlBar/searchControl';
import ContentList from '../components/contentList/contentList';
import ContentCard from '../components/contentList/contentCard';
import MenagerieSpecimenBlock from '../components/beast/menagerieSpecimenBlock';
import { MenagerieSpecimenModel } from '../../features/models/menagerieSpecimenModel';

export default function CompanionsPage() {
	const dispatch = useAppDispatch();
	const companionsSearch = useAppSelector((state) => state.search.companionsSearch);
	const menagerie = useAppSelector<MenagerieSpecimenModel[]>((state) => state.menagerieData.menagerie);

	// Choose and remember only companionable creatures
	const companionableCreatures = useMemo(() => {
		return [...menagerie].sort((a, b) => a.dc < b.dc ? -1 : 1).filter((item) => item.companionable);
	}, [menagerie]);

	// Categories the creatures
	const categorisedMenagerie: Record<string, MenagerieSpecimenModel[]> = useMemo(() => {
		if (!companionableCreatures.length) return {};

		const categorisedMenagerie: Record<string, MenagerieSpecimenModel[]> = {};
		companionableCreatures.map((item) => {
			const key = item.type.toString();
			if (!categorisedMenagerie[key]) categorisedMenagerie[key] = [];
			categorisedMenagerie[key].push(item);
		});

		return categorisedMenagerie;
	}, [companionableCreatures]);

	// Filter based on user input
	const filteredMenagerie = useCallback((companionCategory: string) => {
		const contentCopy: MenagerieSpecimenModel[] = [...categorisedMenagerie[companionCategory]];
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
				<ContentCard colour={UIColours.green} key={`companion-${companionCategory}`} className={stcl.contentListParent}>
					<div className={st.header}>{companionCategory}</div>
					<div className={[st.menagerieList, stcl.removeParentWhenEmpty].join(' ')}>
						{filteredMenagerie(companionCategory).map((companion) => (
							<MenagerieSpecimenBlock menagerieSpecimen={companion} viewMode="max" viewContext="companion" />
						))}
					</div>
				</ContentCard>
			))}
		</ContentList>
	);
}