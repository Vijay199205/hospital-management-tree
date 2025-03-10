/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Tree from "../components/Tree";
import useTreeStore from "../store/treeStore";


jest.mock("../store/treeStore", () => ({
  __esModule: true,
  default: () => ({
    tree: [
      { id: "1", name: "Hospital A", icon: "🏥", children: [] },
    ],
  }),
}));

test("renders tree component with title", () => {
  render(<Tree />);
  
  expect(screen.getByText("Clinician Groups")).toBeInTheDocument();
});

test("renders tree nodes", () => {
  render(<Tree />);
  
  expect(screen.getByText("Hospital A")).toBeInTheDocument();
});

