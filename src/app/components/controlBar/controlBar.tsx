import { ReactNode } from 'react';

import st from './controlBar.module.css';

function ControlBar( { children }: { children?: ReactNode[] | ReactNode }) {
	return (
		<div className={st.controlBar} role="toolbar" aria-label="View Options">
			{children}
		</div>
	)
}

export default ControlBar;
