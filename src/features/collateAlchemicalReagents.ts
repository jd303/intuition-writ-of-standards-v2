/**
 * Collates same reagents before print
 * */
export const collateAlchemicalReagents = (reagents: string) => {
	const reagentsArray = reagents.split("-");
	const sortedReagents = reagentsArray.sort((a, b) => (a < b && -1) || 1);
	const uniqueReagents: ReagentResponse[] = [];

	sortedReagents.forEach((consideredReagent) => {
		const reagentAdded = uniqueReagents.find((reagent) => reagent.reagent == consideredReagent);
		if (!reagentAdded) {
			uniqueReagents.push({ count: 1, reagent: consideredReagent });
		} else {
			reagentAdded.count += 1;
		}
	});
	
	return uniqueReagents;
};

export interface ReagentResponse {
	count: number;
	reagent: string;
}