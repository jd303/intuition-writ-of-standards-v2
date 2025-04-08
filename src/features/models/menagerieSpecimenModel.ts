enum MenagerieType {
	Arcanic = "Arcanic",
	Beast = "Beast",
	Fae = "Fae",
	Generic = "Generic",
	Humanoid = "Humanoid",
	Monstrous = "Monstrous",
	NPC = "NPC",
	Undead = "Undead"
}

enum MenagerieSize {
	tiny = "Tiny",
	small = "Small",
	medium = "Medium",
	large = "Large",
	huge = "Huge",
	gigantic = "Gigantic"
}

export interface MenagerieSpecimenMove {
	movename: string,
	movetype: string,
	movecooldown: number,
	moveenergy: string,
	movedesc: string,
	moveeffects: string,
	movesave: string,
	companionable: boolean,
}

export interface MenagerieSpecimenModel {
	id: string,
	name: string,
	type: MenagerieType,
	dc: number,
	speed: number,
	size: MenagerieSize,
	image: string,
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
	verve: number,
	combatmoves: MenagerieSpecimenMove[],
	resistances: string,
	weaknesses: string,
	properties: string,
	description: string,
	companionable: boolean,

	// Active Model properties
	_unique_id?: string,
	base?: string,
	notes?: string,
	statuses?: any[],
	current_verve?: number,
}

export interface MenagerieSpecimenDataModel {
	id: string,
	name: string,
	type: MenagerieType,
	dc: number,
	speed: number,
	size: MenagerieSize,
	image: string,
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
	verve: number,
	combatmoves: MenagerieSpecimenMove[],
	resistances: string,
	weaknesses: string,
	properties: string,
	description: string,
	companionable: boolean,

	movename: string,
	movetype: string,
	movecooldown: number,
	moveenergy: string,
	movedesc: string,
	moveeffects: string,
	movesave: string,

	// Active Model properties
	_unique_id?: string,
	base?: string,
	notes?: string,
	statuses?: any[],
	current_verve?: number,
}