import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ParamsWithId } from '@/types';

export async function POST(
  request: NextRequest,
  context: { params: ParamsWithId },
) {
  try {

    const params = await context.params;
    const { content, x, y, parentId } = await request.json();
    
    // Validate that the mind map exists
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: params.id },
    });

    if (!mindMap) {
      return NextResponse.json(
        { error: 'Mind map not found' },
        { status: 404 }
      );
    }

    // Create the new node
    const node = await prisma.node.create({
      data: {
        content,
        x,
        y,
        parentId,
        mindMapId: params.id,
      },
    });

    return NextResponse.json(node);
  } catch (error) {
    console.error('Failed to create node:', error);
    return NextResponse.json(
      { error: 'Failed to create node' },
      { status: 500 }
    );
  }
}