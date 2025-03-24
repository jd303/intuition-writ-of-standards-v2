import { Move as MoveModel } from '../../../features/models/moveModel';

import st from './purchaseablePointGroup.module.css';

function PurchaseablePointGroup( { count, columns, purchased, clickCallback, purchaseKey, maxPurchases }: { count: number, columns: number, purchased: number, clickCallback: VoidFunction, purchaseKey: string, maxPurchases: number } ) {
	return (
		<div>Purchaseable Point Group</div>
	)
}

export default PurchaseablePointGroup;
