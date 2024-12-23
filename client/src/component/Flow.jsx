import { useCallback, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AddNode, ColdEmailNode, WaitNode, LeadSourceNode } from "./FlowNodes";

// start node
const StartNode = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px] border border-gray-200">
      <div className="flex items-center justify-center">
        <span className="font-medium text-gray-700">Start</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-500"
      />
    </div>
  );
};

const nodeTypes = {
  addNode: AddNode,
  coldEmail: ColdEmailNode,
  wait: WaitNode,
  leadSource: LeadSourceNode,
  startNode: StartNode,
};

const initialNodes = [
  {
    id: "start",
    type: "startNode",
    position: { x: 250, y: 50 },
    data: {
      label: "Start",
    },
  },
  {
    id: "add-1",
    type: "addNode",
    position: { x: 250, y: 200 },
    data: { label: "Add Node" },
  },
];

const initialEdges = [
  {
    id: "start-add-1",
    source: "start",
    target: "add-1",
    type: "straight",
  },
];

function Flow({ onSave }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleSave = () => {
    console.log("Nodes before saving:", nodes);
    onSave(nodes);
  };

  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...newData,
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const addNode = useCallback(
    (addNodeId, nodeType) => {
      const addNodeIndex = parseInt(addNodeId.split("-")[1]);
      const addNode = nodes.find((node) => node.id === addNodeId);

      if (!addNode) return;

      const newNodeId = `node-${addNodeIndex}`;
      let newNode = {
        id: newNodeId,
        type: nodeType,
        position: {
          x: addNode.position.x,
          y: addNode.position.y,
        },
        data: {
          onChange: (updatedData) => updateNodeData(newNodeId, updatedData),
        },
      };

      switch (nodeType) {
        case "coldEmail":
          newNode.data = {
            ...newNode.data,

            template: "aiAssisted",
            label: "Cold Email",
          };
          break;
        case "wait":
          newNode.data = {
            ...newNode.data,
            waitTime: "1",
            timeUnit: "hours",
            label: "Wait",
          };
          break;
        case "leadSource":
          newNode.data = {
            ...newNode.data,

            template: "aiAssisted",
            label: "Lead Source",
          };
          break;
      }

      const newAddNodeId = `add-${addNodeIndex + 1}`;
      const newAddNode = {
        id: newAddNodeId,
        type: "addNode",
        position: {
          x: addNode.position.x,
          y: addNode.position.y + 300,
        },
        data: {
          label: "Add Node",
          onClick: (nodeType) => addNode(newAddNodeId, nodeType),
        },
      };

      const updatedEdges = edges.map((edge) => {
        if (edge.target === addNodeId) {
          return { ...edge, target: newNodeId };
        }
        return edge;
      });

      const newEdges = [
        ...updatedEdges,
        {
          id: `${newNodeId}-${newAddNodeId}`,
          source: newNodeId,
          target: newAddNodeId,
          type: "straight",
        },
      ];

      setNodes((nds) => [
        ...nds.filter((node) => node.id !== addNodeId),
        newNode,
        newAddNode,
      ]);
      setEdges(newEdges);
    },
    [nodes, edges, updateNodeData]
  );

  const processedNodes = nodes.map((node) => {
    if (node.type === "addNode") {
      return {
        ...node,
        data: {
          ...node.data,
          onClick: (nodeType) => addNode(node.id, nodeType),
        },
      };
    }
    if (["coldEmail", "wait", "leadSource"].includes(node.type)) {
      return {
        ...node,
        data: {
          ...node.data,
          onChange: (updatedData) => updateNodeData(node.id, updatedData),
        },
      };
    }
    return node;
  });

  return (
    <div className="w-full h-screen">
      <button
        onClick={handleSave}
        className="absolute top-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Save Workflow
      </button>
      <ReactFlow
        nodes={processedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background variant="none" bgColor="#FFFFFF" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
