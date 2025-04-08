import { GadgetModel } from '../../../features/models/gadgetModel';
import CircledText from '../circledText/circledText';

import st from './gadgetBlock.module.css';

function GadgetBlock({ gadget }: { gadget: GadgetModel }) {

	return (
		<div className={st.gadgetLayout}>
			<div className={`${st.name} trattatello`}>{gadget.name}</div>
			<div className={st.costs}>
				<div className={st.materials}>{gadget.materials}</div>
				<div className={st.standards}><CircledText text={gadget.standards?.toString()} colour="silver" /></div>
				<div className={st.dc}><CircledText text={gadget.dc.toString()} colour="cobalt" /></div>
			</div>
			<div className={st.description}>{gadget.effect}</div>
		</div>
	)
}

export default GadgetBlock;