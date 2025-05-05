import st from './menagerieSpecimenMoveBlock.module.css';
import { MenagerieSpecimenLocalCombatModel, MenagerieSpecimenMove, MoveCooldown } from '../../../features/models/menagerieSpecimenModel';
import { useState } from 'react';

function SpecimenCombatMove({ move, specimenCombatData, activeSpecimenCombatData, setActiveSpecimenCombatData, combatModifyCallback }: {
	move: MenagerieSpecimenMove,
	specimenCombatData: MenagerieSpecimenLocalCombatModel,
	activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel,
	setActiveSpecimenCombatData: (activeSpecimenData: MenagerieSpecimenLocalCombatModel) => void,
	combatModifyCallback: (activeSpecimenData: MenagerieSpecimenLocalCombatModel) => void,
}) {
	const [moveControlsVisible, setMoveControlsVisible] = useState(false);
	const toggleControlsVisible = () => setMoveControlsVisible(!moveControlsVisible);
	
	// Move Management Options
	const activateMoveCooldown = (moveName: string, moveCooldown: number) => {
		const activeSpecimenData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		const moveCooldowns = activeSpecimenData.activeMoveCooldowns as MoveCooldown[] || [];
		const existingMoveCooldownIndex = moveCooldowns.findIndex((cd) => cd.moveName == moveName);

		if (existingMoveCooldownIndex != -1) moveCooldowns[existingMoveCooldownIndex].cooldown = moveCooldown + 1;
		else moveCooldowns.push({ moveName: moveName, cooldown: moveCooldown + 1 });

		activeSpecimenData.turnTaken = true;
		activeSpecimenData.activeMoveCooldowns = moveCooldowns;
		setActiveSpecimenCombatData(activeSpecimenData);
		combatModifyCallback!(activeSpecimenData);
	}

	const clearMoveCooldown = (moveName: string) => {
		const activeSpecimenData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		activeSpecimenData.activeMoveCooldowns = (activeSpecimenData.activeMoveCooldowns as MoveCooldown[])?.filter(cd => cd.moveName != moveName);
		setActiveSpecimenCombatData(activeSpecimenData);
		combatModifyCallback!(activeSpecimenData);
	}

	const getActiveCooldown = (moveName: string, moveCooldown: number) => {
		const moveCooldowns: MoveCooldown[] = activeSpecimenCombatData?.activeMoveCooldowns as MoveCooldown[];
		const thisMoveCooldown = moveCooldowns?.find(cd => cd.moveName == moveName);
		if (thisMoveCooldown && thisMoveCooldown.cooldown > 0) {
			return `-${Math.min(thisMoveCooldown.cooldown, moveCooldown)}`;
		} else return moveCooldown;
	}

	const getCooldownClass = (moveName: string) => {
		const moveCooldowns: MoveCooldown[] = activeSpecimenCombatData?.activeMoveCooldowns as MoveCooldown[];
		const thisMoveCooldown = moveCooldowns?.find(cd => cd.moveName == moveName);
		if (thisMoveCooldown && thisMoveCooldown.cooldown > 0) {
			return st.coolingDown;
		} else return '';
	}

	return (
		<div className={[st.move, getCooldownClass(move.movename)].join(' ')} data-controlsvisible={moveControlsVisible} onClick={toggleControlsVisible}>
			<div className={st.moveTitle + ' ' + st.fonted}>
				{move.movename} ({move.moveshape})
				<div className={st.energy}>{move.moveenergy}</div>
			</div>
			<div className={st.moveDefences}>
				<span><span className={st.fonted}>CD:</span> {getActiveCooldown(move.movename, move.movecooldown)}</span>
				<span><span className={st.fonted}>Save:</span> {move.movesave}</span>
			</div>
			<div className={st.moveEffects}>
				<span className={st.desc}>{move.movedesc}</span> <span>{move.moveeffects}</span>
			</div>
			<div className={st.moveControls}>
				<button onClick={(e) => { e.preventDefault(); activateMoveCooldown(move.movename, move.movecooldown); }}>Activate</button>
				<button onClick={() => clearMoveCooldown(move.movename)}>Clear</button>
			</div>
		</div>
	)
}

export default SpecimenCombatMove;