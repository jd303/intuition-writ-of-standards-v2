import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmButton from "./confirmButton";

describe("ConfirmButton", () => {
	test("ConfirmButton renders", () => {
		render(<ConfirmButton onClick={() => {}} label="Confirm" />);
		expect(screen.getByText('Confirm')).toBeInTheDocument();
	});

	test("ConfirmButton switches on Click", () => {
		render(<ConfirmButton onClick={() => {}} label="Confirm" confirmLabel="Confirm Label" />);
		fireEvent.click(screen.getByText('Confirm'));
		expect(screen.getByText('Confirm Label')).toBeInTheDocument();
	});
});