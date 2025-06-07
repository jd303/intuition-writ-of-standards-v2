import { StatusModel } from '../../../features/models/statusModel';

import icoDuration from '/images/icons/ico.clock.svg';

import st from './status.module.css';
import { prepareDescription } from '../../../features/prepareDescription';

function Status( { status }: { status: StatusModel } ) {
	return (
		<div className={st.status}>
			<div className={`${st.titleBlock} trattatello`}>
				<div className={`${st.name} ${status.negative && st.negative || st.positive}`}>{status.name}</div>
				<div className={st.domain}>{status.domain}</div>
				<div className={st.duration}><img src={icoDuration} alt={status.duration} />{status.duration}</div>
			</div>
			<div className={st.description} dangerouslySetInnerHTML={ { __html: prepareDescription(status.effect, { list: true, expertiseDisplay: false }) } }></div>
		</div>
	)
}

export default Status;
