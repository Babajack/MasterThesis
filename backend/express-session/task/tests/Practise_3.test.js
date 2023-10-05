import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FlashcardReviewer from "../src/FlashcardReviewer";

const mockCards = [
	{ question: "Question 1", answer: "Answer 1" },
	{ question: "Question 2", answer: "Answer 2" },
	{ question: "Question 3", answer: "Answer 3" },
];

test("renders question correctly and flips to answer on click", () => {
	const { getByText } = render(<FlashcardReviewer cards={mockCards} />);

	// Initial rendering should show the question
	expect(getByText("Question 1")).toBeInTheDocument();

	// After click, it should flip to show the answer
	fireEvent.click(getByText("Question 1"));
	expect(getByText("Answer 1")).toBeInTheDocument();
});

test("renders initial question and navigation buttons correctly", () => {
	const { getByText } = render(<FlashcardReviewer cards={mockCards} />);

	// Initial card should be the first one
	expect(getByText("Question 1")).toBeInTheDocument();
	expect(getByText("Previous")).toBeInTheDocument();
	expect(getByText("Next")).toBeInTheDocument();
});

test("navigates to next and previous cards correctly", () => {
	const { getByText } = render(<FlashcardReviewer cards={mockCards} />);

	// Navigate to the next card
	fireEvent.click(getByText("Next"));
	expect(getByText("Question 2")).toBeInTheDocument();

	// Navigate back to the previous card
	fireEvent.click(getByText("Previous"));
	expect(getByText("Question 1")).toBeInTheDocument();
});

test("does not go beyond the first or last card", () => {
	const { getByText } = render(<FlashcardReviewer cards={mockCards} />);

	// Try to go beyond the first card
	fireEvent.click(getByText("Previous"));
	expect(getByText("Question 1")).toBeInTheDocument();

	// Navigate to the last card
	fireEvent.click(getByText("Next"));
	fireEvent.click(getByText("Next"));

	// Try to go beyond the last card
	fireEvent.click(getByText("Next"));
	expect(getByText("Question 3")).toBeInTheDocument();
});
