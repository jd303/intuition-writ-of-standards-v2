export const prepareMonster = (monster: any) => {
	const newMonster = { ...monster };
	newMonster.combatmoves = newMonster.combatmoves?.split("--") || [];
	newMonster.combatmoves = prepareCombatMoves(newMonster.combatmoves);
	newMonster.properties = newMonster.properties?.split("--") || [];
	newMonster.max_verve = newMonster.verve;
	newMonster.current_verve = newMonster.verve;
	newMonster.statuses = [];
	return newMonster;
}

export const prepareCombatMoves = (moves: any[]) => {
	moves = moves.map(move => {
		const moveSplit = move.split("|");
		return {
			name: moveSplit[0]?.trim(),
			moveRange: moveSplit[1]?.trim(),
			cooldown: JSON.parse(moveSplit[2] && moveSplit[2].trim() || false),
			type: moveSplit[3]?.trim(),
			description: moveSplit[4]?.trim(),
			verve_loss: Number(moveSplit[5]?.trim()) || "",
			save: moveSplit[8]?.trim() || null
		}
	});
	return moves;
}