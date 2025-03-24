import { ReactNode } from 'react';
import { UIColours } from '../../../features/UIColours';

import st from './controlBar.module.css';

function ControlBar( { children, colour, className = '' }: { children?: ReactNode[] | ReactNode, colour: UIColours, className: string }) {
	return (
		<div className={[st.controlBarContainer, className].join(' ')}>
			<div className={[st.controlBar, st[colour.toString()]].join(' ')} role="toolbar" aria-label="View Options">
				{children}
			</div>
		</div>
	)
}

export default ControlBar;
