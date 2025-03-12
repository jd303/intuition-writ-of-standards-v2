import { ReactNode } from 'react';

import st from './buttonControl.module.css';

function ButtonControl( { children, onClick }: { children: ReactNode[] | ReactNode, onClick: VoidFunction }) {
	return (
		<button className={st.buttonControl} onClick={onClick}>{children}</button>
	)
}

export default ButtonControl;
