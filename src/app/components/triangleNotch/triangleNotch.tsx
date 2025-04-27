import st from "./triangleNotch.module.css";
import icoChevronDown from '/images/icons/ico.chevron.down.svg';

function TriangleNotch( { isOpen, type = "default" }: { isOpen: boolean, type?: "default" | "plus" } ) {
	return <div className={`${st.triangleNotch} ${isOpen ? st.open : st.closed}`} data-type={type}>
		<div><img src={icoChevronDown} alt={isOpen && 'Section Open' || 'Section Closed'} /></div>
	</div>
}

export default TriangleNotch;
