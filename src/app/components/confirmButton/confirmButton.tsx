import { useState } from 'react';
import st from './confirmButton.module.css';

function ConfirmButton( { onClick, label, confirmLabel = 'Tap again to confirm', className }: { onClick: VoidFunction, label: string, confirmLabel?: string, className?: string } ) {
	const [confirmMode, setConfirmMode] = useState(false);
	const triggerClick = () => {
		if (confirmMode) {
			onClick();
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
		<button onClick={triggerClick} className={[className, (confirmMode && st.confirmMode || '')].join(' ')}>{confirmMode && confirmLabel || label}</button>
	)
}

export default ConfirmButton;
