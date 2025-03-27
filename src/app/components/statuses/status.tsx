import { Status as StatusModel } from '../../../features/models/statusModel';

import icoDuration from '../../../../public/images/icons/ico.clock.svg';

import st from './status.module.css';
import { prepareDescription } from '../../../features/prepareDescription';

function Status( { status }: { status: StatusModel } ) {
	const getDuration = () => {
		switch (status.type) {
			case "short (1)":
				return "1 Round";
			case "standard (3)":
				return "3 Rounds";
			default: return "Indefinitely";
		}
	}

	return (
		<div className={st.status}>
			<div className={st.titleBlock}>
				<div className={`${st.name} ${status.negative && st.negative || st.positive}`}>{status.name}</div>
				<div className={st.domain}>{status.domain}</div>
				<div className={st.duration}><img src={icoDuration} alt={status.type} />{getDuration()}</div>
			</div>
			<div className={st.description} dangerouslySetInnerHTML={ { __html: prepareDescription(status.effect, { list: true, expertiseDisplay: false}) } }></div>
		</div>
	)
}

export default Status;
