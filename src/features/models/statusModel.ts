export interface StatusModel {
	duration: string,
	id: string,
	negative: boolean,
	name: string,
	effect: string,
	domain: string,
	turnsRemaining?: number,
}