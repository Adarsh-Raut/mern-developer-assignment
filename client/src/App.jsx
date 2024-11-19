import React from "react";
import "@xyflow/react/dist/style.css";
import Flow from "./component/Flow";

const App = () => {
  const handleSave = async (nodes) => {
    try {
      const workflowData = nodes.reduce(
        (acc, node) => {
          if (node.type === "coldEmail") {
            acc.coldEmails.push({
              id: node.id,
              email: node.data.email,
            });
          } else if (node.type === "wait") {
            acc.wait.push({
              id: node.id,
              waitTime: node.data.waitTime,
              timeUnit: node.data.timeUnit,
            });
          } else if (node.type === "leadSource") {
            acc.leadSources.push({
              id: node.id,
              email: node.data.email,
            });
          }
          return acc;
        },
        { coldEmails: [], wait: [], leadSources: [] }
      );

      const response = await fetch("YOUR_BACKEND_URL/workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowData),
      });

      if (!response.ok) {
        throw new Error("Failed to save workflow");
      }

      alert("Workflow saved successfully!");
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert("Failed to save workflow");
    }
  };
  return (
    <div>
      <Flow onSave={handleSave} />
    </div>
  );
};

export default App;
