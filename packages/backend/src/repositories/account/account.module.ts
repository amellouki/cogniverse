import { Module } from '@nestjs/common';
import { AccountEntity } from 'src/repositories/account/account.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountEntity],
  exports: [AccountEntity],
})
export class AccountModule {}
