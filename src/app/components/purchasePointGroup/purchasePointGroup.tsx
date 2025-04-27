import st from './PurchasePointGroup.module.css';
import PurchasePoint from '../purchasePoint/PurchasePoint';
import { useCharacterContext } from '../../characters/characterContext';

function PurchasePointGroup({ count, columns, purchased, purchaseCallback, maxPurchases }: { count: number, columns: 1 | 3 | 6 | 10 | 12 | 15, purchased: number, purchaseCallback: VoidFunction, maxPurchases: number }) {
	const { purchaseMode } = useCharacterContext();

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
		<div className={st.purchasePointContainer} data-purchasepointgroup data-atmin={purchased == 0} data-atmax={purchased >= maxPurchases} data-purchasepointcontainer>
			<div className={st.purchasePointGroup} data-columns={columns} onClick={handleClick}>
				{Array.from(Array(count)).map((_: number, index: number) => (
					(index < purchased) && <PurchasePoint enabled={true} key={index} /> || <PurchasePoint enabled={false} key={index} />
				))}
			</div>
		</div>
	)
}

export default PurchasePointGroup;
