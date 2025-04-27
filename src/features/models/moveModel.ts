export interface MoveModel {
	id: string,
	category: string,
	name: string,
	stat: string,
	trained?: boolean,
	type: string,
	description: string,
	expertises?: MoveModel[],
}