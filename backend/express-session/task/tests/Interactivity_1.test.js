import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ClickAlertButton, HoverAlertButton, AlertButtons } from "../src/App";
import "@testing-library/jest-dom/extend-expect";

describe("ClickAlertButton", () => {
	it("displays alert when clicked", () => {
		const alertText = "Clicked!";
		window.alert = jest.fn();
		const { getByText } = render(<ClickAlertButton alertText={alertText} />);

		fireEvent.click(getByText("Click me"));

		expect(window.alert).toHaveBeenCalledWith(alertText);
	});
});

describe("HoverAlertButton", () => {
	it("displays alert when hovered on", () => {
		const alertText = "Hovered!";
		window.alert = jest.fn();
		const { getByText } = render(<HoverAlertButton alertText={alertText} />);

		fireEvent.mouseOver(getByText("Hover over me"));

		expect(window.alert).toHaveBeenCalledWith(alertText);
	});
});

describe("AlertButtons", () => {
	it("displays both buttons", () => {
		const alertText = "Hello!";
		const { getByText } = render(<AlertButtons alertText={alertText} />);

		expect(getByText("Click me")).toBeInTheDocument();
		expect(getByText("Hover over me")).toBeInTheDocument();
	});
});
