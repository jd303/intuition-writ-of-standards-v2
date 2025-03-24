import { Link } from 'react-router';
import st from './companionsGuidePage.module.css';

import bronzeMedal from "/public/images/icons/ico.medal.bronze.svg";
import silverMedal from "/public/images/icons/ico.medal.silver.svg";
import goldMedal from "/public/images/icons/ico.medal.gold.svg";

export default function CompanionsGuidePage() {
	return (
		<>
			<section>
				<h1>Companions Guide</h1>
				<p>Earning the loyalty of a companion is a magnificent feat, cerating a bond for life.  You must take care of them, ensure that they have food and water, and indulge them in all their needs, especially if you manage to create a bond with a weird and fantastical monstrous creature.</p>
			</section>
			<section>
				<h1>Controlling Companions</h1>
				<ul>
					<li>A companion has two Actions during Initiative Mode: Relocate and Primary.</li>
					<li>Companions do not get access to Expertises, though you may apply any traits that a companion has, such as flying and swimming, when resolving a Move.</li>
					<li>They take their turn at the same time as you; either before, after, or split with your actions.  You may not delay your companion's actions unless you delay your own.</li>
					<li>You gain immediate access to Basic Moves on the <Link to="/companions/moves">Moves Page</Link> (represented with a <img className={st.image} src={bronzeMedal} alt="Basic" />), but must purchase Standard <img className={st.image} src={silverMedal} alt="Standard" /> and Advanced Moves <img className={st.image} src={goldMedal} alt="Advanced" /> by making purchases on the Character Sheet page.</li>
				</ul>
			</section>
		</>
	);
}