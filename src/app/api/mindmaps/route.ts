import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { title, userId } = await request.json();
  const mindMap = await prisma.mindMap.create({
    data: {
      title,
      userId,
    },
  });
  return NextResponse.json(mindMap);
}

export async function GET() {
  const mindMaps = await prisma.mindMap.findMany();
  return NextResponse.json(mindMaps);
}