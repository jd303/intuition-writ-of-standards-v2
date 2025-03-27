import { ChangeEvent, useState } from 'react';
import st from './selectorDropdown.module.css';

export const SELECTOR_DEFAULT = 'All';

export interface SelectorDropdownDefinition {
	value: string;
	label: string;
}

function SelectorDropdown({ label, defaultValue = SELECTOR_DEFAULT, initialValue = SELECTOR_DEFAULT, options, onChange }: { label: string, defaultValue?: string, initialValue: string, options: SelectorDropdownDefinition[], onChange: (value: string) => void }) {
	const [currentValue, setCurrentValue] = useState<string>(initialValue);
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setCurrentValue(event.target.value);
		onChange(value);
		
	}
	
	return (
		<div className={st.selectorContainer}>
			<label htmlFor={`selector-${label}`}>{label}</label>
			<select className={st.selector} onChange={handleChange} value={currentValue} id={`selector-${label}`}>
				<option value={defaultValue}>{defaultValue}</option>
				{options.map((option: SelectorDropdownDefinition) => (
					<option value={option.value} key={option.label}>{option.label}</option>
				))}
			</select>
		</div>
	)
}

export default SelectorDropdown;
