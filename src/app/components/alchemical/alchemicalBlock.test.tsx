import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import AlchemicalBlock from "./alchemicalBlock";
import { alchemyReagentsData } from "../../../features/testing/testingData";

describe("Alchemical Block", () => {
	test("Alchemical Renders", () => {
		render(<AlchemicalBlock alchemical={alchemyReagentsData[0]} isReagent={true} />);
		
		const nameBlock = screen.getByText(alchemyReagentsData[0].name);
		expect(nameBlock).toBeInTheDocument();
	});

	test("Alchemical Collates Reagents", () => {
		render(<AlchemicalBlock alchemical={alchemyReagentsData[11]} isReagent={true} />);

		const reagentsBlock = screen.getByTestId('requirements');
		const vig = within(reagentsBlock).getByText('Vig');
		const fort = within(reagentsBlock).getByText('For');
		const hyd = within(reagentsBlock).getByText('Hyd');
		expect(vig).toBeInTheDocument();
		expect(fort).toBeInTheDocument();
		expect(hyd).toBeInTheDocument();
	});
});