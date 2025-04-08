import bronzeMedal from "/public/images/icons/ico.medal.bronze.svg";
import silverMedal from "/public/images/icons/ico.medal.silver.svg";
import goldMedal from "/public/images/icons/ico.medal.gold.svg";
import abstrateGoldMedal from "/public/images/icons/ico.medal.abstrategold.svg";

import st from "./medal.module.css";

function Medal( { rarity, size, className }: { rarity: string, size: "small" | "tiny", className?: string } ) {

	let source;
	let alt;
	switch (rarity.toLowerCase()) {
		case "bronze":
		case "common":
			source = bronzeMedal;
			alt = "bronze";
			break;
		case "silver":
		case "uncommon":
			source = silverMedal;
			alt = "silver";
			break;
		case "gold":
		case "rare":
			source = goldMedal;
			alt = "gold";
			break;
		case "abstrategold":
		case "legendary":
			source = abstrateGoldMedal;
			alt = "gold";
			break;
	}

	return <img className={`${st.medal} ${st[size]} ${className}`} src={source} alt={alt} />;
}

export default Medal;
