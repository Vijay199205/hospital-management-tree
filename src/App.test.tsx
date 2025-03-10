import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


jest.mock("react-dnd", () => ({
  DndProvider: ({ children }: { children: React.ReactNode }) => children,
  useDrag: () => [{ isDragging: false }, jest.fn()],
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

jest.mock("react-dnd-html5-backend", () => ({}));

test("renders the Tree component", () => {
  render(<App />);
  const headingElement = screen.getByText(/Clinician Groups/i);
  expect(headingElement).toBeInTheDocument();
});
