export interface TreeMenu {
    id: string;
    name: string;
    children?: TreeMenu[];
  }
  
  export type TreeAction = "add" | "delete";