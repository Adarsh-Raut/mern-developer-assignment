import React from "react";
import Flow from "./Flow";
import "@xyflow/react/dist/style.css";

const ReactFlowPage = () => {
  const BASE_URL = "http://localhost:8000";

  const handleSave = async (nodes) => {
    try {
      const workflowData = nodes.reduce(
        (acc, node) => {
          if (node.type === "coldEmail") {
            acc.coldEmails.push({
              id: node.id,
              template: node.data.template,
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
              template: node.data.template,
            });
          }
          return acc;
        },
        { coldEmails: [], wait: [], leadSources: [] }
      );

      const response = await fetch(`${BASE_URL}/schedule`, {
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
  return <Flow onSave={handleSave} />;
};

export default ReactFlowPage;
