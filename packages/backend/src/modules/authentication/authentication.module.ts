import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [RegisterModule, LoginModule, ServicesModule],
})
export class AuthenticationModule {}
