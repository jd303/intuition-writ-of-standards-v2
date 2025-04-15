import icoStrength from '/public/images/icons/ico.fist.svg';
import icoConstitution from '/public/images/icons/ico.runningman.svg';
import icoDexterity from '/public/images/icons/ico.heartbeat.svg';
import icoIntelligence from '/public/images/icons/ico.brain.svg';
import icoWisdom from '/public/images/icons/ico.puzzlebrain.svg';
import icoCharisma from '/public/images/icons/ico.thumbsup.svg';

export const getAttributeIcon = (attrName: string) => {
	switch (attrName) {
		case "str": return icoStrength;
		case "con": return icoConstitution;
		case "dex": return icoDexterity;
		case "int": return icoIntelligence;
		case "wis": return icoWisdom;
		case "cha": return icoCharisma;
	}
}