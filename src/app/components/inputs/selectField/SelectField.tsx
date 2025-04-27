import FieldContainer from '../fieldContainer/FieldContainer';
import { ChangeEvent, useEffect, useState } from 'react';

interface SelectFieldOption {
	value: string | number,
	label: string | number,
}

function SelectField({ initialValue, defaultValue, disabled = false, options, label, onChange, type = "text", className }: { initialValue: string | number, defaultValue?: string, disabled?: boolean, options: SelectFieldOption[], label?: string, onChange: (value: string | number) => void, type?: "text" | "number", className?: string }) {
	const [value, setValue] = useState<string | number>(initialValue);
	const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = type == "number" && parseInt(event.target.value) || event.target.value;
		setValue(value);
		if (onChange) onChange(value);
	}

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<FieldContainer label={label} className={className}>
			<select value={value} onChange={handleOnChange} disabled={disabled}>
				{defaultValue && <option value={defaultValue}>{defaultValue}</option> }
				{options.map((option, index) => (
					<option value={option.value} key={`${label}-${index}`}>{option.label}</option>
				))}
			</select>
		</FieldContainer>
	)
}

export default SelectField;
