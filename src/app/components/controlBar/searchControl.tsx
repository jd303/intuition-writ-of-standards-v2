import { ChangeEvent, useState } from 'react';
import ButtonControl from './buttonControl';
import icoClear from '../../../../public/images/icons/ico.clear.svg';

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
			<input className={st.searchControl} type="text" value={inputValue} onChange={(changeEvent) => inputUpdated(changeEvent)} />
			<ButtonControl onClick={inputCleared}><img src={icoClear} alt="Clear" /></ButtonControl>
		</div>
	)
}

export default SearchControl;
