import { AlchemicalModel } from '../../../features/models/alchemicalModel';
import { collateAlchemicalReagents, ReagentResponse } from '../../../features/collateAlchemicalReagents';
import Medal from '../medal/medal';

import dcIcon from '../../../../public/images/icons/ico.dc.svg';
import timeIcon from '../../../../public/images/icons/ico.clock.svg';
import st from './alchemicalBlock.module.css';

function AlchemicalBlock({ alchemical, isReagent = false }: { alchemical: AlchemicalModel, isReagent?: boolean }) {
	return (
		<div className={st.alchemicalBlockContainer}>
			<div className={`${st.alchemicalTitle} trattatellodown`}>
				{ !isReagent && <div className={st.type} data-type={alchemical.subtype}></div> }
				<div className={st.name}>{alchemical.name}</div>
			</div>
			<div className={st.effects}>{alchemical.effects}</div>
			<div className={st.description}>{alchemical.desc}</div>
			{ !isReagent && <>
				<div className={st.dc}>
					<img src={dcIcon} />
					{alchemical.rarity}
				</div>
				<div className={st.time}>
					<img src={timeIcon} /> {alchemical.time}
				</div>
			</>}
			{ isReagent && <>
				<div className={st.reagentType}>
					<div className={st.rarity}><Medal className="rarity" size="small" rarity={alchemical.rarity} /></div>
					<div className={st.type}>{alchemical.subtype}</div>
				</div>
			</>}

			<div className={st.requirements} data-testid="requirements">
				{collateAlchemicalReagents(alchemical.reagents).map((reagent: ReagentResponse, index: number) => {
					return (
						<div key={index} className={st.reagent + " " + reagent.reagent.toLowerCase()}>
							{reagent.reagent} {reagent.count > 1 && ` (${reagent.count})`}
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default AlchemicalBlock;