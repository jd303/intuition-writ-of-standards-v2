import { MenagerieSpecimenModel, MenagerieSpecimenMove } from '../../../features/models/menagerieSpecimenModel';

import st from './menagerieSpecimenBlock.module.css';
import { ChangeEvent, useState } from 'react';

function MenagerieSpecimenBlock({ menagerieSpecimen, mode }: { menagerieSpecimen: MenagerieSpecimenModel, mode: "view_combat" | "active_combat" | "view_companion" | "active_companion" }) {

	const getCooldownClass = (move: MenagerieSpecimenMove, menagerieSpecimen: MenagerieSpecimenModel) => {
		console.log(move, menagerieSpecimen);
		return '';
	}

	const modifyBase = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const newMonster = { ...menagerieSpecimen, base: value };
		//modifyMonster(newMonster);
	}

	const modifyNotes = (event) => {
		const value = event.target.value;
		const newMonster = { ...menagerieSpecimen, notes: value };
		//modifyMonster(newMonster);
	}

	const verveUp = () => {
		const value = menagerieSpecimen.current_verve;
		const newMonster = { ...menagerieSpecimen, current_verve: value + 1 };
		//modifyMonster(newMonster);
	}

	const verveDown = () => {
		const value = menagerieSpecimen.current_verve;
		const newMonster = { ...menagerieSpecimen, current_verve: value - 1 };
		//modifyMonster(newMonster);
	}

	/*const chargeUp = () => {
		const value = menagerieSpecimen.current_charge;
		const newMonster = { ...menagerieSpecimen, current_charge: value + 1 };
		//modifyMonster(newMonster);
	}

	const chargeDown = () => {
		const value = menagerieSpecimen.current_charge;
		const newMonster = { ...menagerieSpecimen, current_charge: value - 1 };
		//modifyMonster(newMonster);
	}

	const staggerUp = () => {
		const value = menagerieSpecimen.current_stagger;
		const newMonster = { ...menagerieSpecimen, current_stagger: value + 1 };
		//modifyMonster(newMonster);
	}

	const staggerDown = () => {
		const value = menagerieSpecimen.current_stagger;
		const newMonster = { ...menagerieSpecimen, current_stagger: value - 1 };
		//modifyMonster(newMonster);
	}*/

	const applyStatusOrDuration = (status) => {
		const statusesValue = [...menagerieSpecimen.statuses] || [];

		const existingStatus = statusesValue.find(comparedStatus => comparedStatus.id == status.id);
		if (existingStatus) {
			existingStatus.duration += getDuration(status);
		} else {
			statusesValue.push({ ...status, duration: getDuration(status) });
		}

		const newMonster = { ...menagerieSpecimen, statuses: statusesValue };
		//modifyMonster(newMonster);

		function getDuration(status) {
			switch (true) {
				case status.type == "short (1)":
					return 1;
				case status.type == "standard (3)":
					return 3;
				default:
					return 10;
			}
		}
	}

	const [statusVisible, setStatusVisible] = useState(false);
	const modifyStatusDuration = (status, adjustment) => {
		let statusesValue = menagerieSpecimen.statuses && JSON.parse(JSON.stringify(menagerieSpecimen.statuses)) || [];
		const existingStatus = statusesValue.find(comparedStatus => comparedStatus.id == status.id);
		if (existingStatus && existingStatus.duration > 0) existingStatus.duration += adjustment;
		if (existingStatus && existingStatus.duration === 0) statusesValue = statusesValue.filter(comparedStatus => comparedStatus.id !== status.id);
		const newMonster = { ...menagerieSpecimen, statuses: statusesValue };
		//modifyMonster(newMonster);
	}

	const toggleTurnTaken = () => {
		const turnTaken = !menagerieSpecimen.turnTaken;
		const newMonster = { ...menagerieSpecimen, turnTaken: turnTaken };
		//modifyMonster(newMonster);
	}

	const [imageLarge, setImageLarge] = useState(false);
	const toggleImageLarge = () => setImageLarge(!imageLarge);

	const [descShowing, setDescShowing] = useState(false);
	const toggleDesc = () => setDescShowing(!descShowing);

	const [thisMinimalMode, setThisMinimalMode] = useState(false);
	const expandMonster = () => {
		setThisMinimalMode(!thisMinimalMode);
	}

	return (
		<div className={[st.specimenLayout, st[`mode-${mode}`]].join(' ')}>
			<div className={[st.monsterDesc, descShowing ? st.on : ''].join(' ')} dangerouslySetInnerHTML={{ __html: menagerieSpecimen.description?.replace(/\n/g, "<br>") }} onClick={toggleDesc}></div>
			{/*statusVisible && <StatusPopup closePopup={() => setStatusVisible(false)} monster={monster} applyStatusOrDuration={applyStatusOrDuration} modifyStatusDuration={modifyStatusDuration} /> || <></>*/}
			{/*addClick && (
					<button className={st.addMonster} onClick={() => addClick(monster)}>+</button>
				)*/}
			{/*removeClick && (
					<button className={st.addMonster} onClick={() => removeClick(monster)}>-</button>
				)*/}
			{/*removeClick && (
					<button className={[st.expandMonster, (thisMinimalMode && st.activeMinimalMode || '')].join(' ')} onClick={() => expandMonster(monster)}>⇩</button>
				)*/}
			<div className={st.metaBar}>
				<h1 className={st.title}>{menagerieSpecimen.name} {menagerieSpecimen.description?.length && <span onClick={toggleDesc}>ⓘ</span>}</h1>
				<div className={st.subtitle}>
					{menagerieSpecimen.type}, DC {menagerieSpecimen.dc}, {menagerieSpecimen.size}
					<span className={[st.identifier, st.hideViewMode].join(' ')}><input className={st.subtleInput} value={menagerieSpecimen.base} onChange={modifyBase} /></span>
					<button className={[st.smallButton, st.hideViewMode, st.subtleInput].join(' ')} onClick={toggleTurnTaken}>Turn Done</button>
				</div>
				<div className={st.trackingBar}>
					<div className={[st.verve, (menagerieSpecimen.current_verve !== undefined && menagerieSpecimen.current_verve <= 0) ? st.depleted : ''].join(' ')}>
						<div className={st.verveValues}>
							<h2>Verve:</h2>
							<span className={st.hideViewMode}>{menagerieSpecimen.current_verve || menagerieSpecimen.verve} /</span>{menagerieSpecimen.verve}
							<button className={st.hideViewMode} onClick={() => verveUp()}>+</button>
							<button className={st.hideViewMode} onClick={() => verveDown()}>-</button>
						</div>
					</div>
				</div>
			</div>

			<div className={[st.imageContainer, imageLarge && st.imageLarge || ''].join(' ')} onClick={toggleImageLarge}><img src={`/public/menagerie/${menagerieSpecimen.image}`} alt="Monster" /></div>
			<div className={[st.statuses, st.paddedInnerSection, st.hideViewMode].join(' ')}>
				<div className={st.column}>
					<h2>Statuses <button onClick={() => setStatusVisible(true)}>Edit</button></h2>
					<div className={st.statusList}>
						{menagerieSpecimen.statuses?.map(status => (
							<button key={`mon-${menagerieSpecimen._unique_id}-status-${status.id}`} className={[st.status].join(' ')} onClick={() => setStatusVisible(true)}>{status.name}: {status.duration}</button>
						))}
					</div>
				</div>
				<div className={st.column}>
					<h2>Notes</h2>
					<textarea value={menagerieSpecimen.notes} onChange={modifyNotes}></textarea>
				</div>
			</div>
			<div className={st.core + ' ' + st.paddedInnerSection}>
				<div className={st.attributes}>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>STR</div><div className={st.attributeValue}>{menagerieSpecimen.str}</div></div>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>DEX</div><div className={st.attributeValue}>{menagerieSpecimen.dex}</div></div>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CON</div><div className={st.attributeValue}>{menagerieSpecimen.con}</div></div>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>INT</div><div className={st.attributeValue}>{menagerieSpecimen.int}</div></div>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>WIS</div><div className={st.attributeValue}>{menagerieSpecimen.wis}</div></div>
					<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CHA</div><div className={st.attributeValue}>{menagerieSpecimen.cha}</div></div>
				</div>
			</div>
			<div className={st.moves}>
				{menagerieSpecimen.properties?.length && (
					<div className={[st.propertyList, st.paddedInnerSection, st.fonted].join(' ')}>
						{menagerieSpecimen.properties.split('--')?.map((prop, index: number) => (
							<div key={`move-${index}`} className={st.property}>{prop}</div>
						))}
					</div>
				) || <></>}
				{(menagerieSpecimen.resistances || menagerieSpecimen.weaknesses) && (<div className={[st.paddedInnerSection, st.resistancesAndWeaknesses].join(' ')}>
					{menagerieSpecimen.resistances && (<div><span className={st.fonted}>Resistances:</span> {menagerieSpecimen.resistances}</div>) || <></>}
					{menagerieSpecimen.weaknesses && (<div><span className={st.fonted}>Weaknesses:</span> {menagerieSpecimen.weaknesses}</div>) || <></>}
				</div>)}
				<div className={st.paddedInnerSection}>
					{menagerieSpecimen.combatmoves.map((move, index: number) => (
						<div key={`combat-move-${index}`} className={[st.move, getCooldownClass(move, menagerieSpecimen), !move.companionable && st.hideCompanionMode || ''].join(' ')}>
							<div className={st.moveTitle + ' ' + st.fonted}>
								{move.movename} ({move.movetype})
								<div className={st.energy}>{move.moveenergy}</div>
							</div>
							<div className={st.moveDefences}>
								<span><span className={st.fonted}>Save:</span> {move.movesave}</span>
							</div>
							<div className={st.moveEffects}>
								<span className={st.desc}>{move.movedesc}</span> <span>{move.moveeffects}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MenagerieSpecimenBlock;