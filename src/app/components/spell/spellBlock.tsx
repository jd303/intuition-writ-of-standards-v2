import { Spell } from '../../../features/models/spellModel';
import CircledText from '../circledText/circledText';

import mapPinIcon from '../../../../public/images/icons/ico.map_pin.svg';
import targetIcon from '../../../../public/images/icons/ico.target.svg';
import potionIcon from '../../../../public/images/icons/ico.potion.black.svg';
import st from './spellBlock.module.css';

function SpellBlock( { spell }: { spell: Spell }) {
	
	return (
		<div className={st.spellLayout}>
			<div className={st.name}><div className={st.value}>{spell.name}</div> <div className={st.spellLevel}>{spell.level}</div></div>
			<div className={st.easyName}>{spell.easyname} - {spell.school}</div>
			<div className={st.mechanics}>
				<div className={st.leftMechanics}>
					<div className={st.range}>
						<img src={mapPinIcon} />
						{spell.shape}
					</div>
					{spell.save !== "None" && <div className={st.challengeType}>
						<img src={targetIcon} />
						{spell.save}
					</div>}
				</div>
				{spell.potable && <div className={st.potable}>
					<img src={potionIcon} />
				</div>}
			</div>
			<ul className={st.effects}>
				<li className={st.effect}>
					<CircledText text={spell.cantripcost?.toString()} colour="bronze" /> <div className={st.desc}>{spell.cantrip} <div className={st.duration}>{spell.cantripduration}</div></div>
				</li>
				<li className={st.effect}>
					<CircledText text={spell.standardcost?.toString()} colour="silver" /> <div className={st.desc}>{spell.standard} <div className={st.duration}>{spell.standardduration}</div></div>
				</li>
				<li className={st.effect}>
					<CircledText text={spell.empoweredcost?.toString()} colour="gold" /> <div className={st.desc}>{spell.empowered} <div className={st.duration}>{spell.empoweredduration}</div></div>
				</li>
			</ul>
		</div>
	)
}

export default SpellBlock;