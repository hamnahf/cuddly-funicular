import { PrismaClient } from '@prisma/client';


const createPrismaClient = () =>
  new PrismaClient({
    log:
      ['query', 'error', 'warn'],
  });

export const prisma = createPrismaClient();
