import st from './menagerieSpecimenBlock.module.css';
import { MenagerieSpecimen, MenagerieSpecimenLocalCombatModel, MenagerieSpecimenLocalModel } from '../../../features/models/menagerieSpecimenModel';
import ConfirmButton from '../confirmButton/confirmButton';
import { useEffect, useMemo, useState } from 'react';
import TextField from '../inputs/textField/TextField';
import SpecimenCombatMove from './menagerieSpecimenMoveBlock';
import { useAppSelector } from '../../../features/firebaseHooks';
import SelectField from '../inputs/selectField/SelectField';

function MenagerieSpecimenBlock({ specimen, specimenCombatData, viewMode = "max", viewContext, combatAddCallback, combatRemoveCallback, combatModifyCallback }: {
	specimen: MenagerieSpecimenLocalModel,
	specimenCombatData?: MenagerieSpecimenLocalCombatModel,
	viewMode: "min" | "med" | "max",
	viewContext: "menagerie" | "combat" | "companion",
	combatAddCallback?: (specimenId: string) => void,
	combatRemoveCallback?: (combatId: string) => void,
	combatModifyCallback?: (specimenCombatData: MenagerieSpecimenLocalCombatModel) => void,
}) {
	// Set the specimen
	const [menagerieSpecimen] = useState<MenagerieSpecimen>(new MenagerieSpecimen(specimen));
	const [activeSpecimenCombatData, setActiveSpecimenCombatData] = useState<MenagerieSpecimenLocalCombatModel | undefined>(specimenCombatData && { ...specimenCombatData } || undefined);

	useEffect(() => {
		if (specimenCombatData) setActiveSpecimenCombatData(JSON.parse(JSON.stringify(specimenCombatData)));
	}, [specimenCombatData]);

	// Data writing functions
	const modifyCombatProperty = (value: string | number | boolean, propertyName: string) => {
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		(activeSpecimenCombatData as unknown as Record<string, unknown>)[propertyName] = value; // TODO, properly type this
		setActiveSpecimenCombatData(activeSpecimenCombatData);
		combatModifyCallback!(activeSpecimenCombatData);
	}

	const verveChange = (up: boolean = true) => {
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		const currentVerve = activeSpecimenCombatData?.current_verve || 0;
		const newVerve = up ? currentVerve + 1 : currentVerve - 1;
		activeSpecimenCombatData!.current_verve = newVerve;
		combatModifyCallback!(activeSpecimenCombatData);
		setActiveSpecimenCombatData(activeSpecimenCombatData);
	}

	// Statuses Data
	const statusesData = useAppSelector((state) => state.statusesData.statuses);
	const statusesOptions = useMemo(() => [{ value: '', label: 'Prefill from Statuses...' }, ...statusesData.map((st: Record<string, string>) => { return { value: `${st.negative && '🌩️' || '⭐'} ${st.name} - ${st.effect} -- ${st.type}`, label: `${st.negative && '🌩️' || '⭐'} ${st.name}` } })], [statusesData]);

	const addStatus = (statusValue: string | number) => {
		if (statusValue as string == '') return;
		let duration;
		switch (true) {
			case (statusValue as string).includes('standard (3)'):
				duration = 3;
				break;
			case (statusValue as string).includes('short (1)'):
				duration = 1;
				break;
			default:
				duration = 10;
		}
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		if (!activeSpecimenCombatData?.active_statuses) activeSpecimenCombatData.active_statuses = [];
		activeSpecimenCombatData.active_statuses.push({
			desc: statusValue as string,
			turnsRemaining: duration,
		});
		setActiveSpecimenCombatData(activeSpecimenCombatData);
		combatModifyCallback!(activeSpecimenCombatData);
	}

	const removeStatus = (index: number) => {
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		if (activeSpecimenCombatData.active_statuses) activeSpecimenCombatData.active_statuses = [...activeSpecimenCombatData.active_statuses.slice(0, index), ...activeSpecimenCombatData.active_statuses.slice(index + 1)];
		setActiveSpecimenCombatData(activeSpecimenCombatData);
		combatModifyCallback!(activeSpecimenCombatData);
	}

	const editStatus = (value: string | number, index: number) => {
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		if (activeSpecimenCombatData.active_statuses) activeSpecimenCombatData.active_statuses[index].desc = value as string;
		setActiveSpecimenCombatData(activeSpecimenCombatData);
		combatModifyCallback!(activeSpecimenCombatData);
	}

	const editStatusDuration = (value: string | number, index: number) => {
		const activeSpecimenCombatData: MenagerieSpecimenLocalCombatModel = { ...specimenCombatData! };
		if (activeSpecimenCombatData.active_statuses) activeSpecimenCombatData.active_statuses[index].turnsRemaining = value as number;
		setActiveSpecimenCombatData(activeSpecimenCombatData);
		combatModifyCallback!(activeSpecimenCombatData);
	}

	// UI Mods
	const [imageLarge, setImageLarge] = useState(false);
	const toggleImageLarge = () => setImageLarge(!imageLarge);

	const [descShowing, setDescShowing] = useState(false);
	const toggleDesc = () => setDescShowing(!descShowing);

	if (!menagerieSpecimen) return <></>;
	else return (
		<div className={st.specimenLayout} data-viewmode={viewMode} data-viewcontext={viewContext} data-turntaken={activeSpecimenCombatData?.turnTaken}>
			<div className={[st.monsterDesc, descShowing ? st.on : ''].join(' ')} dangerouslySetInnerHTML={{ __html: menagerieSpecimen.description?.replace(/\n/g, "<br>") }} onClick={toggleDesc}></div>
			<div className={st.metaBar}>
				<div className={`${st.title} trattatello`}>{menagerieSpecimen.name} {menagerieSpecimen.description?.length && <span onClick={toggleDesc}>ⓘ</span>}</div>
				<div className={st.subtitle}>
					{menagerieSpecimen.type}, DC {menagerieSpecimen.dc}, {menagerieSpecimen.size}
				</div>
				<div className={st.subtitle}>
					<span className={st.identifier} data-combatmodeonly><TextField innerClassName={st.subtleInput} initialValue={specimenCombatData?.base || ''} placeholder="Base" onChange={(value) => modifyCombatProperty(value, 'base')} /></span>
				</div>
				<div className={st.trackingBar}>
					<div className={[st.verve, (specimenCombatData?.current_verve !== undefined && specimenCombatData?.current_verve <= 0) ? st.depleted : ''].join(' ')}>
						<div className={st.verveValues}>
							<div className={`${st.verveTitle} trattatello`}>Verve:</div>
							<span data-combatmodeonly>{specimenCombatData?.current_verve || 0} /</span>{menagerieSpecimen.verve}
							<button data-combatmodeonly onClick={() => verveChange(true)}>+</button>
							<button data-combatmodeonly onClick={() => verveChange(false)}>-</button>
						</div>
					</div>
				</div>
			</div>

			<div className={[st.imageContainer, imageLarge && st.imageLarge || ''].join(' ')} onClick={toggleImageLarge}>
				<img src={`/menagerie/${menagerieSpecimen.image}`} alt="Monster" />
			</div>
			<div className={[st.statuses, st.paddedInnerSection].join(' ')} data-combatmodeonly>
				<h2>Notes</h2>
				{specimenCombatData?.active_statuses?.map((value, index) => (
					<div className={st.status} key={`buff-${index}`}>
						<TextField type="textarea" initialValue={value.desc} onChange={(value) => editStatus(value, index)} autosize={true} />
						<TextField type="number" className={st.turnsRemaining} initialValue={value.turnsRemaining} onChange={(value) => editStatusDuration(value, index)} />
						<button onClick={() => removeStatus(index)}>X</button>
					</div>
				))}
				<TextField type="textarea" initialValue={''} onChange={addStatus} clearOnChange={true} />
				<SelectField initialValue='Prefill' options={statusesOptions} onChange={addStatus} />
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
				<div className={st.propertyList}>
					{menagerieSpecimen.properties?.length && (
						menagerieSpecimen.properties.split('--')?.map((prop, index: number) => (
							<div key={`move-${index}`} className={st.property}>{prop}</div>
						))
					) || <></>}
				</div>
			</div>
			<div className={st.moves} data-maxmodeonly>
				{(menagerieSpecimen.resistances || menagerieSpecimen.weaknesses) && (<div className={[st.paddedInnerSection, st.resistancesAndWeaknesses].join(' ')}>
					{menagerieSpecimen.resistances && (<div><span className={st.fonted}>Resistances:</span> {menagerieSpecimen.resistances}</div>) || <></>}
					{menagerieSpecimen.weaknesses && (<div><span className={st.fonted}>Weaknesses:</span> {menagerieSpecimen.weaknesses}</div>) || <></>}
				</div>)}
				<div className={st.paddedInnerSection} data-maxmodeonly>
					{menagerieSpecimen.combatMoves?.map((move, index: number) => (
						<SpecimenCombatMove move={move} key={`move-${specimen.id}-${index}`} specimenCombatData={specimenCombatData!} setActiveSpecimenCombatData={setActiveSpecimenCombatData!} activeSpecimenCombatData={activeSpecimenCombatData!} combatModifyCallback={combatModifyCallback!} />
					))}
				</div>
			</div>
			<div className={st.combatOptions}>
				<span data-menageriemodeonly><button className={st.addToCombatButton} onClick={() => combatAddCallback!(menagerieSpecimen.id)}>+ Combat</button></span>
				<span data-combatmodeonly><button onClick={() => modifyCombatProperty(!activeSpecimenCombatData!.turnTaken, 'turnTaken')} data-combatmodeonly>Toggle Turn</button></span>
				<span data-combatmodeonly><ConfirmButton className={st.removeFromCombat} onClick={() => combatRemoveCallback!(specimenCombatData!.combatId!)} label='Remove' /></span>
			</div>
		</div>
	)
}

export default MenagerieSpecimenBlock;