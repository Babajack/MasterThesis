import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "../src/UserProfile";
import Greetings from "../src/Greetings";
import Button from "../src/Button";
import Car from "../src/Car";
import App from "../src/App";

test("renders the username correctly", () => {
	const { queryAllByText } = render(<UserProfile username="Hans" />);
	expect(queryAllByText(/Hans/).length).toBeGreaterThanOrEqual(1);
});

test("renders greeting with provided username", () => {
	const { queryAllByText } = render(<Greetings username="Hans" />);
	expect(queryAllByText("Hello, Hans!").length).toBeGreaterThanOrEqual(1);
});

test("renders greeting with default name", () => {
	const { queryAllByText } = render(<Greetings />);
	expect(queryAllByText("Hello, Stranger!").length).toBeGreaterThanOrEqual(1);
});

test("renders button label and checks onClick", () => {
	const mockOnClick = jest.fn();
	const { getByText } = render(<Button label="Hello!" onClick={mockOnClick} />);

	fireEvent.click(getByText("Hello!"));
	expect(mockOnClick).toHaveBeenCalled();
});

test("renders car details correctly", () => {
	const carData = {
		brand: "Ferrari",
		hp: 600,
		mileage: 100000,
	};

	const { queryAllByText, debug } = render(<Car car={carData} />);
	debug();
	expect(queryAllByText(/Ferrari/).length).toBeGreaterThanOrEqual(1);
	expect(queryAllByText(/600/).length).toBeGreaterThanOrEqual(1);
	expect(queryAllByText(/100000/).length).toBeGreaterThanOrEqual(1);
});

test("App component renders child components", () => {
	const { queryAllByText } = render(<App />);

	// UserProfile & Greetings
	expect(queryAllByText("Hans").length).toBeGreaterThanOrEqual(1);
	expect(queryAllByText("Hello, Hans!").length).toBeGreaterThanOrEqual(1);

	// Car
	expect(queryAllByText(/Porsche/).length).toBeGreaterThanOrEqual(1);
	expect(queryAllByText(/500/).length).toBeGreaterThanOrEqual(1);
	expect(queryAllByText(/80000/).length).toBeGreaterThanOrEqual(1);

	// Button
	expect(queryAllByText("Hello!").length).toBeGreaterThanOrEqual(1);
});
