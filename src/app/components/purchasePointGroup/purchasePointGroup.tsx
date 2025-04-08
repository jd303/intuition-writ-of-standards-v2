import st from './PurchasePointGroup.module.css';
import PurchasePoint from '../purchasePoint/PurchasePoint';

function PurchasePointGroup( { count, columns, purchased, clickCallback, purchaseKey, maxPurchases }: { count: number, columns: 3 | 5 | 10 | 12, purchased: number, clickCallback: VoidFunction, purchaseKey: string, maxPurchases: number } ) {
	return (
		<div className={st.purchasePointGroup} data-columns={columns} onClick={clickCallback}>
			{Array.from(Array(count)).map((index: number) => (
				(index < purchased) && <PurchasePoint enabled={true} /> || <PurchasePoint enabled={false} />
			))}
		</div>
	)
}

export default PurchasePointGroup;
