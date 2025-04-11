import st from './TextareaField.module.css';
import { ChangeEvent, useState } from 'react';
import FieldContainer from '../fieldContainer/FieldContainer';

function TextareaField( { initialValue, label, disabled = false, onChange }: { initialValue: string | number, label?: string, disabled?: boolean, onChange?: (value: string | number) => void } ) {
	const [value, setValue] = useState<string | number>(initialValue);
	const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(event.target.value);
		if (onChange) onChange(event.target.value);
	}

	return (
		<FieldContainer label={label}>
			<textarea value={value} onChange={handleOnChange} disabled={disabled} />
		</FieldContainer>
	)
}

export default TextareaField;
