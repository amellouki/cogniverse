import { prismaClientMock } from 'cogniverse-backend/src/mocks/prisma-client';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from './account.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('AccountService', () => {
  let service: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRepository,
        {
          provide: PrismaService,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    service = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
