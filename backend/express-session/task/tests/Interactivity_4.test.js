import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BookComponent1, BookComponent2, SchoolComponent, ProductComponent } from "../src/App";
import "@testing-library/jest-dom/extend-expect";

test("BookComponent1 updates correctly", () => {
	const { getByText } = render(<BookComponent1 />);
	expect(getByText("Pages: 400")).toBeInTheDocument();
	fireEvent.click(getByText("Update Pages"));
	expect(getByText("Harry Potter")).toBeInTheDocument();
	expect(getByText("Author: J.K. Rowling")).toBeInTheDocument();
	expect(getByText("Pages: 450")).toBeInTheDocument();
});

test("BookComponent2 adds correctly", () => {
	const { getByText } = render(<BookComponent2 />);
	fireEvent.click(getByText("Add Genre"));
	expect(getByText("Harry Potter")).toBeInTheDocument();
	expect(getByText("Author: J.K. Rowling")).toBeInTheDocument();
	expect(getByText("Pages: 400")).toBeInTheDocument();
	expect(getByText("Genre: Fantasy")).toBeInTheDocument();
});

test("SchoolComponent updates correctly", () => {
	const { getByText } = render(<SchoolComponent />);
	expect(getByText("Principal: John Johnson")).toBeInTheDocument();
	fireEvent.click(getByText("Update Principal"));
	expect(getByText("Principal: Alice Johnson")).toBeInTheDocument();
	expect(getByText("Albert Einstein Elementary School")).toBeInTheDocument();
});

test("ProductComponent toggles correctly", () => {
	const { getByText } = render(<ProductComponent />);
	expect(getByText("Status: Available")).toBeInTheDocument();
	fireEvent.click(getByText("Toggle Availability"));
	expect(getByText("Laptop")).toBeInTheDocument();
	expect(getByText("Brand: TechCo")).toBeInTheDocument();
	expect(getByText("Status: Out of Stock")).toBeInTheDocument();
	fireEvent.click(getByText("Toggle Availability"));
	expect(getByText("Laptop")).toBeInTheDocument();
	expect(getByText("Brand: TechCo")).toBeInTheDocument();
	expect(getByText("Status: Available")).toBeInTheDocument();
});
