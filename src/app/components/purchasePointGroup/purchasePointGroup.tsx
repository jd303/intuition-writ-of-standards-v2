import st from './PurchasePointGroup.module.css';
import PurchasePoint from '../purchasePoint/PurchasePoint';

function PurchasePointGroup( { count, columns, purchased, clickCallback, purchaseKey, maxPurchases }: { count: number, columns: 1 | 3 | 6 | 10 | 12 | 15, purchased: number, clickCallback: VoidFunction, purchaseKey: string, maxPurchases: number } ) {
	return (
		<div className={st.purchasePointContainer}>
			<div className={st.purchasePointGroup} data-columns={columns} onClick={clickCallback}>
				{Array.from(Array(count)).map((i: number, index: number) => (
					(index < purchased) && <PurchasePoint enabled={true} key={`${purchaseKey}-${index}`} /> || <PurchasePoint enabled={false} key={`${purchaseKey}-${index}`} />
				))}
			</div>
		</div>
	)
}

export default PurchasePointGroup;
