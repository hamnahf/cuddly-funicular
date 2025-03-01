
// components/MindMapNode.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Node } from '@prisma/client';

interface MindMapNodeProps {
  node: Node;
  onAddChild: (id: string) => void;
  onUpdatePosition: (variables: { nodeId: string; x: number; y: number; }) => void;
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ node, onAddChild, onUpdatePosition }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(node.content);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        onUpdatePosition({ nodeId: node.id, x: info.point.x, y: info.point.y });
      }}
      className="absolute p-4 bg-white rounded-lg shadow-md cursor-move"
      style={{ left: node.x, top: node.y }}
    >
      {isEditing ? (
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="p-2 border rounded"
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{content}</div>
      )}
      <button
        onClick={() => onAddChild(node.id)}
        className="mt-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
      >
        Add Child
      </button>
    </motion.div>
  );
};

export default MindMapNode;