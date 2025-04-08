import st from './TextField.module.css';
import { useState } from 'react';

function TextField( { initialValue, type = "text", disabled = false }: { initialValue: string | number, type?: string, disabled?: boolean } ) {
	const [value, setValue] = useState<string | number>(initialValue);

	return (
		<input type={type} value={value} onChange={(event) => setValue(event.target.value)} disabled={disabled} />
	)
}

export default TextField;
