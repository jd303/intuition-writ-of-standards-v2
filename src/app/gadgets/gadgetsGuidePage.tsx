import { useEffect, useRef, useState } from "react";
import ContentPageContainer from "../components/contentPage/contentPageContainer";
import ControlBar from "../components/controlBar/controlBar";
import SectionNav, { SectionNavDefinition } from "../components/controlBar/sectionNav";
import { UIColours } from "../../features/constants/UIColours";

function GadgetsGuidePage() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
		const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
		useEffect(() => {
			const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement | null) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
			setSectionDefinitions(sectionRefDefinitions);
		}, [sectionRefs]);
	
	return (
		<ContentPageContainer>
			<ControlBar colour={UIColours.cobalt}>
				<SectionNav sections={sectionDefinitions} label={"Jump to"} />
			</ControlBar>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="overview">
				<h1>Overview</h1>
				<p>Gadgeteering is a newer discipline con the continent of The Civil Holds.  Spearheaded by the studies of Scholars from Sim's Edge and enabled by discoveries of interesting materials and Arcanamaterials, Gadgeteers can create weird and wonderful automatons and mechanical creations.</p>
				<p>Whether a Gadgeteer utilises the Sonic properties of Orraquartz or the energy-storage and distribution when working Endelsand, the results are kooky and oddly-shaped creations.</p>
				<p>A good Gadgeteer will understand the principles of Gadgets:</p>
				<ul>
					<li><strong>Prime Material:</strong> A creation requires a prime material - the one most responsible for a gadget to function.  Some advanced gadgets may require more than 1 Prime Requirement.  The Gadgeteer must have one unit of the Prime Material to make their gadget.</li>
					<li><strong>Cost:</strong> While creations are expensive, they often can be repurposed multiple times.  The cost of a creation represents other materials used to create the gadget (such as timber, metals and adhesives), and, unless the narrative requires it, can be freely paid in assumption that the player has already acquired the materials..</li>
				</ul>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="creating gadgets">
				<h1>Creating Gadgets</h1>
				<p>The full rules for creating Gadgets can be found in the Craft Gadget Move.</p>
			</section>
		</ContentPageContainer>
	)
}

export default GadgetsGuidePage;
