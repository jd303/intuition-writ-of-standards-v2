import { useEffect, useRef, useState } from 'react';
import { UIColours } from '../../features/constants/UIColours';
import ControlBar from '../components/controlBar/controlBar';
import SectionNav, { SectionNavDefinition } from '../components/controlBar/sectionNav';
import ContentPageContainer from '../components/contentPage/contentPageContainer';
import { Link } from 'react-router';
import st from './rulesPage.module.css';

export default function RulesPage() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement | null) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
		setSectionDefinitions(sectionRefDefinitions);
	}, [sectionRefs]);

	return (
		<>
			<ContentPageContainer>
				<ControlBar colour={UIColours.orange} className={st.controlBar}>
					<SectionNav label='Jump to' sections={sectionDefinitions} />
				</ControlBar>
				<div className={st.column2}>
					<section className={st.intro} id="intro" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Intro</h1>
						<p>Intuition is a Point-buy system that gives you the freedom to create a character your way.  Instead of using pre-defined classes, each character can invest points in whichever Move or Mods they choose, designing the perfect character for them.</p>
						<p>The system has some core concepts:</p>
					</section>
					<section className={st.characters} id="characters" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Characters</h1>
						<p>Advancement Points, often just called points, are earned at the start of each Session and....</p>
						<p>Whenever you earn an Advancement Point you may spend it immediately, or you may hold it for the duration of the session.  If you spend it during the session on a Move or purchase that you use immediately, it is a Cinematic Spend.  Cinematic Spends on Moves grant you a +1 Bonus to your Move Roll.</p>
						<h2>Attributes</h2>
						<p>Players have 6 values that define their physical and mental attributes.  Attributes add to the number of points that can be spent in Skills; each point in an attribute increases the maximum purchase by 1.  Attributes describe your character in the following way:</p>
						<ul>
							<li>Strength: You are strong, but not necessarily muscular.  You know how to use your body&apos;s strength.</li>
							<li>Dexterity: You are lithe, fast, agile or a combination of the 3.</li>
							<li>Constitution: You are hardy or stubborn.</li>
							<li>Intelligence: You grasp concepts quickly, and can process information in ways that some cannot.</li>
							<li>Wisdom: You have lived and experienced, and can apply your experiences to situations you encounter.</li>
							<li>Charisma: You have a force of will, or a memorable character.</li>
						</ul>
						<h2>Skill Purchases</h2>
						<p>Players cannot purchase Skill Points unfettered.  Skill are limited, the rules of which are as follows:</p>
						<ul>
							<li>You can purchase a Skill point if it does not exceed maximum.</li>
							<li>The maximum number of points that you may spend in any Skill is equal to 1 every 8 sessions, plus the value of the Stat that applies to the Skill.  For example at level 1 and with a vale of 1 in Constitution, you may purchase 2 points in the Rest Skill.</li>
						</ul>
					</section>
					<section className={st.moves} id="skills" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Skills</h1>
						<p>Characters advance by progressing in Skills.  A skill is a category of Moves that you can choose to make when you choose your actions in and out of combat.  For example, the Athletics Skill has the Relocate and Jump Moves, amongst others.</p>
						<h1>Moves</h1>
						<p>These are motions you make that rely on your expertise or chance, or which another character may resist.  When you swing an axe, Summon the power of Flow to your whims, talk down a rampaging Orc, or paint a picturesque landscape, you are using a Move.</p>
						<h2>Resolving Moves</h2>
						<p>When asked to resolve a Move, you roll a d20 and add the number of points that you have spent on its parent Skill, and then finaly add any bonuses you get from magic, abilities and items.  Your DM will tell you if it is successful or unsuccessful.</p>
						<h2>Preparing Moves</h2>
						<p>You may elect a Move and a Mod, and set a Trigger condition.  If this condition occurs, you act at the same time as the Triggering action (before or after, whichever makes the most sense and that you have the capacity to achieve).</p>
						<p>If your Trigger was for an ally and the condition does not occur, you may change your Primary Action after everyone has taken their turn.  If your Trigger was for an opponent&apos;s action and it does not occur, you lose your Primary Action that turn.</p>
					</section>
					<section className={st.expertises} id="expertises" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Expertises</h1>
						<p>Each Move has multiple Mods that make your application of a Move unique.  Anyone can Swing a Sword, but can they do it while leaping down from a higher vantage point?  Novice Channelers can create dancing lights, but only those trained in the body as well as the mind can leap metres forward into battle with a spell ready to place directly on their enemy&lsquo;s chest.</p>
						<p><strong>Flowing:</strong> Any character that chooses three different Mods on their Primary Action each turn (not Quick or Reaction Actions) gain the Flowing Status.</p>
					</section>
					<section className={st.dice} id="dice" ref={(el) => (sectionRefs.current[4] = el)}>
						<h1>Dice & Rolling</h1>
						<p>Describe rolls.  Describe bonuses (no stats, just skill points and magic bonuses).</p>
						<p>Describe Raw Rolls</p>
						<p>Describe Move Rolls</p>
						<p>Describe rerolls</p>
					</section>
					<section className={st.actions} id="actions" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Actions</h1>
						<p>Each player has a number of actions available to them in any turn of combat.  You may use each type of Action once per turn, if they are available to you.  These are:</p>
						<ol>
							<li><strong>Primary Action</strong>: You resolve a Primary Move, such as Combat or Cast a Spell</li>
							<li><strong>Relocate Action</strong>: You use the Relocate Move, or use a Move Mod which resolves using your Relocate Action</li>
							<li><strong>Quick Action</strong>: You use a Move Mod which resolves as a Quick Action instead of a Primary Action.</li>
							<li><strong>Free Action</strong>: A rare move type, granted by certain skills and conditions.  Players have an infinite number of Free Actions.  When choosing to use a Free Action, this may only occur on your turn.  When told to resolve it by a Move or Rule, it occurs immediately.</li>
						</ol>
					</section>
					<section className={st.combat} id="combat" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Combat</h1>
						<p>Rules here</p>
						<h1>Creatures in Combat</h1>
						<p>Talk about basic and special attacks</p>
						<p>Talk about how some basic attacks ignore Dodge or Block</p>
						<p>Talk about how most have bad special attacks.  You can use Stagger to slow this down.  If you&apos;ve applied a Stagger in a turn, creatures get resistance to 1 Stagger that turn.  So applying a second requires 3 Stagger all up.</p>
					</section>
					<section className={st.magic} id="magic" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>Magic</h1>
						<p>Magic is detailed on the <Link to="/magic/guide">Magic Guide Page</Link></p>
					</section>
					<section className={st.worldchangers} id="worldchangers" ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)}>
						<h1>World Changers</h1>
						<p>When one or more players roll 2x20 (positive) or 2x1 (negative) on subsequent D20, a World Changing event occurs.</p>
						<p>When positive, all involved players request of the DM an event or bonus that relates to the events that triggered the 20s, that could occur within the next short while.</p>
						<p>When negative, the DM will apply a negative event or bonus that relates to the events that triggered the 1s, that usually occurs within the next short while.</p>
					</section>
				</div>
			</ContentPageContainer>
		</>
	);
}