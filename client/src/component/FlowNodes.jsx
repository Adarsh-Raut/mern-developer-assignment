import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { X, Plus, Mail, Clock, User } from "lucide-react";

export const NodeSelectionMenu = ({ onSelect, onClose, position }) => {
  const nodeTypes = [
    { id: "coldEmail", label: "Cold Email", icon: Mail },
    { id: "wait", label: "Wait", icon: Clock },
    { id: "leadSource", label: "Lead Source", icon: User },
  ];

  return (
    <div
      className="absolute bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50"
      style={{
        top: position.y,
        left: position.x + 100,
      }}
    >
      {nodeTypes.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded text-left"
          >
            <Icon size={16} className="text-gray-600" />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Cold Email Node
export const ColdEmailNode = ({ data, id }) => {
  const [template, setTemplate] = useState(data.template || "aiAssisted");

  useEffect(() => {
    if (data.onChange) {
      data.onChange({ template });
    }
  }, [template, data.onChange]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[250px] border border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-blue-500" />
          <span className="font-medium">Cold Email</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Template</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          >
            <option value="aiAssisted">AI Assisted</option>
            <option value="followUpAi">Follow Up AI Assisted</option>
            <option value="greetingsAi">Greetings AI Assisted</option>
          </select>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

// Wait Node
export const WaitNode = ({ data, id }) => {
  const [waitTime, setWaitTime] = useState(data.waitTime || "1");
  const [timeUnit, setTimeUnit] = useState(data.timeUnit || "hours");

  useEffect(() => {
    if (data.onChange) {
      data.onChange({ waitTime, timeUnit });
    }
  }, [waitTime, timeUnit, data.onChange]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[250px] border border-orange-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-500" />
          <span className="font-medium">Wait</span>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Time</label>
          <input
            type="number"
            min="1"
            value={waitTime}
            onChange={(e) => setWaitTime(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600">Unit</label>
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-orange-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-500"
      />
    </div>
  );
};

// Lead Source Node
export const LeadSourceNode = ({ data, id }) => {
  const [template, setTemplate] = useState(data.template || "aiAssisted");

  useEffect(() => {
    if (data.onChange) {
      data.onChange({ template });
    }
  }, [template, data.onChange]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[250px] border border-green-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <User size={16} className="text-green-500" />
          <span className="font-medium">Lead Source</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Template</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
          >
            <option value="aiAssisted">AI Assisted</option>
            <option value="followUpAi">Follow Up AI Assisted</option>
            <option value="greetingsAi">Greetings AI Assisted</option>
          </select>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
      />
    </div>
  );
};

export const AddNode = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(true);
  };

  const handleSelect = (nodeType) => {
    data.onClick(nodeType);
    setShowMenu(false);
  };

  return (
    <div className="relative mt-10">
      <div
        onClick={handleClick}
        className="bg-white rounded-lg shadow-lg p-2 cursor-pointer hover:bg-gray-50 border border-gray-200"
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-blue-500"
        />
        <Plus size={24} className="text-blue-500" />
      </div>

      {showMenu && (
        <NodeSelectionMenu
          onSelect={handleSelect}
          onClose={() => setShowMenu(false)}
          position={{ x: 0, y: 0 }}
        />
      )}
    </div>
  );
};
