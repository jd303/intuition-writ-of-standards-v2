import { useMemo } from "react";
import { UIColours } from "../../features/constants/UIColours";
import { useAppDispatch, useAppSelector } from "../../features/firebaseHooks";
import { Spell } from "../../features/models/spellModel";
import { setMagicPotionsSearch } from "../../features/search/searchSlice";
import ContentCard from "../components/contentList/contentCard";
import ContentList from "../components/contentList/contentList";
import ControlBar from "../components/controlBar/controlBar";
import SearchControl from "../components/controlBar/searchControl";
import SpellBlock from "../components/spell/spellBlock";

function MagicPotionsPage() {
	const dispatch = useAppDispatch();
	const potionsSearch = useAppSelector((state) => state.search.magicPotionsSearch);
	const potionableSpells = useAppSelector((state) => state.magicSpells.spells).filter((spell: Spell) => spell.potable);
	
	const filteredPotions = useMemo(() => {
		return potionableSpells.filter((potionableSpell) => (potionableSpell.name+potionableSpell.cantrip+potionableSpell.standard+potionableSpell.empowered).toLowerCase().includes(potionsSearch.toLowerCase()));
	}, [potionsSearch, potionableSpells]);

	return (
		<>
			<ControlBar colour={UIColours.purple}>
				<SearchControl name="Search" initialValue={potionsSearch} onChange={(value) => dispatch(setMagicPotionsSearch(value))} />
			</ControlBar>
			<ContentList colour={UIColours.purple} style="grid">
				{filteredPotions.map(potionableSpell => (
					<ContentCard colour={UIColours.purple} key={potionableSpell.id}>
						<SpellBlock spell={potionableSpell} />
					</ContentCard>
				))}
			</ContentList>
		</>
	)
}

export default MagicPotionsPage;
