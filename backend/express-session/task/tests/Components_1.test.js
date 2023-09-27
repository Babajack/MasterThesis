import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Title, Paragraph, App } from "../src/App.js";

test("renders correct title", () => {
	const { getByText } = render(<Title />);
	expect(getByText("Welcome to React!")).toBeInTheDocument();
});

test("renders the correct paragraph text", () => {
	const { getByText } = render(<Paragraph />);
	expect(getByText("React makes building user interfaces a breeze.")).toBeInTheDocument();
});

test("renders the App component with title and paragraph", () => {
	const { getByText } = render(<App />);
	expect(getByText("Welcome to React!")).toBeInTheDocument();
	expect(getByText("React makes building user interfaces a breeze.")).toBeInTheDocument();
});
