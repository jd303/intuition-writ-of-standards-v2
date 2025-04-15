import st from './TextField.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FieldContainer from '../fieldContainer/FieldContainer';

function TextField({ initialValue, type = "text", label, disabled = false, className, onChange }: { initialValue: string | number, type?: "text" | "textarea" | "number", label?: string, disabled?: boolean, className?: string, onChange?: (value: string | number) => void }) {
	const changeTimeout = useRef<NodeJS.Timeout>(null);
	const [value, setValue] = useState<string | number>(initialValue);
	const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const updatedValue = type == "number" && parseInt(event.target.value) || event.target.value;
		setValue(updatedValue);

		if (changeTimeout.current) clearTimeout(changeTimeout.current);
		changeTimeout.current = setTimeout(() => {
			if (onChange) onChange(updatedValue);
		}, 600);
	}

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<FieldContainer label={label} className={className}>
			{type == "textarea" ? (
				<textarea value={value} onChange={handleOnChange} disabled={disabled} />
			) : (
				<input type={type} value={value} onChange={handleOnChange} disabled={disabled} />
			)}
		</FieldContainer>
	)
}

export default TextField;
