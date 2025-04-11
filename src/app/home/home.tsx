import { Link } from "react-router";
import { useAuthState } from "../../features/firebase/firebase";
import st from './home.module.css';

export default function Menu() {
	const auth = useAuthState();

	return (
		<main className={`${st.outerContainer} ${st.menuContainer}`}>
			<LogoCard></LogoCard>
			{cards.map(({ image, label, colour, route, authLevel }, index) => (
				authLevel <= auth.authLevel && <NavCard key={index} image={image} label={label} colour={colour} route={route} index={index}></NavCard>
			))}
		</main>
	);
}

function LogoCard() {
	return (
		<div className={st.menuCard}>
			<img className="logo" src="/public/images/lg.intuition.svg" alt="" />
		</div>
	);
}

function NavCard({ image, label, colour, route, index }: { image?: string, label: string, colour: string, route: string, index: number }) {
	return (
		<Link to={route} className={[st.menuCard, st[`link_${index}`]].join(' ')}>
			<img className={st.image} src={image} alt="" />
			<div className={st.label + ' trattatello'}>{label}</div>
			<div className={colour}></div>
		</Link>
	);
}

const cards = [
	{ image: "/public/images/gr.home.accounts.webp", label: "ACCOUNT", colour:"bg-orange-300", route: "/account", authLevel: 0 },
	{ image: "/public/images/gr.home.characters.webp", label: "CHARACTERS", colour:"bg-blue-300", route: "/characters", authLevel: 1 },
	{ image: "/public/images/gr.home.rules.png", label: "RULES", colour:"bg-slate-300", route: "/rules", authLevel: 0 },
	{ image: "/public/images/gr.home.moves.png", label: "MOVES", colour:"bg-green-300", route: "/moves", authLevel: 0 },
	{ image: "/public/images/gr.home.magic.png", label: "MAGIC", colour:"bg-yellow-300", route: "/magic", authLevel: 0 },
	{ image: "/public/images/gr.home.psionics.png", label: "PSIONICS", colour:"bg-purple-300", route: "/psionics", authLevel: 0 },
	{ image: "/public/images/gr.home.alchemy.png", label: "ALCHEMY", colour:"bg-teal-300", route: "/achemy", authLevel: 0 },
	{ image: "/public/images/gr.home.gadgetry.png", label: "GADGETRY", colour:"bg-stone-300", route: "/gadgetry", authLevel: 0 },
	{ image: "/public/images/gr.home.companions.png", label: "COMPANIONS", colour:"bg-red-300", route: "/companions", authLevel: 0 },
	{ image: "/public/images/gr.home.costs.png", label: "EQUIPMENT", colour:"bg-zinc-300", route: "/equipment", authLevel: 0 },
	{ image: "/public/images/gr.home.menagerie.png", label: "DM TOOLS", colour:"bg-rose-300", route: "/dm-tools", authLevel: 2 },
]