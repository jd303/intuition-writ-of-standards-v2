import { ReactNode } from 'react';
import st from './FieldContainer.module.css';

function FieldContainer( { children, label, className }: { children: ReactNode, label?: string, className?: string } ) {
	return (
		<div className={`${st.fieldContainer} ${className}`}>
			{label && <label className="trattatello">{label}</label>}
			<div>{children}</div>
		</div>
	)
}

export default FieldContainer;
