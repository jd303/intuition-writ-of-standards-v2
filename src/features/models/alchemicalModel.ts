export interface AlchemicalModel {
	id: string,
	type: string,
	subtype: string,
	name: string,
	effects: string,
	desc: string,
	time?: string,
	reagents: string,
	rarity: string | number,
}

export enum ReagentComponents {
	For = "Fortify",
	The = "Thermality",
	Hyd = "Hydrant",
	Vig = "Vigour",
	Soo = "Soothe",
	Exc = "Excite",
	Con = "Confusion",
	Cor = "Corrode",
	Poi = "Poison",
	Oil = "Oil",
	Sce = "scent",
	Wil = "Wild",
  };