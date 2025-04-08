import icoStrength from '/public/images/icons/ico.fist.svg';
import icoConstitution from '/public/images/icons/ico.runningman.svg';
import icoDexterity from '/public/images/icons/ico.heartbeat.svg';
import icoIntelligence from '/public/images/icons/ico.brain.svg';
import icoWisdom from '/public/images/icons/ico.puzzlebrain.svg';
import icoCharisma from '/public/images/icons/ico.thumbsup.svg';

export const getAttributeIcon = (attrName: string) => {
	switch (attrName) {
		case "strength": return icoStrength;
		case "constitution": return icoConstitution;
		case "dexterity": return icoDexterity;
		case "intelligence": return icoIntelligence;
		case "wisdom": return icoWisdom;
		case "charisma": return icoCharisma;
	}
}