import st from './PurchasePointGroup.module.css';
import PurchasePoint from '../purchasePoint/PurchasePoint';
import { usePurchaseMode } from '../../characters/purchaseModeContext';

function PurchasePointGroup({ count, columns, purchased, purchaseCallback, maxPurchases }: { count: number, columns: 1 | 3 | 6 | 10 | 12 | 15, purchased: number, purchaseCallback: VoidFunction, maxPurchases: number }) {
	const { purchaseMode } = usePurchaseMode();

	const handleClick = (event) => {
		if (purchaseMode == "buy") {
			if (purchased < maxPurchases) {
				purchaseCallback();
				event.preventDefault();
				event.stopPropagation();
			}
		}

		if (purchaseMode == "sell") {
			if (purchased > 0) {
				purchaseCallback();
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}

	return (
		<div className={st.purchasePointContainer} data-purchasepointgroup data-atmin={purchased == 0} data-atmax={purchased >= maxPurchases}>
			<div className={st.purchasePointGroup} data-columns={columns} onClick={handleClick}>
				{Array.from(Array(count)).map((i: number, index: number) => (
					(index < purchased) && <PurchasePoint enabled={true} key={index} /> || <PurchasePoint enabled={false} key={index} />
				))}
			</div>
		</div>
	)
}

export default PurchasePointGroup;
