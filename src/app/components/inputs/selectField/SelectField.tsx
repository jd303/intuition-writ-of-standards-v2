import st from './SelectField.module.css';
import FieldContainer from '../fieldContainer/FieldContainer';
import { ChangeEvent, useState } from 'react';

interface SelectFieldOption {
	value: string | number,
	label: string | number,
}

function SelectField( { initialValue, disabled = false, options, label, onChange }: { initialValue: string | number, disabled?: boolean, options: SelectFieldOption[], label?: string, onChange: (value: string | number) => void } ) {
	const [value, setValue] = useState<string | number>(initialValue);
	const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
			setValue(event.target.value);
			if (onChange) onChange(event.target.value);
		}

	return (
		<FieldContainer label={label}>
			<select value={value} onChange={handleOnChange} disabled={disabled}>
				{options.map((option, index) => (
					<option value={option.value} key={`${label}-${index}`}>{option.label}</option>
				))}
			</select>
		</FieldContainer>
	)
}

export default SelectField;
