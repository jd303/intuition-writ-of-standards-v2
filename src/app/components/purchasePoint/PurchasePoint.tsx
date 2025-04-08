import st from './PurchasePoint.module.css';

function PurchasePoint( { enabled }: { enabled: boolean } ) {

	return (
		<div className={st.point} data-enabled={enabled}></div>
	)
}

export default PurchasePoint;
