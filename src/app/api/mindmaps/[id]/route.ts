import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ParamsWithId } from '@/types';

export async function GET(
  request: Request,
  context: { params: ParamsWithId },
) {
  try {
    const params = await context.params;
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: params.id },
      include: {
        nodes: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!mindMap) {
      return NextResponse.json(
        { error: 'Mind map not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mindMap);
  } catch (error) {
    console.error('Failed to fetch mind map:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mind map' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: ParamsWithId },
) {
  try {
    const params = await context.params;
    const { title } = await request.json();

    const mindMap = await prisma.mindMap.findUnique({
      where: { id: params.id },
    });

    if (!mindMap) {
      return NextResponse.json(
        { error: 'Mind map not found' },
        { status: 404 }
      );
    }

    const updatedMindMap = await prisma.mindMap.update({
      where: { id: params.id },
      data: { 
        title,
        updatedAt: new Date(),
      },
      include: {
        nodes: true,
      },
    });

    return NextResponse.json(updatedMindMap);
  } catch (error) {
    console.error('Failed to update mind map:', error);
    return NextResponse.json(
      { error: 'Failed to update mind map' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: ParamsWithId },
) {
  try {
    const params = await context.params;
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: params.id },
    });

    if (!mindMap) {
      return NextResponse.json(
        { error: 'Mind map not found' },
        { status: 404 }
      );
    }

    // Delete the mind map (nodes will be deleted automatically due to cascade delete)
    await prisma.mindMap.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete mind map:', error);
    return NextResponse.json(
      { error: 'Failed to delete mind map' },
      { status: 500 }
    );
  }
}