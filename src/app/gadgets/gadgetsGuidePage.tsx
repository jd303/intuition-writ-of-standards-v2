import ContentPageContainer from "../components/contentPage/contentPageContainer";
import ControlBar from "../components/controlBar/controlBar";
import SectionNav from "../components/controlBar/sectionNav";
import { UIColours } from "../../features/constants/UIColours";
import { useSectionNav } from "../components/controlBar/useSectionNav";
import { SectionBlock } from "../components/controlBar/sectionBlock";

function GadgetsGuidePage() {
	const [sectionRefs, sectionDefinitions] = useSectionNav();
	
	return (
		<ContentPageContainer>
			<ControlBar colour={UIColours.cobalt}>
				<SectionNav sections={sectionDefinitions} label={"Go"} />
			</ControlBar>
			<SectionBlock name="overview" sectionRefs={sectionRefs}>
				<h1>Overview</h1>
				<p>Gadgeteering is a newer discipline con the continent of The Civil Holds.  Spearheaded by the studies of Scholars from Sim's Edge and enabled by discoveries of interesting materials and Arcanamaterials, Gadgeteers can create weird and wonderful automatons and mechanical creations.</p>
				<p>Whether a Gadgeteer utilises the Sonic properties of Orraquartz or the energy-storage and distribution when working Endelsand, the results are kooky and oddly-shaped creations.</p>
				<p>A good Gadgeteer will understand the principles of Gadgets:</p>
				<ul>
					<li><strong>Prime Material:</strong> A creation requires a prime material - the one most responsible for a gadget to function.  Some advanced gadgets may require more than 1 Prime Requirement.  The Gadgeteer must have one unit of the Prime Material to make their gadget.</li>
					<li><strong>Cost:</strong> While creations are expensive, they often can be repurposed multiple times.  The cost of a creation represents other materials used to create the gadget (such as timber, metals and adhesives), and, unless the narrative requires it, can be freely paid in assumption that the player has already acquired the materials..</li>
				</ul>
			</SectionBlock>
			<SectionBlock name="creating gadgets" sectionRefs={sectionRefs}>
				<h1>Creating Gadgets</h1>
				<p>The full rules for creating Gadgets can be found in the Craft Gadget Move.</p>
			</SectionBlock>
		</ContentPageContainer>
	)
}

export default GadgetsGuidePage;
