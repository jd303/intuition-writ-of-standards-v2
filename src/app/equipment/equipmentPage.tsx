import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../features/firebaseHooks";
import ContentList from "../components/contentList/contentList";
import { UIColours } from "../../features/constants/UIColours";
import ControlBar from "../components/controlBar/controlBar";
import ContentCard from "../components/contentList/contentCard";
import SearchControl from "../components/controlBar/searchControl";
import { setEquipmentSearch } from "../../features/search/searchSlice";
import EquipmentItemBlock from "../components/equipmentItem/equipmentItemBlock";
import { EquipmentItemModel } from "../../features/models/equipmentItemModel";

import st from './equipmentPage.module.css';
import stcl from '../components/contentList/contentList.module.css';

function EquipmentPage() {
	const dispatch = useAppDispatch();
	const equipmentSearch = useAppSelector((state) => state.search.equipmentSearch);
	const equipment = useAppSelector((state) => state.equipmentData.equipment);

	const categorisedItems = useMemo((): Record<string, EquipmentItemModel[]> => {
		const sorted: Record<string, EquipmentItemModel[]> = {};

		if (equipment.length) equipment.forEach((equipmentItem: EquipmentItemModel) => {
			const key = equipmentItem.type.toString();
			if (!Object.keys(sorted).includes(key)) sorted[key] = [];
			sorted[key].push(equipmentItem);
		});

		return sorted;
	}, [equipment]);

	const filteredItems = useCallback((equipmentKey: string) => {
		return categorisedItems[equipmentKey].filter((item) => ((item.name as string).toLowerCase() + (item.description as string).toLowerCase()).includes(equipmentSearch.toLowerCase()));
	}, [categorisedItems, equipmentSearch]);

	return (
		<div>
			<section>
				<p>
					Costs are in
					<strong>
						<em> Standards</em>
					</strong>
					, a coin which is accepted in most nations of the world. The coin has developed a number of colloquial names, such as Stans and Newies.
				</p>
				<p>The below are indicative of typical prices across the Civil Holds. Market forces may apply pressure to prices.</p>
			</section>
			<ContentList colour={UIColours.mustard} style="grid">
				<ControlBar colour={UIColours.mustard}>
					<SearchControl name="Search" initialValue={equipmentSearch} onChange={(value: string) => dispatch(setEquipmentSearch(value))} />
				</ControlBar>
				{Object.keys(categorisedItems).map((equipmentKey: string) => (
					<ContentCard colour={UIColours.mustard} className={stcl.contentListParent} key={`category-${equipmentKey}`}>
						<div className={st.header}>{equipmentKey}</div>
						<div className={[st.equipmentList, stcl.removeParentWhenEmpty].join(' ')}>
							{filteredItems(equipmentKey).map((item, index) => (
								<EquipmentItemBlock equipmentItem={item} key={`${equipmentKey} ${index}`} />
							))}
						</div>
					</ContentCard>
				))}
			</ContentList>
		</div>
	)
}

export default EquipmentPage;
