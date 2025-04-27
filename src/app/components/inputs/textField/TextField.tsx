import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FieldContainer from '../fieldContainer/FieldContainer';

function TextField({ initialValue, type = "text", label, disabled = false, className, onChange, autosize = false }: { initialValue: string | number, type?: "text" | "textarea" | "number", label?: string, disabled?: boolean, className?: string, onChange?: (value: string | number) => void, autosize?: boolean }) {
	const changeTimeout = useRef<NodeJS.Timeout>(null);
	const [value, setValue] = useState<string | number>(initialValue);
	const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const updatedValue = type == "number" && parseInt(event.target.value) || event.target.value;
		setValue(updatedValue);

		if (changeTimeout.current) clearTimeout(changeTimeout.current);
		changeTimeout.current = setTimeout(() => {
			if (onChange) onChange(updatedValue);
		}, 1000);
	}

	// Autosize textareas
	const textareaRef = useRef(null);
	const statusFieldClassName = useEffect(() => {
		if (type == "textarea" && autosize && textareaRef.current) {
			setTimeout(() => {
				if (textareaRef.current) {
					(textareaRef.current as HTMLElement).style.height = 'auto';
					(textareaRef.current as HTMLElement).style.height = `${Math.max(25, (textareaRef.current! as HTMLElement).scrollHeight + 10)}px`;
				}
			}, 500);
		}
	}, [type, autosize, initialValue]);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<FieldContainer label={label} className={className || ''} data-size={statusFieldClassName}>
			{type == "textarea" ? (
				<textarea value={value} onChange={handleOnChange} disabled={disabled} ref={textareaRef} />
			) : (
				<input type={type} value={value} onChange={handleOnChange} disabled={disabled} />
			)}
		</FieldContainer>
	)
}

export default TextField;
