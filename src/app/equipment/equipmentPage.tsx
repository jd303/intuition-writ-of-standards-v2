import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import ContentList from "../components/contentList/contentList";
import { GenericModel } from "../../features/models/genericModel";
import { UIColours } from "../../features/UIColours";
import ControlBar from "../components/controlBar/controlBar";
import SearchControl from "../components/controlBar/searchControl";
import { setEquipmentSearch } from "../../features/search/searchSlice";

import st from './equipmentPage.module.css';
import stcl from '../components/contentList/contentList.module.css';

function EquipmentPage() {
	const dispatch = useAppDispatch();
	const equipmentSearch = useAppSelector((state) => state.search.equipmentSearch);
	const equipment = useAppSelector((state) => state.equipmentData.equipment);

	const categorisedItems = useMemo((): Record<string, GenericModel[]> => {
		const sorted: Record<string, GenericModel[]> = {};

		if (equipment.length) equipment.forEach((equipmentItem: GenericModel) => {
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
		<>
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
			<ControlBar colour={UIColours.mustard}>
				<SearchControl name="Search" initialValue={equipmentSearch} onChange={(value: string) => dispatch(setEquipmentSearch(value))} />
			</ControlBar>
			<ContentList color={UIColours.mustard} style="grid">
				{Object.keys(categorisedItems).map((equipmentKey: string) => (
					<div className={[stcl.contentCard, stcl.contentListParent].join(' ')} key={`category-${equipmentKey}`}>
						<div className={st.header}>{equipmentKey}</div>
						<div className={[st.equipmentList, stcl.removeParentWhenEmpty].join(' ')}>
							{filteredItems(equipmentKey).map((item, index) => (
								<div className={st.item} key={`${equipmentKey} ${index}`}>
									<div className={st.itemHead}>
										<span className={st.name}>{item.name}</span>
										<span className={st.cost}>{item.cost}</span>
									</div>
									<div className={st.description}>{item.description}</div>
								</div>
							))}
						</div>
					</div>
				))}
			</ContentList>
		</>
	)
}

export default EquipmentPage;
