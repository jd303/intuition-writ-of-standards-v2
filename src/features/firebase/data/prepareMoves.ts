import { Move } from "../../models/moveModel";

export type MovesCategories = Record<string, MovesCategorisation>;

export interface MovesCategorisation {
	category: string,
	skill?: Move,
	moves: Move[],
	passives: Move[],
}

const categoryGrouping = {
	wellness: [
		'preparedness',
		'defences',
	],
	combat: [
		'combat',
	],
	general: [
		'perception',
		'athletics',
		'knowledge',
		'influence',
	],
	skilled: [
		'engineering',
		'crafty',
		'deception',
	],
	magic: [
		'magic',
	],
	inner_power: [
		'inner_power'
	],
	beast_mastery: [
		'beast_mastery'
	],
	psionics: [
		'psionics'
	]
}

export const prepareMoves = (movesData: Move[]) => {
	//const movesData = [...providedData];
	const response: MovesCategories = {};
	let lastMove: Move | null = null;
	let skillStat: string;
	let currentCategory: string;
	
	movesData.forEach((moveDataItem: Move) => {
		currentCategory = moveDataItem.category;
		if (!response[currentCategory]) response[currentCategory] = createCategory(moveDataItem.name);

		switch (moveDataItem.type) {
			case "Skill":
				lastMove = null;
				response[currentCategory].skill = moveDataItem;
				skillStat = moveDataItem.stat;
			break;
			case "Expertise":
				if (lastMove != null) {
					const lastMoveReference = response[currentCategory].moves.find((move) => move.id == lastMove!.id);
					if (!lastMoveReference) break;
					if (!lastMoveReference.expertises) lastMoveReference.expertises = [];
					lastMoveReference.expertises.push({ ...moveDataItem, stat: skillStat });
				}
			break;
			case "Passive":
				response[currentCategory].passives.push({ ...moveDataItem, stat: skillStat });
			break;
			default:
				lastMove = moveDataItem;
				response[currentCategory].moves.push({ ...moveDataItem, stat: skillStat });
		}
	});

	return response;
}

function createCategory(name: string) {
	return {
		category: name,
		skill: undefined,
		moves: [],
		passives: [],
	}
}

/*function createMove(move: Move) {
	return {
		"id": move.id,
		"stat": move.stat,
		"name": move.name,
		"type": move.type,
		"description": move.description,
		"expertises": []
	}
}

function createExpertise(expertise: Move) {
	return {
		"id": expertise.id,
		"name": expertise.name,
		"type": expertise.type,
		"description": expertise.description
	}
}*/