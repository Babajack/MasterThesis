import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ToggleButton, Counter, InputMirror, ColorFields } from "../src/App";
import "@testing-library/jest-dom/extend-expect";

describe("Components", () => {
	test("ToggleButton works correctly", () => {
		const { getByText } = render(<ToggleButton />);
		const button = getByText("OFF");
		fireEvent.click(button);
		expect(button.textContent).toBe("ON");
		fireEvent.click(button);
		expect(button.textContent).toBe("OFF");
	});

	test("Counter works correctly", () => {
		const { getByText } = render(<Counter />);
		expect(getByText("0")).toBeTruthy();

		fireEvent.click(getByText("Increase"));
		expect(getByText("1")).toBeTruthy();

		fireEvent.click(getByText("Increase"));
		fireEvent.click(getByText("Increase"));

		fireEvent.click(getByText("Decrease"));
		expect(getByText("2")).toBeTruthy();

		fireEvent.click(getByText("Reset"));
		expect(getByText("0")).toBeTruthy();
	});

	test("InputMirror works correctly", () => {
		const { getByRole, getByText } = render(<InputMirror />);
		const input = getByRole("textbox");
		fireEvent.change(input, { target: { value: "Hello" } });
		expect(getByText("Hello")).toBeTruthy();
	});

	test("ColorFields works correctly", () => {
		const { getByText, getAllByRole } = render(<ColorFields />);
		const colorFields = getAllByRole("group");
		expect(colorFields[0].style.backgroundColor).toBe("green");
		expect(colorFields[1].style.backgroundColor).toBe("green");
		fireEvent.click(getByText("Switch Colors"));
		expect(colorFields[0].style.backgroundColor).toBe("red");
		expect(colorFields[1].style.backgroundColor).toBe("red");
	});
});
