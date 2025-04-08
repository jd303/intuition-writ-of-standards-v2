import st from './TextField.module.css';
import { useState } from 'react';

function SelectField( { initialValue, disabled = false, options }: { initialValue: string | number, disabled?: boolean, options: (string | number)[] } ) {
	const [value, setValue] = useState<string | number>(initialValue);

	return (
		<select value={value} onChange={(event) => setValue(event.target.value)} disabled={disabled}>
			{options.map((option) => (
				<option value={option}>{option}</option>
			))}
		</select>
	)
}

export default SelectField;
