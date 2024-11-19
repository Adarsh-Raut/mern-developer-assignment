import React from "react";
import "@xyflow/react/dist/style.css";
import Flow from "./component/Flow";

const App = () => {
  return (
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded flex ml-auto">
        Save Workflow
      </button>
      <Flow />
    </div>
  );
};

export default App;
