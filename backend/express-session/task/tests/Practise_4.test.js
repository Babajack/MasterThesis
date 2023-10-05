import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ContactManager from "../src/ContactManager";

describe("Contact Manager", () => {
	test("should add and display a contact", () => {
		render(<ContactManager />);

		const nameInput = screen.getByPlaceholderText(/Name/);
		const phoneInput = screen.getByPlaceholderText(/Phone Number/);
		const emailInput = screen.getByPlaceholderText(/Email/);
		const addButton = screen.getByText(/Add Contact/);

		fireEvent.change(nameInput, { target: { value: /.*John Doe.*/ } });
		fireEvent.change(phoneInput, { target: { value: /.*123-456-7890.*/ } });
		fireEvent.change(emailInput, { target: { value: /.*john@example.com.*/ } });

		fireEvent.click(addButton);

		expect(screen.getByText(/.*John Doe.*/)).toBeInTheDocument();
		expect(screen.getByText(/.*123-456-7890.*/)).toBeInTheDocument();
		expect(screen.getByText(/.*john@example.com.*/)).toBeInTheDocument();
	});

	test("should delete a contact", () => {
		render(<ContactManager />);

		const nameInput = screen.getByPlaceholderText("Name");
		const phoneInput = screen.getByPlaceholderText("Phone Number");
		const emailInput = screen.getByPlaceholderText("Email");
		const addButton = screen.getByText("Add Contact");

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });

		fireEvent.click(addButton);
		const deleteButton = screen.getByText("Delete");
		fireEvent.click(deleteButton);

		expect(screen.queryByText(/.*John Doe.*/)).not.toBeInTheDocument();
		expect(screen.queryByText(/.*123-456-7890.*/)).not.toBeInTheDocument();
		expect(screen.queryByText(/.*john@example.com.*/)).not.toBeInTheDocument();
	});

	test("should search and filter contacts", () => {
		render(<ContactManager />);

		const nameInput = screen.getByPlaceholderText("Name");
		const phoneInput = screen.getByPlaceholderText("Phone Number");
		const emailInput = screen.getByPlaceholderText("Email");
		const addButton = screen.getByText("Add Contact");
		const searchInput = screen.getByPlaceholderText("Search...");

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		fireEvent.click(addButton);

		fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
		fireEvent.change(phoneInput, { target: { value: "098-765-4321" } });
		fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
		fireEvent.click(addButton);

		fireEvent.change(searchInput, { target: { value: "Jane" } });

		expect(screen.getByText(/.*Jane Doe.*/)).toBeInTheDocument();
		expect(screen.queryByText(/.*John Doe.*/)).not.toBeInTheDocument();
	});
});
