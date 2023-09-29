import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Title, Paragraph, App } from "../src/App.js";

test("renders correct title", () => {
	const { getByText } = render(<Title />);
	expect(getByText("Welcome to React!")).toBeInTheDocument();
});

test("renders the correct paragraph text", () => {
	const { queryAllByText } = render(<Paragraph />);
	expect(
		queryAllByText(/React makes building user interfaces a breeze./).length
	).toBeGreaterThanOrEqual(1);
});

test("renders the App component with title and paragraph", () => {
	const { queryAllByText } = render(<App />);
	expect(queryAllByText(/Welcome to React!/).length).toBeGreaterThanOrEqual(1);
	expect(
		queryAllByText(/React makes building user interfaces a breeze./).length
	).toBeGreaterThanOrEqual(1);
});
