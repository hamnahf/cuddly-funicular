
// components/MindMap.tsx
import { Node } from '@prisma/client';
import { useMindMap } from '../hooks/useMindMap';
import MindMapNode from './MindMapNode';

const MindMap = ({ id }: { id: string }) => {
  const { mindMap, addNode, updateNodePosition } = useMindMap(id);

  const handleAddChild = (parentId: string | undefined) => {
    const offset = 100;
    addNode({
      content: 'New Node',
      x: parentId ? mindMap.nodes.find((n: Node) => n.id === parentId).x + offset : 0,
      y: parentId ? mindMap.nodes.find((n: Node) => n.id === parentId).y + offset : 0,
      parentId,
    });
  };

  return (
    <div className="relative w-full h-screen bg-gray-50">
      {mindMap?.nodes.map((node: Node) => (
        <MindMapNode
          key={node.id}
          node={node}
          onAddChild={handleAddChild}
          onUpdatePosition={updateNodePosition}
        />
      ))}
      <button
        onClick={() => handleAddChild(undefined)}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full"
      >
        Add Root Node
      </button>
    </div>
  );
};

export default MindMap;