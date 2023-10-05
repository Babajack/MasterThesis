import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "../src/Counter";
import CounterList from "../src/CounterList";
import "@testing-library/jest-dom/extend-expect";

test("renders count and buttons correctly", () => {
	const { getByText } = render(<Counter />);
	expect(getByText("+")).toBeInTheDocument();
	expect(getByText("-")).toBeInTheDocument();
	expect(getByText("reset")).toBeInTheDocument();
});

test("handles button clicks correctly", () => {
	const { getByText, getAllByText } = render(<CounterList numOfCounters={2} />);

	fireEvent.click(getAllByText("+")[0]);
	fireEvent.click(getAllByText("+")[0]);
	fireEvent.click(getAllByText("+")[1]);

	expect(getByText("1")).toBeInTheDocument();
	expect(getByText("2")).toBeInTheDocument();
});

test("renders multiple counters and total count", () => {
	const { getAllByText, getByText } = render(<CounterList numOfCounters={3} />);

	expect(getAllByText("0").length).toBe(3);
	expect(getByText(/.*Total Count: 0.*/i)).toBeInTheDocument();
});

test("increments total count correctly", () => {
	const { getAllByText, getByText } = render(<CounterList numOfCounters={3} />);

	fireEvent.click(getAllByText("+")[0]);
	expect(getByText(/.*Total Count: 1.*/i)).toBeInTheDocument();

	fireEvent.click(getAllByText("+")[1]);
	expect(getByText(/.*Total Count: 2.*/i)).toBeInTheDocument();

	fireEvent.click(getAllByText("+")[2]);
	expect(getByText(/.*Total Count: 3.*/i)).toBeInTheDocument();
});

test("decrements total count correctly", () => {
	const { getAllByText, getByText } = render(<CounterList numOfCounters={3} />);

	fireEvent.click(getAllByText("-")[0]);
	expect(getByText(/.*Total Count: -1.*/i)).toBeInTheDocument();

	fireEvent.click(getAllByText("-")[1]);
	expect(getByText(/.*Total Count: -2.*/i)).toBeInTheDocument();

	fireEvent.click(getAllByText("-")[2]);
	expect(getByText(/.*Total Count: -3.*/i)).toBeInTheDocument();
});

test("reset total count correctly", () => {
	const { getAllByText, getByText } = render(<CounterList numOfCounters={3} />);

	fireEvent.click(getAllByText("+")[0]);
	fireEvent.click(getAllByText("+")[0]);
	fireEvent.click(getAllByText("+")[0]);
	fireEvent.click(getAllByText("+")[1]);
	fireEvent.click(getAllByText("+")[2]);

	fireEvent.click(getAllByText(/reset/i)[0]);
	expect(getByText(/.*Total Count: 2.*/i)).toBeInTheDocument();
});
