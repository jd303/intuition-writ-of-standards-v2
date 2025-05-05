import st from './dmCombatPage.module.css';
import stcl from '../components/contentList/contentList.module.css';
import { UIColours } from '../../features/constants/UIColours';
import { useAppSelector } from '../../features/firebaseHooks';
import MenagerieSpecimenBlock from '../components/beast/menagerieSpecimenBlock';
import ContentCard from '../components/contentList/contentCard';
import ContentList from '../components/contentList/contentList';
import ControlBar from '../components/controlBar/controlBar';
import ToggleButton from '../components/controlBar/toggleButton';
import { useToggleableBooleanState } from '../../features/uiHooks';
import { MenagerieSpecimenLocalCombatModel } from '../../features/models/menagerieSpecimenModel';
import { useCallback, useMemo, useRef, useState } from 'react';
import { writeCombatData } from '../../features/firebase/data/writeCombatData';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from '../components/confirmButton/confirmButton';

export default function DMCombatPage() {
	const navigate = useNavigate();
	const [minimalMode, toggleMinimalMode] = useToggleableBooleanState(false);

	// Data and state
	const combatData = useAppSelector((state) => state.combatData.combat);
	const [activeCombatData, setActiveCombatData] = useState(combatData);

	// Combats data
	const filteredSpecimens = useMemo(() => {
		const combatDataCopy = JSON.parse(JSON.stringify(activeCombatData));
		const combatCreatures = combatDataCopy?.creatures || [];
		combatCreatures.sort((specimenA: MenagerieSpecimenLocalCombatModel, specimenB: MenagerieSpecimenLocalCombatModel) => {
			if (!specimenA.turnTaken && specimenB.turnTaken) return -1;
			else if (specimenA.specimenDC > specimenB.specimenDC) {
				return -1;
			} else {
				return 1;
			}
		});
		return combatCreatures;
	}, [activeCombatData]);

	const combatWriteTimeout = useRef<NodeJS.Timeout>(null);
	const scheduleWriteCombatData = (updatedCombatData: { creatures: MenagerieSpecimenLocalCombatModel[] }) => {
		if (combatWriteTimeout.current) clearTimeout(combatWriteTimeout.current);
		combatWriteTimeout.current = setTimeout(() => {
			writeCombatData(updatedCombatData);
		}, 500);
	}

	// Remove a creature
	const removeCreature = (combatId: string) => {
		const updatedCombatData = {
			creatures: activeCombatData.creatures.filter((specimen) => specimen.combatId! != combatId)
		}
		setActiveCombatData(updatedCombatData);
		scheduleWriteCombatData(updatedCombatData);
	}

	// Modify a creature
	const modifyCombatCreature = (updatedSpecimenData: MenagerieSpecimenLocalCombatModel) => {
		const updatedCombatData = JSON.parse(JSON.stringify(activeCombatData));
		const index = updatedCombatData.creatures.findIndex((specimen: MenagerieSpecimenLocalCombatModel) => specimen.combatId === updatedSpecimenData.combatId);
		if (index !== -1) updatedCombatData.creatures[index] = updatedSpecimenData;
		setActiveCombatData(updatedCombatData);
		scheduleWriteCombatData(updatedCombatData);
	}

	// Generate a next turn
	const nextTurn = () => {
		const updatedCombatData = JSON.parse(JSON.stringify(activeCombatData));
		updatedCombatData.creatures.forEach((specimen: MenagerieSpecimenLocalCombatModel) => {
			specimen.turnTaken = false;
			specimen.activeMoveCooldowns = specimen.activeMoveCooldowns?.filter(cd => cd.cooldown > 1) || [];
			specimen.activeMoveCooldowns.forEach(cd => cd.cooldown -= 1);
			specimen.active_statuses = specimen.active_statuses?.filter(cd => cd.turnsRemaining > 0) || [];
			specimen.active_statuses?.forEach(cd => cd.turnsRemaining -= 1);
		});
		setActiveCombatData(updatedCombatData);
		scheduleWriteCombatData(updatedCombatData);
	}

	// Specimen Data
	const menagerieData = useAppSelector((state) => state.menagerieData.menagerie);
	const getSpecimen = useCallback((specimenId: string) => {
		return menagerieData.find((specimen) => specimen.id == specimenId);
	}, [menagerieData]);

	// Navigation functions
	const menagerieView = () => {
		navigate(`/menagerie`);
	}

	return (
		<>
			<section>
				<ContentList colour={UIColours.grey} style="menagerie_grid" className={st.combatPageLayout}>
					<ControlBar colour={UIColours.grey}>
						<ToggleButton on={minimalMode} toggle={toggleMinimalMode} label="Minimal" />
						<ConfirmButton onClick={nextTurn} label="Next Turn" />
						<button onClick={menagerieView}>Menagerie</button>
					</ControlBar>
					{filteredSpecimens.map((specimenCombatData: MenagerieSpecimenLocalCombatModel, index: number) => (
						<ContentCard colour={UIColours.green} key={`combatant-${specimenCombatData.id}-${index}`} className={stcl.contentListParent}>
							<div className={[st.specimen, stcl.removeParentWhenEmpty].join(' ')}>
								<MenagerieSpecimenBlock specimen={getSpecimen(specimenCombatData.id)!} specimenCombatData={specimenCombatData} viewMode={minimalMode && "min" || "max"} viewContext="combat" combatRemoveCallback={removeCreature} combatModifyCallback={modifyCombatCreature} />
							</div>
						</ContentCard>
					))}
				</ContentList>
			</section>
			<div className={st.quirks}>
				<h2 className={st.title}>Consider quirks</h2>
				<div className={st.quirk}>Defend a position or item - stop enemy approaching, or even doing enough damage to it.</div>
				<div className={st.quirk}>Last x rounds</div>
				<div className={st.quirk}>Escape, not win</div>
				<div className={st.quirk}>Get past dangerous enemies</div>
				<div className={st.quirk}>Prime target: interrupt a ritual, stop a caster, stop a thief</div>
				<div className={st.quirk}>Ever changing scene - set over chase sequence</div>
				<div className={st.quirk}>Weather: wind, beaming sun, snow, rain.</div>
				<div className={st.quirk}>Traps, caltrops, gadgets, expected items.</div>
				<div className={st.quirk}>Give a buff or boon when the players do something.</div>
				<div className={st.quirk}>Give a buff or boon to the enemies when they do something.</div>
				<div className={st.quirk}>The enemy has a fixation on a particular character.</div>
				<div className={st.quirk}>Difficult terrain</div>
				<div className={st.quirk}>Fire or high wind</div>
				<div className={st.quirk}>Moving things: water, carriage, stampeding herd.</div>
				<div className={st.quirk}>Deep holes, or high elevations</div>
				<div className={st.quirk}>Barricades or defenses</div>
			</div>
		</>
	);
}
