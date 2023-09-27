import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import fs from "fs";
import path from "path";

// Read the HTML file into a string
const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"), "utf8");

// Simulate the DOM environment for the tests
document.body.innerHTML = html;

describe("HTML Button Test", () => {
	// Test for button existence
	it("should have a button with the text 'Click Me'", () => {
		const button = screen.getByRole("button", { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click Me");
	});

	// Test for button's onclick functionality
	it("should display an alert with 'Button clicked!' when the button is clicked", () => {
		const button = screen.getByRole("button", { name: /click me/i });

		// Mocking the alert function to test it
		window.alert = jest.fn();

		button.click();

		expect(window.alert).toHaveBeenCalledWith("Button clicked!");
	});
});
