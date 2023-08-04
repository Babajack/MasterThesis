import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App.js";
import "@testing-library/jest-dom";

test("adds two numbers correctly", () => {
	const { getByText } = render(<App />);
	const resultElement = getByText("5"); // The result of 2 + 3 is 5
	expect(resultElement).toBeInTheDocument();
});

test("copy", () => {
	const { getByText } = render(<App />);
	const resultElement = getByText("5"); // The result of 2 + 3 is 5
	expect(resultElement).toBeInTheDocument();
});
