import { useEffect, useRef, useState } from "react";
import ContentPageContainer from "../components/contentPage/contentPageContainer";
import ControlBar from "../components/controlBar/controlBar";
import { UIColours } from "../../features/constants/UIColours";
import SectionNav, { SectionNavDefinition } from "../components/controlBar/sectionNav";
import { Link } from "react-router";

function MagicGuidePage() {
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const [sectionDefinitions, setSectionDefinitions] = useState<SectionNavDefinition[]>([]);
	useEffect(() => {
		const sectionRefDefinitions: SectionNavDefinition[] = sectionRefs.current.map((sectionRef: HTMLElement | null) => { return { name: sectionRef?.getAttribute('id'), element: sectionRef } });
		setSectionDefinitions(sectionRefDefinitions);
	}, [sectionRefs]);

	return (
		<ContentPageContainer>
			<ControlBar colour={UIColours.purple}>
				<SectionNav sections={sectionDefinitions} label={"Jump to"} />
			</ControlBar>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="overview">
				<h1>Overview</h1>
				<p>There are some rare few that can take the Flow that passes through their Source and work it into wondrous spells.  Some call them gods, freaks, healers, untrustworthy twisters of nature.  Whatever you call them, Source Weavers, as the Occurrens officially refers to them, are powerful - and with the right training could change the world.</p>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="the choice">
				<h1>The Choice</h1>
				<p>A strange thing happens to about 5% of the population of Alhember: they dream of complex and confrontational emotional events that may or may not have happened, and are offered a Choice. Most know that they are being offered a Choice, though most do not really know what they are Choosing. Those that agree to The Choice awaken with the ability to shape Magics and Cast Spells.</p>
				<p>One who has agreed to the Choice is considered awakened, cursed, troubled, sage or empowered, depending on who you ask. One who denies The Choice is saved, powerless, enlightened, or feebled - but are otherwise not really affected. Most receive The Dream of Choosing in their teens, though extremely rare cases arise of those in later, or even younger years.</p>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="learning">
				<h1>Learning Spells</h1>
				<h2>Source</h2>
				<p>Every sentient creature on Alhember, save the monstrous, undead, demonic or abberative, are born with a Source.  Researchers, such as the Heirs of the True Source, are unable to determine predictable patterns as to which Source a person develops, though those who match the season that they are born in tend to achieve grander feats of magic.</p>
				<p>The Source that you choose determines which spells you can learn.  Choose your Source well, or let your character's background decide.</p>
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
				<h2>Buying and Forgetting Spells</h2>
				<p>There are two key Moves you can take to learn and forget spells.  These are available under the Spellcraft Skill as Learn Spell and Forget Spell, and are explained on the <Link to="/rules/moves">Rules: Moves page</Link>, as well as on your Character Sheet.</p>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="casting">
				<h1>Casting Spells</h1>
				<p>A Source Weaver casts wondrous spells that can perform feats unavailable to the mundane.  To cast a Spell, a Source Weaver must be able to expend Mana and Components, perform the Cast a Spell Action, and choose a Spell Severity and targets, then resolve the effects.  Some spells last for longer than instantaneous - for these spells the Source Weaver should be ready to apply the effects whenever they apply, and be aware of the duration.</p>
				<h2>Actions</h2>
				<p>Casting a spell is typically a Primary Action, as per the Cast a Spell Move.  Additionally, users can typically only cast one spell per turn.  However, some spells can be cast as:</p>
				<ul>
					<li>A Reaction: These spells can be cast anytime that the conditions are met, and do not count towards your one spell per turn limitation.</li>
					<li>A Quick Action: These spells (or Expertises and Passives which allow you to cast spells as a Quick Action) can be cast on your turn using only your Quick Action, though the limitation of one spell per turn applies still.</li>
				</ul>
				<h2>Choosing a Spell Severity</h2>
				<p>Spells can be cast at three different severities:</p>
				<ul>
					<li>Cantrip: Typically cheap and quick to cast.</li>
					<li>Standard: The default spell.</li>
					<li>Empowered: Typically expensive, but can provide decisive gamechangers under the right conditions.  You cannot choose the Empowered Spell Severity until you have 5 points in the Cast Skill.</li>
				</ul>
				<h2>Energies and Synergy</h2>
				<p>Every player may choose an energy type with which they have a Synergy.  Up to two additional Synergies may be purchased.</p>
				<p>When casting a spell that uses Synergy (such as the Energistic spells), you modify the type of Verve Loss that you apply.  This Verve Loss may be resisted or increased as part of your target's weaknesses.</p>
				<p>Additionally, performing a Critical Cast with a Synergistic spell applies additional effects:</p>
				<ul>
					<li><strong>Pyral:</strong> (19-20) Apply the Damage Over Time: Bleeding Status to your target at a DC equal to your Spell Severity.</li>
					<li><strong>Cryonic:</strong> (19-20) Apply the Stunned / Slowed: Chilled Status to your target at a DC equal to your Spell Severity.</li>
					<li><strong>Electric:</strong> (20) Apply half the Unresolved Spell Damage to all targets (friend or foe) within DC squares of the target or center of the Spell Effect, that did not already receive the effects of the spell.</li>
					<li><strong>Zephyral:</strong> (18-20) Apply the Debilitated: Gusted Status to all targets.</li>
					<li><strong>Acidic:</strong> (20) Apply the Damage Over Time: Melting Status to your target at a DC equal to your Spell Severity.</li>
					<li><strong>Sonic:</strong> (19-20) Resolve a Raw Roll.  On an 11+, apply the Deaf Status to your target.  They do not get a save for this effect.</li> 
					<li><strong>Luminal:</strong> (20) Resolve a Raw Roll.  On an 11+, apply the Blind Status to your target.  They do not get a save for this effect.</li>
					<li><strong>Umbral:</strong> (20) Apply the Discordant: Jinxed Status to your target.  They do not get a save for this effect.</li>
					<li><strong>Arcanic:</strong> (20) Restore 1 Mana per Spell Severity.</li>
				</ul>
				<h2>Resolving spell success and failure</h2>
				<p>When casting spells, players should resolve the success or failure of the spell.  A spell succeeds or fails under these conditions:</p>
				<ul>
					<li>Spells always fail on a roll of 1.</li>
					<li>Spells that have a Save listed, that are aimed at unwilling targets, must exceed the target's save to succeed.</li>
					<li>All spells that fail still expend the Mana and time used to cast the spell.</li>
					<li>Spells that use a Synergy are treated as Critical Casts if they meet the Raw Roll range as listed above in Synergies.</li>
				</ul>
				<p>In this way, a casting of a spell is considered a success if the spell does not have a Save, or does not need to resolve it's Save, and the player does not roll a 1 when resolving the Cast A Spell Move.  Under these conditions players are welcome to describe the spell's effects without waiting for the DM.</p>
				<h2>Duration and Mainting Spells</h2>
				<p>Spells that do not have a Duration of Instant linger.  Spells have the following Durations:</p>
				<ul>
					<li><strong>Instant:</strong> The spell's effects are resolved immediately, and the spell ends.  In some circumstances, the effects of the spell may remain, such as Verve Loss healing which does not undo.</li>
					<li><strong>Short:</strong> 3 Rounds.</li>
					<li><strong>Long:</strong> Typically 10 minutes.  Though you may ask the DM if some Long Duration spells linger longer.</li>
				</ul>
				<p>Players may maintain 1 Spell that has a duration longer than Instant.  If attacked, grappled, or otherwise in a situation where your concentration may be hard to maintain, you may be asked to perform the Maintain Spell Move, in the Knowing Skill.</p>
				<h2>Components</h2>
				<p>Magic comes from within, and for this reason there are very few spells that require material components.  Some divination or world-changing spells require the sacrifice of items with material worth, and scholars argue where this sacrifice goes - perhaps to an unseen entity who provides the final weavings of the Flow to produce the effects, or perhaps the Gods.</p>
				<p>However all spells have Verbal and Somatic components, making the casting of spells noticeable to those around the caster, and requiring free movement.</p>
				<h2>Shapes</h2>
				<p>Spells have Shapes, which determine the size, origin, and sometimes the effects of the spell.</p>
				<ul>
					<li><strong>Self:</strong> You may only cast the spell on yourself.</li>
					<li><strong>Touch:</strong> An adjacent creature.</li>
					<li><strong>SVT (Single Visible Target):</strong> You may cast the spell on any target that you can perceive, that you have line of sight to.</li>
					<li><strong>Volume:</strong> You may place a centre-most point anywhere you can see, and the volume extends 3sq. from that point in all 4 cardinal directions, creating a diamond shape.</li>
					<li><strong>Cone:</strong> Originating from you, the cone extends 6sq in a line, and 6sq. perpendicular at its end.</li>
					<li><strong>Wall:</strong> You may place the centre-most point of the wall anywhere you can see, and it extends 8sq in both directions as a straight line at any angle of your choice.</li>
					<li><strong>Aura:</strong> You are always the centre-most point of the spell, and the aura moves as you do.  Creatures that enter the aura resolve the effects on themselves immediately.  The spell effect then ends for any creature who is not in the aura, at the end of their turn.</li>
				</ul>
			</section>
			<section ref={(el) => (sectionRefs.current[sectionRefs.current.length] = el)} id="potions and enchanting">
				<h1>Potions & Enchanting</h1>
				<p>Source Weavers may brew magical potions and Enchant items with their magic.  The rules for these can be found under Concoct Magic Potion, Enchant Item, Inscribe Magic Scroll and Infuse Runic Seal Moves, on the <Link to="/rules/moves">Rules: Moves page</Link>, as well as on your Character Sheet.</p>
			</section>
		</ContentPageContainer>
	)
}

export default MagicGuidePage;
