type MindMapNode = {
    id: string;
    content: string;
    parentId: string | null;
    x: number;
    y: number;
    children?: MindMapNode[];
  };
  