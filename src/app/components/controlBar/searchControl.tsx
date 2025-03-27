import { ChangeEvent, useState } from 'react';

import icoClose from '../../../../public/images/icons/ico.close.thick.svg';
import st from './searchControl.module.css';

function SearchControl( { name, initialValue, onChange }: { name: string, initialValue: string, onChange: (value: string) => void }) {
	const debounceTime = 350;
	const [inputValue, setInputValue] = useState(initialValue);

	const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout> | null>(null);
	const inputUpdated = (changeEvent: ChangeEvent<HTMLInputElement>) => {
		const value = changeEvent.target.value;
		setInputValue(value);

		if (timeoutID) clearTimeout(timeoutID);
		setTimeoutID(setTimeout(() => {
			onChange(value);
		}, debounceTime));
	}

	const inputCleared = () => {
		setInputValue('');
		onChange('');
	}

	return (
		<div className={st.searchControlContainer}>
			<label htmlFor={`search-${name}`}>{name}</label>
			<div className={[st.inputContainer, (inputValue.length && st.notEmpty || '')].join(' ')}>
				<button className={st.clear} onClick={inputCleared}><img src={icoClose} alt="Close" /></button>
				<input className={st.searchControl} type="text" id={`search-${name}`} value={inputValue} onChange={(changeEvent) => inputUpdated(changeEvent)} />
			</div>
		</div>
	)
}

export default SearchControl;
