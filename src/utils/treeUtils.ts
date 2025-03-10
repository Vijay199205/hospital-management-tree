import { TreeMenu } from "../types/types";

// treeUtils.ts
export function findNodeById(tree: TreeMenu, id: string): TreeMenu | null {
    if (tree.id === id) return tree;
    if (tree.children) {
      for (const child of tree.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  }
  
  export {}; // Optional, if no other exports are needed