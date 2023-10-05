import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "../src/TodoList";

test("renders input, add button, and initial todos", () => {
	const { getByPlaceholderText, getByText } = render(<TodoList />);

	expect(getByPlaceholderText(/Enter todo.../i)).toBeInTheDocument();
	expect(getByText(/Add Todo/i)).toBeInTheDocument();
});

test("adds a new todo correctly", () => {
	const { getByPlaceholderText, getByText } = render(<TodoList />);

	const input = getByPlaceholderText(/Enter todo.../i);
	fireEvent.change(input, { target: { value: "New Todo" } });
	fireEvent.click(getByText(/Add Todo/i));

	expect(getByText("New Todo")).toBeInTheDocument();
});

test("deletes a todo correctly", () => {
	const { getByPlaceholderText, getByText } = render(<TodoList />);

	const input = getByPlaceholderText(/Enter todo.../i);
	fireEvent.change(input, { target: { value: "Todo to del" } });
	fireEvent.click(getByText(/Add Todo/i));
	fireEvent.click(getByText(/Delete/i));

	expect(() => getByText("Todo to delete")).toThrow();
});
