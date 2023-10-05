import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Counter, CounterPair, Box, BoxPair, Slider, SliderPair } from "../src/App";
import { render, screen, fireEvent } from "@testing-library/react";

test("increments total count when individual counters are clicked", () => {
	const { getAllByText, getByText } = render(<CounterPair />);
	const buttons = getAllByText("Increment");
	fireEvent.click(buttons[0]);
	fireEvent.click(buttons[1]);
	expect(getByText(/2/)).toBeInTheDocument();
	fireEvent.click(buttons[0]);
	fireEvent.click(buttons[1]);
	expect(getByText(/4/)).toBeInTheDocument();
});

test("BoxPair toggles both themes correctly", () => {
	const { getAllByText, getByText, debug } = render(<BoxPair />);

	const toggleBothThemesButton = getByText(/Toggle Both Themes/i);
	const initialBoxes = getAllByText("Box");

	// Check initial themes
	expect(initialBoxes[0].style.backgroundColor).toBe("white");
	expect(initialBoxes[1].style.backgroundColor).toBe("white");

	// Click on "Toggle Both Themes"
	fireEvent.click(toggleBothThemesButton);

	// Check if both boxes' themes have toggled
	expect(initialBoxes[0].style.backgroundColor).toBe("black");
	expect(initialBoxes[1].style.backgroundColor).toBe("black");

	// Check individual box toggles
	const toggleBox1 = getAllByText(/Toggle Box Theme/i)[0]
		.closest("div")
		.querySelector("button");
	const toggleBox2 = getAllByText(/Toggle Box Theme/i)[1]
		.closest("div")
		.querySelector("button");

	fireEvent.click(toggleBox1);
	expect(initialBoxes[0].style.backgroundColor).toBe("white");
	expect(initialBoxes[1].style.backgroundColor).toBe("black");

	fireEvent.click(toggleBox2);
	expect(initialBoxes[0].style.backgroundColor).toBe("white");
	expect(initialBoxes[1].style.backgroundColor).toBe("white");
});

test("sliders sum to 100", () => {
	render(<SliderPair />);
	const sliders = screen.getAllByRole("slider");
	fireEvent.change(sliders[0], { target: { value: "30" } });
	expect(sliders[0].value).toBe("30");
	expect(sliders[1].value).toBe("70");
});
