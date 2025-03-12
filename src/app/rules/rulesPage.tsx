import st from './rulesPage.module.css';

export default function RulesPage() {

	return (
		<>
			<div className={st.rulesLayout + ' ' + st.mainContent}>
				<div className={st.column1}>
					<a className={st.scrollerButton} href="#intro">Intro</a>
					<a className={st.scrollerButton} href="#characters">Characters</a>
					<a className={st.scrollerButton} href="#moves">Skills &amp; Moves</a>
					<a className={st.scrollerButton} href="#mods">Mods</a>
					<a className={st.scrollerButton} href="#dice">Dice &amp; Rolling</a>
					<a className={st.scrollerButton} href="#actions">Actions</a>
					<a className={st.scrollerButton} href="#combat">Combat</a>
					<a className={st.scrollerButton} href="#magic">Magic</a>
					<a className={st.scrollerButton} href="#worldchangers">World Changers</a>
				</div>
				<div className={st.column2}>
					<section className={st.column} id="intro">
						<p>Intuition is a Point-buy system that gives you the freedom to create a character your way.  Instead of designing classes, each character can invest points in whichever Move or Mods they choose, designing the perfect character.</p>
						<p>The system has some core concepts:</p>
					</section>
					<section className={st.column} id="characters">
						<h2>Characters</h2>
						<p>Advancement Points, often just called points, are earned at the start of each Session and....</p>
						<p>Whenever you earn an Advancement Point you may spend it immediately, or you may hold it for the duration of the session.  If you spend it during the session on a Move or purchase that you use immediately, it is a Cinematic Spend.  Cinematic Spends on Moves grant you a +1 Bonus to your Move Roll.</p>
						<h3>Attributes</h3>
						<p>Players have 6 values that define their physical and mental attributes.  Attributes add to the number of points that can be spent in Skills; each point in an attribute increases the maximum purchase by 1.  Attributes describe your character in the following way:</p>
						<ul>
							<li>Strength: You are strong, but not necessarily muscular.  You know how to use your body&apos;s strength.</li>
							<li>Dexterity: You are lithe, fast, agile or a combination of the 3.</li>
							<li>Constitution: You are hardy or stubborn.</li>
							<li>Intelligence: You grasp concepts quickly, and can process information in ways that some cannot.</li>
							<li>Wisdom: You have lived and experienced, and can apply your experiences to situations you encounter.</li>
							<li>Charisma: You have a force of will, or a memorable character.</li>
						</ul>
						<h3>Skill Purchases</h3>
						<p>Players cannot purchase Skill Points unfettered.  Skill are limited, the rules of which are as follows:</p>
						<ul>
							<li>You can purchase a Skill point if it does not exceed maximum.</li>
							<li>The maximum number of points that you may spend in any Skill is equal to 1 every 8 sessions, plus the value of the Stat that applies to the Skill.  For example at level 1 and with a vale of 1 in Constitution, you may purchase 2 points in the Rest Skill.</li>
						</ul>
					</section>
					<section className={st.column} id="moves">
						<h2>Skills</h2>
						<p>Characters advance by progressing in Skills.  A skill is a category of Moves that you can choose to make when you choose your actions in and out of combat.  For example, the Athletics Skill has the Relocate and Jump Moves, amongst others.</p>
						<h2>Moves</h2>
						<p>These are motions you make that rely on your expertise or chance, or which another character may resist.  When you swing an axe, Summon the power of Flow to your whims, talk down a rampaging Orc, or paint a picturesque landscape, you are using a Move.</p>
						<h3>Resolving Moves</h3>
						<p>When asked to resolve a Move, you roll a d20 and add the number of points that you have spent on its parent Skill, and then finaly add any bonuses you get from magic, abilities and items.  Your DM will tell you if it is successful or unsuccessful.</p>
						<h3>Preparing Moves</h3>
						<p>You may elect a Move and a Mod, and set a Trigger condition.  If this condition occurs, you act at the same time as the Triggering action (before or after, whichever makes the most sense and that you have the capacity to achieve).</p>
						<p>If your Trigger was for an ally and the condition does not occur, you may change your Primary Action after everyone has taken their turn.  If your Trigger was for an opponent&apos;s action and it does not occur, you lose your Primary Action that turn.</p>
					</section>
					<section className={st.column} id="mods">
						<h2>Mods</h2>
						<p>Each Move has multiple Mods that make your application of a Move unique.  Anyone can Swing a Sword, but can they do it while leaping down from a higher vantage point?  Novice Channelers can create dancing lights, but only those trained in the body as well as the mind can leap metres forward into battle with a spell ready to place directly on their enemy&lsquo;s chest.</p>
						<p><strong>Flowing:</strong> Any character that chooses three different Mods on their Primary Action each turn (not Quick or Reaction Actions) gain the Flowing Status.</p>
					</section>
					<section className={st.column} id="dice">
						<h2>Dice & Rolling</h2>
						<p>Describe rolls.  Describe bonuses (no stats, just skill points and magic bonuses).</p>
						<p>Describe Raw Rolls</p>
						<p>Describe Move Rolls</p>
						<p>Describe rerolls</p>
					</section>
					<section className={st.column} id="actions">
						<h2>Actions</h2>
						<p>Each player has a number of actions available to them in any turn of combat.  You may use each type of Action once per turn, if they are available to you.  These are:</p>
						<ol>
							<li><strong>Primary Action</strong>: You resolve a Primary Move, such as Combat or Cast a Spell</li>
							<li><strong>Relocate Action</strong>: You use the Relocate Move, or use a Move Mod which resolves using your Relocate Action</li>
							<li><strong>Quick Action</strong>: You use a Move Mod which resolves as a Quick Action instead of a Primary Action.</li>
							<li><strong>Free Action</strong>: A rare move type, granted by certain skills and conditions.  Players have an infinite number of Free Actions.  When choosing to use a Free Action, this may only occur on your turn.  When told to resolve it by a Move or Rule, it occurs immediately.</li>
						</ol>
					</section>
					<section className={st.column} id="combat">
						<h2>Combat</h2>
						<p>Rules here</p>
						<h2>Creatures in Combat</h2>
						<p>Talk about basic and special attacks</p>
						<p>Talk about how some basic attacks ignore Dodge or Block</p>
						<p>Talk about how most have bad special attacks.  You can use Stagger to slow this down.  If you&apos;ve applied a Stagger in a turn, creatures get resistance to 1 Stagger that turn.  So applying a second requires 3 Stagger all up.</p>
					</section>
					<section className={st.column} id="magic">
						<h2>Magic</h2>
						<h3>The Choice</h3>
						<p>A strange thing happens to about 5% of the population of Alhember: they dream of complex and confrontational emotional events that may or may not have happened, and are offered a Choice.  Most know that they are being offered a Choice, though most do not really know what they are Choosing.  Those that agree to The Choice awaken with the ability to shape Magics and Cast Spells.</p>
						<p>One who has agreed to the Choice is considered awakened, cursed, troubled, sage or empowered, depending on who you ask.  One who denies The Choice is saved, powerless, enlightened, or feebled - but are otherwise not really affected.  Most receive The Dream of Choosing in their teens, though extremely rare cases arise of those in later, or even younger years.</p>
						<h3>Sources</h3>
						<p>Every sentient creature on Alhember, save the monstrous, undead, demonic or abberative, are born with a Source.  Researchers, such as the Heirs of the True Source, are unable to determine predictable patterns as to which Source a person develops, though those who match the season that they are born in tend to achieve grander feats of magic.</p>
						<ul>
							<li>
								<strong>Summer: Innate and Bright</strong><br />
								Those with the Summer Source tend to have a strong will and inner power, and their magics and spells reflect this.  The Summer Source is known for bright magics.
							</li>
							<li>
								<strong>Autumn: Life and Passing</strong><br />
								Those with the Autumn Source draw from the inevitable end of things, both within and without, and their spells reflect this.  The Autumn Source is known for subtle and decaying magics.
							</li>
							<li>
								<strong>Winter: Tapped and Emotional</strong><br />
								Winter Source mages use the lingering energies of all magical things.  Winter magics are subtle and cold.
							</li>
							<li>
								<strong>Spring: Growth and Yearning</strong><br />
								Surrounding themselves with things that yearn to grow enables Spring Mages to weave their magics.  The Spring Source is known for natural and empowering magics.
							</li>
						</ul>
					</section>
					<section className={st.column} id="worldchangers">
						<h2>World Changers</h2>
						<p>When one or more players roll 2x20 (positive) or 2x1 (negative) on subsequent D20, a World Changing event occurs.</p>
						<p>When positive, all involved players request of the DM an event or bonus that relates to the events that triggered the 20s, that could occur within the next short while.</p>
						<p>When negative, the DM will apply a negative event or bonus that relates to the events that triggered the 1s, that usually occurs within the next short while.</p>
					</section>
				</div>
			</div>
		</>
	);
}