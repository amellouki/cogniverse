import { Module } from '@nestjs/common';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class AccountModule {}
