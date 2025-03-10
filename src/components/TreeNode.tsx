import React, { useState } from "react";
import useTreeStore, { TreeNode } from "../store/treeStore";

type TreeNodeProps = {
  node: TreeNode;
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
  const { addNode, removeNode, editNode, moveNode } = useTreeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleEdit = () => {
    if (editing) {
      editNode(node.id, newName);
    }
    setEditing(!editing);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuOpen(true);
  };

  const handleCloseContextMenu = () => {
    setMenuOpen(false);
  };

  
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("nodeId", node.id);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); 
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const draggedNodeId = event.dataTransfer.getData("nodeId");
    if (draggedNodeId !== node.id) {
      moveNode(draggedNodeId, node.id);
    }
  };

  return (
    <div
      className="tree-node"
      onContextMenu={handleContextMenu}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="d-flex align-items-center">
        <span className="me-2">{node.icon}</span>
        {editing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleEdit}
            autoFocus
          />
        ) : (
          <span onClick={handleEdit} className="fw-bold">
            {node.name}
          </span>
        )}
        <button
          className="btn btn-light btn-sm ms-2"
          onClick={(e) => {
            e.stopPropagation();
            setMenuPosition({ x: e.clientX, y: e.clientY });
            setMenuOpen(!menuOpen);
          }}
        >
          ⋮
        </button>
      </div>

      {menuOpen && (
        <ul
          className="context-menu list-group shadow-sm rounded bg-white list-unstyled"
          style={{
            position: "absolute",
            zIndex: 1000,
            top: menuPosition.y,
            left: menuPosition.x,
          }}
          onMouseLeave={handleCloseContextMenu}
        >
          <li className="list-group-item" onClick={handleEdit}>
            ✏️ Edit group
          </li>
          <li
            className="list-group-item"
            onClick={() => addNode(node.id, "New Group", "👤")}
          >
             ➕Create child group
          </li>
          <li className="list-group-item">➕ Add/remove clinicians</li>
          <li
            className="list-group-item text-danger"
            onClick={() => removeNode(node.id)}
          >
            🗑️ Remove group
          </li>
        </ul>
      )}

      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <li key={child.id}>
              <TreeNodeComponent node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNodeComponent;
