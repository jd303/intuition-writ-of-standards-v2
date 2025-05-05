import { StatusModel } from "./statusModel";

export interface MenagerieSpecimenMove {
	movename: string,
	moveshape: string,
	movecooldown: number,
	moveenergy: string,
	movedesc: string,
	moveeffects: string,
	movesave: string,
}

export class MenagerieSpecimen {
	id: string;
	name: string;
	type: string;
	dc: number;
	speed: number;
	size: string;
	image: string;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	verve: number;
	resistances: string;
	weaknesses: string;
	properties: string;
	description: string;
	companionable: boolean;
	combatMoves: MenagerieSpecimenMove[];

	constructor(data: MenagerieSpecimenLocalModel | MenagerieSpecimen) {
		this.id = data.id;
		this.name = data.name;
		this.type = data.type;
		this.dc = data.dc;
		this.speed = data.speed;
		this.size = data.size;
		this.image = data.image;
		this.str = data.str;
		this.dex = data.dex;
		this.con = data.con;
		this.int = data.int;
		this.wis = data.wis;
		this.cha = data.cha;
		this.verve = data.verve;
		this.resistances = data.resistances;
		this.weaknesses = data.weaknesses;
		this.properties = data.properties;
		this.description = data.description;
		this.companionable = data.companionable;
		this.combatMoves = data.combatMoves;
	}
}

export interface MenagerieSpecimenDatabaseModel {
	id: string,
	name: string,
	type: string,
	dc: number,
	speed: number,
	size: string,
	image: string,
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
	verve: number,
	movename: string,
	moveshape: string,
	movecooldown: number,
	moveenergy: string,
	movedesc: string,
	moveeffects: string,
	movesave: string,
	resistances: string,
	weaknesses: string,
	properties: string,
	description: string,
	companionable: boolean,
}

export interface MenagerieSpecimenLocalModel {
	id: string,
	name: string,
	type: string,
	dc: number,
	speed: number,
	size: string,
	image: string,
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
	verve: number,
	resistances: string,
	weaknesses: string,
	properties: string,
	description: string,
	companionable: boolean,
	combatMoves: MenagerieSpecimenMove[];
}

export interface MenagerieSpecimenLocalCombatModel {
	id: string;
	combatId: string;
	specimenDC: number;
	base: string;
	notes: string;
	statuses: StatusModel[];
	activeMoveCooldowns: MoveCooldown[];
	turnTaken: boolean;
	current_verve: number;
	active_statuses?: ActiveStatusModel[];
}

export interface ActiveStatusModel {
	desc: string;
	turnsRemaining: number;
}

export interface MoveCooldown {
	moveName: string;
	cooldown: number
}