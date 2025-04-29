import st from './toggleButton.module.css';

function ToggleButton( { on, toggle, label }: { on: boolean, toggle: VoidFunction, label: string }) {
	return (
		<button className={`${st.buttonControl} ${on ? st.on : st.off}`} onClick={toggle}>{label}</button>
	)
}

export default ToggleButton;
