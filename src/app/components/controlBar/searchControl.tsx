import { ChangeEventHandler } from 'react';
import ButtonControl from './buttonControl';
import icoClear from '../../../../public/images/icons/ico.clear.svg';

import st from './searchControl.module.css';

function SearchControl( { value, onChange, onClear }: { value: string, onChange: ChangeEventHandler<HTMLInputElement>, onClear: VoidFunction }) {
	return (
		<div className={st.searchControlContainer}>
			<input className={st.searchControl} type="text" value={value} onChange={onChange} />
			<ButtonControl onClick={onClear}><img src={icoClear} alt="Clear" /></ButtonControl>
		</div>
	)
}

export default SearchControl;
