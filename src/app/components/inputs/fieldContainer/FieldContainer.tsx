import { ReactNode } from 'react';
import st from './FieldContainer.module.css';

function FieldContainer( { children, label }: { children: ReactNode, label?: string } ) {
	return (
		<div className={st.fieldContainer}>
			{label && <label className="trattatello">{label}</label>}
			<div>{children}</div>
		</div>
	)
}

export default FieldContainer;
