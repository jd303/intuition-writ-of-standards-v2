import icoStrength from '/images/icons/ico.fist.svg';
import icoConstitution from '/images/icons/ico.runningman.svg';
import icoDexterity from '/images/icons/ico.heartbeat.svg';
import icoIntelligence from '/images/icons/ico.brain.svg';
import icoWisdom from '/images/icons/ico.puzzlebrain.svg';
import icoCharisma from '/images/icons/ico.thumbsup.svg';

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