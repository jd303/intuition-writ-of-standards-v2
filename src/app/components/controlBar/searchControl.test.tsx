import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchControl from "./searchControl";

describe("SearchControl", () => {
	test("SearchControl renders", () => {
		render(<SearchControl name="Search" initialValue="Test Init" onChange={() => {}} />);
		expect(screen.getByText('Search')).toBeInTheDocument();
		expect(screen.getByDisplayValue('Test Init')).toBeInTheDocument();
	});

	test("SearchControl changes", () => {
		render(<SearchControl name="Search" initialValue="Test Init" onChange={() => {}} />);
		const input: HTMLInputElement = screen.getByDisplayValue('Test Init');
		fireEvent.change(input, { target: { value: "Edited" } });
		expect(input.value).toBe('Edited');
	});
});