import { create } from "zustand";

export type TreeNode = {
  id: string;
  name: string;
  icon: string;
  children: TreeNode[];
};

type TreeState = {
  tree: TreeNode[];
  addNode: (parentId: string, name: string, icon: string) => void;
  removeNode: (id: string) => void;
  editNode: (id: string, newName: string) => void;
  moveNode: (nodeId: string, targetParentId: string) => void;
};

const useTreeStore = create<TreeState>((set) => ({
  tree: [
    {
      id: "1",
      name: "Hospital A",
      icon: "🏥",
      children: [
        { id: "3", name: "Shoulder", icon: "👤", children: [] },
        { id: "4", name: "Knee", icon: "👤", children: [] },
        {
          id: "5",
          name: "Stomach",
          icon: "👤",
          children: [
            { id: "6", name: "Crohn’s", icon: "👤", children: [] },
            { id: "7", name: "Irritable Bowel", icon: "👤", children: [] },
            { id: "8", name: "Ulcerative Colitis", icon: "👤", children: [] },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Hospital B",
      icon: "🏥",
      children: [
        { id: "9", name: "Gambling addiction", icon: "👤", children: [] },
        { id: "10", name: "Anxiety", icon: "👤", children: [] },
        { id: "11", name: "Depression", icon: "👤", children: [] },
      ],
    },
  ],

  addNode: (parentId, name, icon) =>
    set((state) => {
      const addChild = (nodes: TreeNode[]): TreeNode[] =>
        nodes.map((node) =>
          node.id === parentId
            ? {
                ...node,
                children: [
                  ...node.children,
                  { id: Date.now().toString(), name, icon, children: [] },
                ],
              }
            : { ...node, children: addChild(node.children) }
        );

      return { tree: addChild(state.tree) };
    }),






    
  removeNode: (id) =>
    set((state) => {
      const removeChild = (nodes: TreeNode[]): TreeNode[] =>
        nodes.filter((node) => node.id !== id).map((node) => ({
          ...node,
          children: removeChild(node.children),
        }));

      return { tree: removeChild(state.tree) };
    }),

  editNode: (id, newName) =>
    set((state) => {
      const updateNode = (nodes: TreeNode[]): TreeNode[] =>
        nodes.map((node) =>
          node.id === id ? { ...node, name: newName } : { ...node, children: updateNode(node.children) }
        );

      return { tree: updateNode(state.tree) };
    }),

    moveNode: (nodeId, targetParentId) =>
      set((state) => {
        let draggedNode: TreeNode | null = null;
    
        
        const removeNode = (nodes: TreeNode[]): TreeNode[] =>
          nodes
            .filter((node) => {
              if (node.id === nodeId) {
                draggedNode = node;
                return false;
              }
              return true;
            })
            .map((node) => ({ ...node, children: removeNode(node.children) }));
    
        let updatedTree = removeNode(state.tree);
    
        
        const addNodeToNewParent = (nodes: TreeNode[]): TreeNode[] =>
          nodes.map((node) =>
            node.id === targetParentId && draggedNode
              ? { ...node, children: [...node.children, draggedNode] }
              : { ...node, children: addNodeToNewParent(node.children) }
          );
    
        updatedTree = addNodeToNewParent(updatedTree);
    
        return { tree: updatedTree };
      }),
    }));

export default useTreeStore;
