import { useEffect, useRef, useState } from 'react';
import { UIColours } from '../../features/constants/UIColours';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import ControlBar from '../components/controlBar/controlBar';
import SectionNav, { SectionNavDefinition } from '../components/controlBar/sectionNav';
import st from './glossaryPage.module.css';

export default function GlossaryPage() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement | null) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
		setSectionDefinitions(sectionRefDefinitions);
	}, [sectionRefs]);

	return (
		<ContentPageContainer className={st.glossaryLayout}>
			<ControlBar colour={UIColours.orange}>
				<SectionNav sections={sectionDefinitions} label="Section Navigator" />
			</ControlBar>
			<section id="standard terms" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
				<h1>Standard Terms</h1>
				<ol>
					<li><span className="termName">Restoring</span>: You restore missing resources, and any restored resource that exceeds your total is lost.  For example, if you are missing 5 Verve and Restore 10 Verve, 5 are lost.</li>
					<li><span className="termName">Gaining Verve</span>: You gain missing resources, and any gained that exceeds your total becomes temporary resources.  For example, if you are missing 3 Verve and Restore 10 Verve, you gain 7 Temporary Verve.</li>
					<li><span className="termName">World Changer</span>: Rolling 2 20s or 2 1s results in a World Changing Effect.  A world changer occurs between the 1 or 2 players who rolled the 20s or 1s.  On a Positive World Changer (2 20s) all players involved may propose a benefit to them that involves the Moves used to trigger the World Changer.  On a Negative World Changer, the DM will apply a negative one.</li>
					<li><span className="termName">Personal World Changer</span>: A World Changer that applied to 1 player only.</li>
					<li><span className="termName">Raw Roll</span>: The exact number shown on the dice you rolled.</li>
					<li><span className="termName">DC Penalty</span>: The DC of your Roll is more difficult, as stated by the Penalty&apos;s terms.</li>
				</ol>
			</section>
			<section id="wellness terms" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
				<h1>Wellness Terms</h1>
				<ol>
					<li><span className="termName">UDR</span>: Universal Damage Resistance, a reduction to any kind of damage that you take.</li>
					<li>
						<span className="termName">Base Damage</span>: The Damage you deal with various Moves. Comes in 3 flavours:
						<ul>
							<li>Melee Based Damage: Equal to 1 plus your STR bonus, your weapon&apos;s Damage, plus any buffs you have to Melee Base Damage.</li>
							<li>Ranged Based Damage: Equal to 1 plus your DEX bonus, your weapon&apos;s Damage, plus any buffs you have to Ranged Base Damage.</li>
							<li>Spell Based Damage: Equal to 1 plus your INT bonus, your Spell&apos;s Damage plus any buffs you have to Spell Base Damage.</li>
							<li>Psi Based Damage: Equal to 1 plus your WIS bonus, plus any buffs you have to Psi Base Damage.</li>
						</ul>
					</li>
					<li><span className="termName">UDR</span>: Universal Damage Resistance, a reduction to any kind of damage that you take.</li>
					<li><span className="termName">PDR</span>: Physical Damage Resistance, a reduction to physical damage that you take.</li>
					<li><span className="termName">MDR</span>: Magical Damage Resistance, a reduction to magial damage that you take.</li>
					<li><span className="termName">DR</span>: An opponents Defensive Rating.  An opponent may Dodge or Block or have another more interesting Defense, but each must be overcome by the attacking player the same way.</li>
					<li><span className="termName">Grappled</span>: 2 or more characters are locked in a state of Grapple.  The one who is Grappling may release the Grapple as a Free Action, or may attempt a single Basic Attack against them.  The one who is Grappled may attempt to break free, or may attempt a single Basic Attack against the Grappler.</li>
				</ol>
			</section>
			<section id="combat terms" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
				<h1>Combat Terms</h1>
				<ol>
					<li><span className="termName">Threatened Area</span>: Squares that your melee weapon can reach.  For most, this is 1 adjacent square.  For enemies, Threatening Range may also extend to their Special Move and unusually long reach.</li>
					<li><span className="termName">Stagger</span>: A measurement of how unbalanced a target is.  Each point in Stagger reduces the requirement for a successful Roll to Trip, Grapple and Disarm a target.</li>
					<li><span className="termName">NAME</span>: Effect.</li>
					<li><span className="termName">Flanked</span>: See the Flanked Status for more information.</li>
					<li><span className="termName">Difficult Terrain</span>: Ground that is unstable, whether due to rocks, vines, or magical effects.  Moving over difficult terrain halves your Movement Sq.</li>
					<li><span className="termName">Maximum Block / Dodge</span>: This is the maximum that you can apply to the Block and Dodge Moves to resist Basic Attacks.  It does not apply to magic Spells.</li>
				</ol>
			</section>
			<section id="magic terms" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
				<h1>Magic Terms</h1>
				<ol>
					<li><span className="termName">Critical Cast</span>: A spell that requires you pierce your target&apos;s Defenses, for which you achieve a Raw Roll within your Critical Range, typically 20.</li>
				</ol>
			</section>
		</ContentPageContainer>
	);
}