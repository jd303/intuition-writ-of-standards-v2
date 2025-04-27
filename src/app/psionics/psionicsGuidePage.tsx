import ContentPageContainer from "../components/contentPage/contentPageContainer";
import ControlBar from "../components/controlBar/controlBar";
import { UIColours } from "../../features/constants/UIColours";
import SectionNav from "../components/controlBar/sectionNav";
import { useSectionNav } from "../components/controlBar/useSectionNav";
import { SectionBlock } from "../components/controlBar/sectionBlock";

function PsionicsGuidePage() {
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	return (
		<ContentPageContainer>
			<ControlBar colour={UIColours.purple}>
				<SectionNav sections={sectionDefinitions} label={"Go"} />
			</ControlBar>
			<SectionBlock sectionRefs={sectionRefs} name="overview" style="plain">
				<p>Psionics is a powerful force that is created and shaped by the will and mental energies of the Psionically Awakened.  Unlike magic, which is a universal force of life and existence, Psionics are manfiested from within, and each use changes the mind of the manifester.  Psionic powers are more limited than magic, but so too are they inescapable, inevitable, and unknown.</p>
			</SectionBlock>
			<SectionBlock sectionRefs={sectionRefs} name="the pharos" style="plain">
				<p>Beyond all existence, beyond even consciousness, lies a Pharos of ecstatic brilliance.  It is sensed and not seen, and those who have sensed it say it takes the form of a scintillating horizon of colour and light, though this is undoubtedly a human interpretation of that which cannot be understood. When a mind senses the Pharos, it is irrevocably changed - synaptic impulses can be controlled, emotions are entities, and thoughts become energy.</p>
				<p>It is a true rarity that a mind awakens to the Pharos without stimulus, and if they do they are commonly maddened by an overwhelming understanding of the truth of the universe.  These poor souls, whose minds were too open, slip into an endless Psitosis.  And so the Psionically Awakened instead welcome others who they deem of the right aptitude, mental fortitude and will by guiding them to awaken at the Pharos.</p>
				<p>None truly understand it, yet many search for it, for it may unlock a state of consciousness beyond any understanding.</p>
			</SectionBlock>
			<SectionBlock sectionRefs={sectionRefs} name="psionic energies" style="plain">
				<h2>Psi</h2>
				<p>As a Psionically Awakened begins to understand their own minds more, they learn to direct energies more efficiently and safely.  This mastery of mind is represented as Psi.</p>
				<p>Psionically Awakened use Psi to counter the effects of Psitosis.  When a Psionically Awakened fails to exceed the Psitosis Rating of a power, they may expend Psi to confirm stability in their mind.</p>
				<h2>Psitosis</h2>
				<p>Those who have had their Psionics Awakened can feel the presence of their thoughts, their id and their ego.  They have colour and richness and are an intrinsic part of self.  With a little effort, these presences can be directed, controlled, coalesced and manifested into amazing powers.  But manifesting these forces creates a tension within the mind as synapses are overloaded, neurons pulse erratically, and vesicles are overworked.  As a Psionically Awakened control their own mental energies, they also strains themeselves - risking Psitosis.</p>
				<p>Most cases of Psitosis are mild psychotic episodes; hallucintions and delusions that the Awakened is mostly aware of and can safely ignore.  But as the Awakened manifests more and more powerful abilities, Psitosis becomes more problematic, and so moderation and care must be taken.</p>
				<p>All Psionic Powers are manifested with a Psitosis Rating.  When manifesting a Psionic Power, the user must perform a Psitosis Defense, which is to compare their Manifest Raw Roll to the Psitosis Rating of the power.  If the user exceeds the rating, the power is manifested without expending any energy.  If it does not, then the manifester must expend Psi or gain the Scrambled: Psitosis Status.</p>
			</SectionBlock>
			<SectionBlock sectionRefs={sectionRefs} name="manifesting" style="plain">
				<p>Psionically Awakened have access to all Powers for each Aptitude that they have at least 1 point in.  When attempting to manfiest a Psionic Power:</p>
				<ul>
					<li>
						<strong>Choose</strong> a power and Psitosis Rating.  The higher the Psitosis Rating, the more powerful the effects and the greater the risk of entering Psitosis, however you may only choose a Psitosis Rating that is less than or equal to your remaining Psi.
						<ul>
							<li>Note: When choosing a Psitosis Ratings, all effects from previous Ratings apply, unless overwritten by higher ones.  For example, if an earlier Rating allows a save, a higher Rating still allows that save.</li>
						</ul>
					</li>
					<li><strong>Resolve</strong> the appropriate Manifest Roll.  The Raw Value of this Roll determines the Psitosis Defence, and the Resolved Roll determines if the power exceeds the defences of targets, if the Power allows a save.</li>
					<li><strong>Apply</strong> the effects.</li>
				</ul>
				<p>Psionic Powers can be infinitely maintained.  When a Power ends, the Awakened may instantly retrigger them by re-rolling the Manifest Move.  Use this roll only to calculate the Psitosis Defence - any saves that a target failed (and cannot retry) do not get an additional save here.</p>
			</SectionBlock>
		</ContentPageContainer>
	)
}

export default PsionicsGuidePage;
