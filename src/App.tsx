import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tree from "./components/Tree";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-3">
        <Tree />
      </div>
    </DndProvider>
  );
};

export default App;
