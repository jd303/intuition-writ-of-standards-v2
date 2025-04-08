import { EquipmentItemModel } from '../../../features/models/equipmentItemModel';
import st from './equipmentItemBlock.module.css';

function EquipmentItemBlock({ equipmentItem }: { equipmentItem: EquipmentItemModel }) {

	return (
		<div className={st.item}>
			<div className={st.itemHead}>
				<span className={st.name} data-testid="test-name">{equipmentItem.name}</span>
				<span className={st.cost} data-testid="test-cost">{equipmentItem.cost}</span>
			</div>
			<div className={st.description} data-testid="test-desc">{equipmentItem.description}</div>
		</div>
	)
}

export default EquipmentItemBlock;