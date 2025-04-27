import { UIColours } from '../../features/constants/UIColours';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import ControlBar from '../components/controlBar/controlBar';
import SectionNav from '../components/controlBar/sectionNav';
import st from './glossaryPage.module.css';
import { useSectionNav } from '../components/controlBar/useSectionNav';
import { SectionBlock } from '../components/controlBar/sectionBlock';

export default function GlossaryPage() {
	const [sectionRefs, sectionDefinitions] = useSectionNav();

	return (
		<ContentPageContainer className={st.glossaryLayout}>
			<ControlBar colour={UIColours.orange}>
				<SectionNav sections={sectionDefinitions} label="Go" />
			</ControlBar>
			<SectionBlock name="Standard Terms" style="plain" sectionRefs={sectionRefs}>
				<ol>
					<li><span className={st.termName}>Restore</span>: You restore missing resources, and any restored resource that exceeds your total is lost.  For example, if you are missing 5 Verve and Restore 10 Verve, 5 are lost.</li>
					<li><span className={st.termName}>Gain</span>: You gain missing resources, and any gained that exceeds your total becomes temporary resources.  For example, if you are missing 3 Verve and Gain 10 Verve, you go over your maximum by 7 (as Temporary Verve).</li>
					<li><span className={st.termName}>World Changer</span>: Rolling 2 20s or 2 1s in a row results in a World Changing Effect.  A world changer occurs between the 1 or 2 players who rolled the 20s or 1s.  On a Positive World Changer (2 20s) all players involved may propose a benefit to them that involves the Moves used to trigger the World Changer.  On a Negative World Changer, the DM will apply a negative one.</li>
					<li><span className={st.termName}>Personal World Changer</span>: A World Changer that applied to 1 player only.</li>
					<li><span className={st.termName}>Raw Roll</span>: The exact number shown on the dice you rolled.  Some Moves and Expertises trigger effects on a Raw Roll, or on a Raw Roll range (such as 18+).</li>
					<li><span className={st.termName}>DC Penalty</span>: The DC of your Roll is more difficult, as stated by the Penalty's terms.</li>
				</ol>
			</SectionBlock>
			<SectionBlock name="Wellness Terms" style="plain" sectionRefs={sectionRefs}>
				<ol>
					<li>
						<span className={st.termName}>Base Damage</span>: The Damage you deal with various Moves. Comes in 3 flavours:
						<ul>
							<li><span className={st.termName}>Melee Base Damage:</span> Equal to 1 plus your STR bonus, your weapon's Damage, plus any buffs you have to Melee Base Damage.</li>
							<li><span className={st.termName}>Ranged Base Damage:</span> Equal to 1 plus your DEX bonus, your weapon's Damage, plus any buffs you have to Ranged Base Damage.</li>
							<li><span className={st.termName}>Spell Base Damage:</span> Equal to 1 plus your INT bonus, your Spell's Damage plus any buffs you have to Spell Base Damage.</li>
							<li><span className={st.termName}>Psi Base Damage:</span> Equal to 1 plus your WIS bonus, plus any buffs you have to Psi Base Damage.</li>
						</ul>
					</li>
					<li>
						<span className={st.termName}>Damage Resolution</span>: When incoming damage is calculated:
						<ul>
							<li><span className={st.termName}>Unresolved Damage:</span> The pure amount of Verve Loss from an individual source, before performing a Reaction Move.</li>
							<li><span className={st.termName}>Resolved Damage:</span> The Verve Loss you calculate after peforming a Reaction Move.</li>
						</ul>
					</li>
					<li>
						<span className={st.termName}>Damage Resistance</span>: An effect that reduces damage you take, applied to Resolved Damage.
						<ul>
							<li><span className={st.termName}>UDR</span>: Universal Damage Resistance, a reduction to any kind of damage that you take.</li>
							<li><span className={st.termName}>PDR</span>: Physical Damage Resistance, a reduction to physical damage that you take.</li>
							<li><span className={st.termName}>MDR</span>: Magical Damage Resistance, a reduction to magial damage that you take.</li>
							<li><span className={st.termName}>PyRes</span>: Pyral Damage Resistance.</li>
							<li><span className={st.termName}>CryRes</span>: Cryonic Damage Resistance.</li>
							<li><span className={st.termName}>SonRes</span>: Sonic Damage Resistance.</li>
							<li><span className={st.termName}>ZephRes</span>: Zephyral Damage Resistance.</li>
							<li><span className={st.termName}>ArcRes</span>: Arcanic Damage Resistance.</li>
							<li><span className={st.termName}>LumRes</span>: Luminal Damage Resistance.</li>
							<li><span className={st.termName}>UmRes</span>: Umbral Damage Resistance.</li>
							<li><span className={st.termName}>AcRes</span>: Acidic Damage Resistance.</li>
						</ul>
					</li>
				</ol>
			</SectionBlock>
			<SectionBlock name="Combat Terms" style="plain" sectionRefs={sectionRefs}>
				<ol>
					<li><span className={st.termName}>Threatened Area</span>: Squares that your melee weapon can reach.  For most, this is 1 adjacent square.  For enemies, Threatening Range may also extend to their Special Move and unusually long reach.</li>
					<li><span className={st.termName}>Stagger</span>: A measurement of how unbalanced a target is.  Each point in Stagger reduces the requirement for a successful Roll to Trip, Grapple and Disarm a target.</li>
					<li><span className={st.termName}>NAME</span>: Effect.</li>
					<li><span className={st.termName}>Flanked</span>: See the Flanked Status for more information.</li>
					<li><span className={st.termName}>Difficult Terrain</span>: Ground that is unstable, whether due to rocks, vines, or magical effects.  Moving over difficult terrain halves your Movement Sq.</li>
					<li><span className={st.termName}>Maximum Block / Dodge</span>: This is the maximum that you can apply to the Block and Dodge Moves to resist Basic Attacks.  It does not apply to magic Spells.</li>
				</ol>
			</SectionBlock>
			<SectionBlock name="Magic Terms" style="plain" sectionRefs={sectionRefs}>
				<ol>
					<li><span className={st.termName}>Critical Cast</span>: A spell that requires you pierce your target's Defenses, for which you achieve a Raw Roll within your Critical Range, typically 20.</li>
				</ol>
			</SectionBlock>
		</ContentPageContainer>
	);
}