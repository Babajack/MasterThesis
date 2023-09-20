import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { jsx1, jsx2, jsx3, jsx4 } from "../src/index.js";

test("renders jsx1 correctly", () => {
	const { getByText } = render(jsx1);
	expect(getByText("Hello, world!")).toBeInTheDocument();
	expect(getByText("Welcome to my app.")).toBeInTheDocument();
});

test("renders jsx2 correctly", () => {
	const { container } = render(jsx2);
	expect(container.querySelector("img")).toBeInTheDocument();
});

test("renders jsx3 correctly", () => {
	const { getByText, container } = render(jsx3);
	expect(getByText("Hello!")).toBeInTheDocument();
	// Check if className is set correctly
	expect(container.firstChild).toHaveClass("myDiv");
});

test("renders jsx4 correctly", () => {
	const { getByText } = render(jsx4);
	expect(getByText("Hello")).toBeInTheDocument();
	expect(getByText("Click Me")).toBeInTheDocument();
});
