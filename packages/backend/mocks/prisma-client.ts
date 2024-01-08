import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

type Methods =
  | 'create'
  | 'findMany'
  | 'findUnique'
  | 'update'
  | 'delete'
  | 'upsert';

export const prismaClientMock = {
  bot: mockDeep<Pick<PrismaClient['bot'], Methods>>(),
};
