import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TreeNodeComponent from "../components/TreeNode";
import useTreeStore from "../store/treeStore";


const mockAddNode = jest.fn();
const mockRemoveNode = jest.fn();
const mockEditNode = jest.fn();


jest.mock("../store/treeStore", () => {
  const actualStore = jest.requireActual("../store/treeStore"); 
  return {
    __esModule: true,
    default: () => ({
      ...actualStore.default(), 
      addNode: mockAddNode,
      removeNode: mockRemoveNode,
      editNode: mockEditNode,
    }),
  };
});


beforeEach(() => {
  jest.clearAllMocks();
});


const mockNode = {
  id: "1",
  name: "Hospital A",
  icon: "🏥",
  children: [],
};

describe("TreeNodeComponent", () => {
  test("renders the node name", () => {
    render(<TreeNodeComponent node={mockNode} />);
    expect(screen.getByText("Hospital A")).toBeInTheDocument();
  });

  test("opens context menu on right-click", () => {
    render(<TreeNodeComponent node={mockNode} />);
    const nodeElement = screen.getByText("Hospital A");

    fireEvent.contextMenu(nodeElement);
    expect(screen.getByText("✏️ Edit group")).toBeInTheDocument();
  });

  test("calls addNode when clicking 'Create child group'", () => {
    render(<TreeNodeComponent node={mockNode} />);

    fireEvent.contextMenu(screen.getByText("Hospital A"));
    fireEvent.click(screen.getByText("👤 Create child group"));

    expect(mockAddNode).toHaveBeenCalledTimes(1);
  });

  test("calls removeNode when clicking 'Remove group'", () => {
    render(<TreeNodeComponent node={mockNode} />);

    fireEvent.contextMenu(screen.getByText("Hospital A"));
    fireEvent.click(screen.getByText("🗑️ Remove group"));

    expect(mockRemoveNode).toHaveBeenCalledTimes(1);
  });

  test("allows editing a node name", () => {
    render(<TreeNodeComponent node={mockNode} />);
    fireEvent.click(screen.getByText("Hospital A"));

    const input = screen.getByDisplayValue("Hospital A");
    fireEvent.change(input, { target: { value: "Updated Hospital" } });
    fireEvent.blur(input);

    expect(mockEditNode).toHaveBeenCalledWith(mockNode.id, "Updated Hospital");
  });
});
