import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AccountModule } from '../../../repositories/account/account.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [AccountModule, ServicesModule],
  controllers: [LoginController],
})
export class LoginModule {}
