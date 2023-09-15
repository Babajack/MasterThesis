import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { jsx1, jsx2 } from "../src/index.js";

test("jsx1 contains Hello World! within a div", () => {
	const { getByText } = render(jsx1);
	const divElement = getByText("Hello World!");

	expect(divElement).toBeInTheDocument();
	expect(divElement.tagName).toBe("DIV");
});

test("jsx2 contains Hi within a h2 and div", () => {
	const { getByText, container } = render(jsx2);
	const h2Element = getByText("Hi");
	const divElement = container.firstChild;

	expect(h2Element).toBeInTheDocument();
	expect(h2Element.tagName).toBe("H2");

	expect(divElement).toBeInTheDocument();
	expect(divElement.tagName).toBe("DIV");
});
