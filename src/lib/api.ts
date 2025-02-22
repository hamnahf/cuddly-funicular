import { prisma } from "./prisma";


export const createMindMap = async (title: string, userId: string) => {
  return prisma.mindMap.create({
    data: {
      title,
      userId,
    },
  });
};

export const addNode = async (
  mindMapId: string,
  content: string,
  x: number,
  y: number,
  parentId?: string
) => {
  return prisma.node.create({
    data: {
      content,
      x,
      y,
      parentId,
      mindMapId,
    },
  });
};

export const updateNodePosition = async (
  nodeId: string,
  x: number,
  y: number
) => {
  return prisma.node.update({
    where: { id: nodeId },
    data: { x, y },
  });
};
