import st from './TextField.module.css';
import { useState } from 'react';
import FieldContainer from '../fieldContainer/FieldContainer';

function TextField( { initialValue, type = "text", label, disabled = false }: { initialValue: string | number, type?: string, label?: string, disabled?: boolean } ) {
	const [value, setValue] = useState<string | number>(initialValue);

	return (
		<FieldContainer label={label}>
			<input type={type} value={value} onChange={(event) => setValue(event.target.value)} disabled={disabled} />
		</FieldContainer>
	)
}

export default TextField;
