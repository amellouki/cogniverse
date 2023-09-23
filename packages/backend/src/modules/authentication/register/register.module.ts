import { Module } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterController } from './register.controller';
import { AccountModule } from '../../../repositories/account/account.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [AccountModule, ServicesModule],
  providers: [RegisterService],
  controllers: [RegisterController],
})
export class RegisterModule {}
