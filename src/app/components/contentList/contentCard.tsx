import { ReactNode } from 'react';
import { UIColours } from '../../../features/constants/UIColours';

import st from './contentCard.module.css';

function ContentCard( { children, colour, className }: { children: ReactNode, colour: UIColours, className?: string }) {
	return (
		<div className={[st.contentCard, st[colour], className].join(' ')}>
			{children}
		</div>
	)
}

export default ContentCard;
