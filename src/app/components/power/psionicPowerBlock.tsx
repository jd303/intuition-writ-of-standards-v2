import st from './psionicPowerBlock.module.css';
import CircledText from '../circledText/circledText';
import { PsionicPowerModel } from '../../../features/models/psionicPowerModel';

import mapPinIcon from '/images/icons/ico.map_pin.svg';
import targetIcon from '/images/icons/ico.target.svg';
import timeIcon from '/images/icons/ico.clock.svg';

function PsionicPowerBlock({ power }: { power: PsionicPowerModel }) {

	return (
		<div className={st.powerLayout}>
			<div className={st.name}>
				<div className={`${st.value} trattatellodown`}>{power.name}</div>
				<div className={st.meta}>
					<div className={st.aptitude}>{power.aptitude}</div>
					<div className={st.powerLevel}>{power.level}</div>
				</div>
			</div>
			<div className={st.mechanics}>
				<div className={st.range}>
					<img src={mapPinIcon} />
					{power.shape}
				</div>
				{power.save !== "None" && <div className={st.challengeType}>
					<img src={targetIcon} />
					{power.save}
				</div>}
				<div className={st.duration}><img src={timeIcon} /> {power.duration}</div>
			</div>
			<div className={st.desc}>{power.desc}</div>
			<ul className={st.psitosisRatings}>
				<li className={st.effect}>
					<CircledText text={power.mod1pt?.toString()} colour="bronze" /> <div className={st.desc}>{power.mod1}</div>
				</li>
				<li className={st.effect}>
					<CircledText text={power.mod2pt?.toString()} colour="silver" /> <div className={st.desc}>{power.mod2}</div>
				</li>
				<li className={st.effect}>
					<CircledText text={power.mod3pt?.toString()} colour="gold" /> <div className={st.desc}>{power.mod3}</div>
				</li>
				<li className={st.effect}>
					<CircledText text={power.mod4pt?.toString()} colour="abstrate" /> <div className={st.desc}>{power.mod4}</div>
				</li>
			</ul>
		</div>
	)
}

export default PsionicPowerBlock;