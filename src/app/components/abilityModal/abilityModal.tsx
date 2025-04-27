import st from "./abilityModal.module.css";
import { PsionicPowerModel } from "../../../features/models/psionicPowerModel";
import { SpellModel } from "../../../features/models/spellModel";
import { SynergyModel } from "../../../features/models/synergyModel";
import PsionicPowerBlock from "../power/psionicPowerBlock";
import SpellBlock from "../spell/spellBlock";

function AbilityModal({ visible, ability, onClose }: { visible: boolean, ability?: SpellModel | PsionicPowerModel | SynergyModel, onClose: VoidFunction }) {
	return <div className={`${st.container} ${visible ? st.open : st.closed}`}>
		<div className={st.closer} onClick={onClose}></div>
		<div className={st.content}>
			<button className={st.close} onClick={onClose}>X</button>
			{ ability && 'cantrip' in ability && <SpellBlock spell={ability} /> }
			{ ability && 'aptitude' in ability && <PsionicPowerBlock power={ability} /> }
			{ ability && 'effect' in ability && (<><label className="trattatello">{ability.name}</label> - {ability.effect}</>) }
		</div>
	</div>
}

export default AbilityModal;
