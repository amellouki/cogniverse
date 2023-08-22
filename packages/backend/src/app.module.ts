import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfEmbeddingModule } from './modules/pdf-embedding/pdf-embedding.module';
import {ConfigModule} from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { DocQuestionAnsweringModule } from './modules/doc-question-answering/doc-question-answering.module';
import { RetrievalConversationalModule } from './modules/retrieval-conversational/retrieval-conversational.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { BotModule } from './modules/bot/bot.module';
import {GatewayIntentBits} from 'discord.js'
import {DiscordModule} from "./modules/discord/discord.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true, // Makes the ConfigModule global, no need to import it in other modules
    }),
    PdfEmbeddingModule,
    DocQuestionAnsweringModule,
    RetrievalConversationalModule,
    BotModule,
    ServicesModule,
    RepositoriesModule,
    DiscordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
