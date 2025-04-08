import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EquipmentItemBlock from './equipmentItemBlock';
import { EquipmentItemModel } from "../../../features/models/equipmentItemModel";

describe("EquipmentItemBlock", () => {
	const testEquipmentItem: EquipmentItemModel = {
		name: "Test item",
		type: "Combat",
		description: "Test desc",
		cost: 100,
	}

	test("renders EquipmentItemBlock JSX correctly", () => {
		render(<EquipmentItemBlock equipmentItem={testEquipmentItem} />);
		expect(screen.getByTestId("test-name")).toHaveTextContent('Test item');
		expect(screen.getByTestId("test-cost")).toBeInTheDocument();
		expect(screen.getByTestId("test-desc")).toBeInTheDocument();
	});
});
