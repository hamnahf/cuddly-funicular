export type MindMapNode = {
  id: string;
  content: string;
  parentId: string | null;
  x: number;
  y: number;
  children?: MindMapNode[];
};

export type ParamsWithId = Promise<{ id: string }>;
export type ParamsWithIds = Promise<{ id: string, nodeId: string }>;
