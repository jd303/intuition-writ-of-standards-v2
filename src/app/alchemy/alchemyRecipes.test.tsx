import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { alchemyRecipesData } from "../../features/testing/testingData";
import AlchemicalBlock from "../components/alchemical/alchemicalBlock";

describe('AlchemicalBlock', () => {
	test("renders AlchemicalBlock correctly", () => {
		render(<AlchemicalBlock alchemical={alchemyRecipesData[0]} isReagent={false} />);
		expect(screen.getByText('Stimpaste')).toBeInTheDocument();
	});
});

