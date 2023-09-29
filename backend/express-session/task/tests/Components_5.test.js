import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserIds, UsersAboveThirty, YoungestUser, SortedActiveUsers, UserCounts } from "../src/App";

const newTestUsers = [
	{ id: 1, name: "Alex", age: 20, isActive: true, isAdmin: false },
	{ id: 2, name: "Sam", age: 40, isActive: false, isAdmin: true },
	{ id: 3, name: "Olivia", age: 36, isActive: false, isAdmin: true },
	{ id: 4, name: "Mike", age: 18, isActive: true, isAdmin: false },
	{ id: 5, name: "Emma", age: 30, isActive: true, isAdmin: false },
];

test("UserIds with new data renders correctly", () => {
	const { getByText } = render(<UserIds users={newTestUsers} />);
	expect(getByText("1")).toBeInTheDocument();
	expect(getByText("2")).toBeInTheDocument();
	expect(getByText("3")).toBeInTheDocument();
	expect(getByText("4")).toBeInTheDocument();
	expect(getByText("5")).toBeInTheDocument();
});

test("UsersAboveThirty with new data renders correctly", () => {
	const { getByText } = render(<UsersAboveThirty users={newTestUsers} />);
	expect(getByText("Sam")).toBeInTheDocument();
	expect(getByText("Olivia")).toBeInTheDocument();
});

test("YoungestUser with new data renders correctly", () => {
	const { getByText } = render(<YoungestUser users={newTestUsers} />);
	expect(getByText("Mike")).toBeInTheDocument();
});

test("SortedActiveUsers renders names in sorted order", () => {
	const { getAllByRole } = render(<SortedActiveUsers users={newTestUsers} />);

	const displayedNames = getAllByRole("listitem").map((li) => li.textContent);

	const sortedActiveNames = newTestUsers
		.filter((user) => user.isActive)
		.map((user) => user.name)
		.sort((a, b) => a.localeCompare(b));

	expect(displayedNames).toEqual(sortedActiveNames);
});

test("UserCounts with new data renders correctly", () => {
	const { getByText } = render(<UserCounts users={newTestUsers} />);
	expect(getByText(/active users: 3/i)).toBeInTheDocument();
	expect(getByText(/inactive users: 2/i)).toBeInTheDocument();
});
