import { useEffect, useRef, useState } from "react";
import ContentPageContainer from "../components/contentPage/contentPageContainer";
import ControlBar from "../components/controlBar/controlBar";
import SectionNav, { SectionNavDefinition } from "../components/controlBar/sectionNav";
import { UIColours } from "../../features/constants/UIColours";

function AlchemyGuidePage() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement | null) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
		setSectionDefinitions(sectionRefDefinitions);
	}, [sectionRefs]);

	return (
		<ContentPageContainer>
			<ControlBar colour={UIColours.cyan}>
				<SectionNav sections={sectionDefinitions} label={"Jump to"} />
			</ControlBar>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="overview">
				<h1>Overview</h1>
				<p>Alhember contains wild and weird plants, chemicals and minerals with unusual properties.  A trained Alchemist can pluck, crush, brew, grind and extract part of them to create interesting and useful Alchemicals.  While they might not be magical, or as strong as most spells, Alchemicals are easier to create and buy, and have a wide range of effects.</p>
				<p>A good Alchemist will understand the principles of Alchemy:</p>
				<ul>
					<li><strong>Reagents:</strong> Flora, fauna, chemical and mineral that contain special Alchemical Components.</li>
					<li><strong>Components:</strong> Symbolic properties that can be extracted from Reagents, such as Fortify, Soothe, and Hydrant.</li>
					<li><strong>Recipes:</strong> A formula for creating a bomb, salve, potion or other wondrous Alchemical by combining certain Components.</li>
				</ul>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="finding reagents">
				<h1>Finding Reagents</h1>
				<p>Alchemists are constantly on the lookout for special alchemicals.  Because of the power of Alchemy, many healers and scholars are alchemists, so cities and some villages tend to have an Alchemist to purchase Reagents from.  Instead, a wily Alchemist might be on the lookout for Reagents in the wild, though the environment you are in will determine which Reagents you can find.  Finally, an experienced Alchemist might use the Transmute Alchemical Move, to break down an existing Alchemical into component Reagents.</p>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="creating alchemicals">
				<h1>Creating Alchemicals</h1>
				<p>The full rules for creating Alchemicals can be found in the Craft Alchemical Move.</p>
			</section>
		</ContentPageContainer>
	)
}

export default AlchemyGuidePage;
