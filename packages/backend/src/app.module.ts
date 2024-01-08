import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfEmbeddingModule } from './modules/pdf-embedding/pdf-embedding.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { DocQuestionAnsweringModule } from './modules/doc-question-answering/doc-question-answering.module';
import { CompletionModule } from 'src/modules/completion/completion.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { BotModule } from './modules/bot/bot.module';
import { DiscordAppModule } from './modules/discord-app/discord-app.module';
import { LoginModule } from './modules/authentication/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import * as dotenv from 'dotenv';
import { AccountModule } from './modules/account/account.module';
import { SlackAppModule } from './modules/slack-app/slack-app.module';
import { DataSourceModule } from 'src/modules/data-source/data-source.module';
import { TestRegisterModule } from 'src/modules/test-register/test-register.module';

dotenv.config({ path: './.env.local' });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true, // Makes the ConfigModule global, no need to import it in other modules
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    LoginModule,
    PdfEmbeddingModule,
    DocQuestionAnsweringModule,
    CompletionModule,
    BotModule,
    ServicesModule,
    RepositoriesModule,
    AccountModule,
    DiscordAppModule,
    SlackAppModule,
    DataSourceModule,
    TestRegisterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
