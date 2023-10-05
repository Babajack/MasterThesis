import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
	AddCityComponent,
	RemoveCityComponent,
	InsertCityComponent,
	TransformCityComponent,
	ReplaceCityComponent,
	UpdatePopulationComponent,
} from "../src/App";

test("adds Berlin and Stockholm to cities without duplicates", () => {
	const { getByText, getAllByText } = render(<AddCityComponent />);
	fireEvent.click(getByText("Add Berlin and Stockholm"));
	expect(getByText("Stockholm")).toBeTruthy();
	expect(getByText("Berlin")).toBeTruthy();

	// Click again to see if there are any duplicates
	fireEvent.click(getByText("Add Berlin and Stockholm"));
	const displayedCities = ["Stockholm", "New York", "London", "Tokyo", "Berlin"];
	displayedCities.forEach((city) => {
		const cityElements = getAllByText(city);
		expect(cityElements.length).toBe(1); // Each city should appear only once
	});
});

test("removes London from cities", () => {
	const { getByText, queryByText } = render(<RemoveCityComponent />);
	fireEvent.click(getByText("Remove London"));
	expect(queryByText("London")).toBeFalsy();
});

test("inserts Paris between London and Tokyo without duplicates", () => {
	const { getByText, getAllByText } = render(<InsertCityComponent />);
	fireEvent.click(getByText("Insert Paris"));
	expect(getByText("Paris")).toBeTruthy();

	// Click again to see if there are any duplicates
	fireEvent.click(getByText("Insert Paris"));
	const displayedCities = ["New York", "London", "Paris", "Tokyo"];
	displayedCities.forEach((city) => {
		const cityElements = getAllByText(city);
		expect(cityElements.length).toBe(1); // Each city should appear only once
	});
});

test("transforms city names to uppercase", () => {
	const { getByText, queryByText } = render(<TransformCityComponent />);
	fireEvent.click(getByText("Uppercase Cities"));
	expect(queryByText("NEW YORK")).toBeTruthy();
	expect(queryByText("LONDON")).toBeTruthy();
	expect(queryByText("TOKYO")).toBeTruthy();
});

test("replaces Tokyo with Osaka", () => {
	const { getByText, queryByText } = render(<ReplaceCityComponent />);
	fireEvent.click(getByText("Replace Tokyo"));
	expect(queryByText("Tokyo")).toBeFalsy();
	expect(queryByText("Osaka")).toBeTruthy();
});

test("updates New York population to 9 million", () => {
	const { getByText, queryByText } = render(<UpdatePopulationComponent />);
	fireEvent.click(getByText("Update New York Population"));
	expect(queryByText("New York - 9 million")).toBeTruthy();
});
