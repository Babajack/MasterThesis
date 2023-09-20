import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fun1, fun2, fun3, fun4, fun5 } from "../src/index.js";

// Test fun1
test("displays car information correctly", () => {
	const car = { brand: "Audi", hp: 200, owner: "Hansi" };
	const { container } = render(fun1(car));
	expect(container).toHaveTextContent("Audi");
	expect(container).toHaveTextContent("200");
	expect(container).toHaveTextContent("Hansi");
});

// Test fun2
test("applies class based on isActive", () => {
	const { container } = render(fun2(true));
	expect(container.firstChild).toHaveClass("active");

	const { container: anotherContainer } = render(fun2(false));
	expect(anotherContainer.firstChild).toHaveClass("inactive");
});

// Test fun3
test("renders button with dynamic label and disabled state", () => {
	const { getByText } = render(fun3("Click Me", true));
	expect(getByText("Click Me")).toBeInTheDocument();
	expect(getByText("Click Me")).toBeEnabled();

	cleanup();

	const { getByText: getAnotherText } = render(fun3("Click Me", false));
	expect(getAnotherText("Click Me")).toBeInTheDocument();
	expect(getAnotherText("Click Me")).toBeDisabled();
});

// Test fun4
test("displays greeting based on time", () => {
	expect(render(fun4(10)).getByText("Hello")).toBeInTheDocument();
	expect(render(fun4(23)).getByText("Good Night")).toBeInTheDocument();
});

// Test fun5
test("displays number with appropriate background color", () => {
	expect(render(fun5(11)).getByText("11")).toHaveStyle("background-color: green");
	expect(render(fun5(9)).getByText("9")).toHaveStyle("background-color: red");
});
