import React from "react";
import TreeNode from "./TreeNode";
import useTreeStore from "../store/treeStore";

const Tree: React.FC = () => {
  const { tree } = useTreeStore(); 

  return (
    <div>
      <h3>Clinician Groups</h3>
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default Tree;
