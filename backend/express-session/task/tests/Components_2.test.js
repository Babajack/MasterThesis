import React from "react";
import { render } from "@testing-library/react";
import Greeting from "../src/Greeting";
import { add, subtract } from "../src/Utilities";
import App from "../src/App.js";
import "@testing-library/jest-dom/extend-expect";

test("exported Greeting component renders correctly", () => {
	const { getByText } = render(<Greeting />);
	const linkElement = getByText(/Hello, React!/i);
	expect(linkElement).toBeInTheDocument();
});

test("exported add function returns the sum of two numbers", () => {
	expect(add(2, 3)).toBe(5);
});

test("exported subtract function returns the difference of two numbers", () => {
	expect(subtract(5, 3)).toBe(2);
});

test("App component renders correctly", () => {
	const { getByText } = render(<App />);

	expect(getByText(/Hello, React!/i)).toBeInTheDocument();
});
