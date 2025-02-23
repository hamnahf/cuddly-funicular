import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ParamsWithIds } from '@/types';

export async function PATCH(
  request: Request,
  context: { params: ParamsWithIds },
) {
  try {
    const params = await context.params;
    const { x, y, content } = await request.json();
    
    // Validate that the node exists and belongs to the correct mind map
    const existingNode = await prisma.node.findFirst({
      where: {
        id: params.nodeId,
        mindMapId: params.id,
      },
    });

    if (!existingNode) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      );
    }

    // Update the node
    const updatedNode = await prisma.node.update({
      where: { id: params.nodeId },
      data: {
        ...(x !== undefined && { x }),
        ...(y !== undefined && { y }),
        ...(content !== undefined && { content }),
      },
    });

    return NextResponse.json(updatedNode);
  } catch (error) {
    console.error('Failed to update node:', error);
    return NextResponse.json(
      { error: 'Failed to update node' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: ParamsWithIds },
) {
  try {
    const params = await context.params;
    // Validate that the node exists and belongs to the correct mind map
    const existingNode = await prisma.node.findFirst({
      where: {
        id: params.nodeId,
        mindMapId: params.id,
      },
    });

    if (!existingNode) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      );
    }

    // Delete the node and all its children recursively
    // Note: This requires cascading deletes to be set up in the Prisma schema
    const deletedNode = await prisma.node.delete({
      where: { id: params.nodeId },
    });

    return NextResponse.json(deletedNode);
  } catch (error) {
    console.error('Failed to delete node:', error);
    return NextResponse.json(
      { error: 'Failed to delete node' },
      { status: 500 }
    );
  }
}