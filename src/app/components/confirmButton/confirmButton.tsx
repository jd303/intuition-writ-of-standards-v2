import { useState } from 'react';
import st from './confirmButton.module.css';

function ConfirmButton( { onClick, label, confirmLabel = 'Confirm?', className, confirmValue = undefined, disabled = false }: { onClick: (value: string | number | boolean | void) => void, label: string, confirmLabel?: string, className?: string, confirmValue?: string | number | boolean, disabled?: boolean } ) {
	const [confirmMode, setConfirmMode] = useState(false);
	const triggerClick = () => {
		if (confirmMode) {
			if (confirmValue) onClick(confirmValue);
			else onClick();
			setConfirmMode(false);
		}

		else {
			setConfirmMode(true);
			setTimeout(() => {
				setConfirmMode(false);
			}, 2000);
		}
	}

	return (
		<button onClick={triggerClick} className={[className, (confirmMode && st.confirmMode || '')].join(' ')} disabled={disabled}>{confirmMode && confirmLabel || label}</button>
	)
}

export default ConfirmButton;
