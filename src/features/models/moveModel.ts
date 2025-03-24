export interface Move {
	id: string,
	category: string,
	name: string,
	stat: string,
	type: string,
	description: string,
	expertises?: Move[],
}