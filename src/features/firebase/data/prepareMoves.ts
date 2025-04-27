import { MoveModel } from "../../models/moveModel";

export type MovesCategories = Record<string, MovesCategorisation>;

export interface MovesCategorisation {
	category: string,
	skill?: MoveModel,
	moves: MoveModel[],
	passives: MoveModel[],
	purchaseIds: string[],
}

export const prepareMoves = (movesData: MoveModel[]) => {
	const response: MovesCategories = {};
	let lastMove: MoveModel | null = null;
	let skillStat: string;
	let currentCategory: string;
	
	movesData.forEach((moveDataItem: MoveModel) => {
		currentCategory = moveDataItem.category;
		if (!response[currentCategory]) response[currentCategory] = createCategory(moveDataItem.name);

		switch (moveDataItem.type) {
			case "Skill":
				lastMove = null;
				response[currentCategory].skill = moveDataItem;
				skillStat = moveDataItem.stat;
				if (!response[currentCategory].purchaseIds.includes(moveDataItem.id)) response[currentCategory].purchaseIds.push(moveDataItem.id);
			break;
			case "Expertise":
				if (lastMove != null) {
					const lastMoveReference = response[currentCategory].moves.find((move) => move.id == lastMove!.id);
					if (!lastMoveReference) break;
					if (!lastMoveReference.expertises) lastMoveReference.expertises = [];
					lastMoveReference.expertises.push({ ...moveDataItem, stat: skillStat });
					if (!response[currentCategory].purchaseIds.includes(moveDataItem.id)) response[currentCategory].purchaseIds.push(moveDataItem.id);
				}
			break;
			case "Passive":
				response[currentCategory].passives.push({ ...moveDataItem, stat: skillStat });
				if (!response[currentCategory].purchaseIds.includes(moveDataItem.id)) response[currentCategory].purchaseIds.push(moveDataItem.id);
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
		purchaseIds: []
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