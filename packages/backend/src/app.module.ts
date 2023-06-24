import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatSessionModule } from './modules/chat-session/chat-session.module';
import { PdfEmbeddingModule } from './modules/pdf-embedding/pdf-embedding.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { DocQuestionAnsweringModule } from './modules/doc-question-answering/doc-question-answering.module';
import { ConversationalRetrievalQaModule } from './modules/conversational-retrieval-qa/conversational-retrieval-qa.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true, // Makes the ConfigModule global, no need to import it in other modules
    }),
    ChatSessionModule,
    PdfEmbeddingModule,
    DocQuestionAnsweringModule,
    ConversationalRetrievalQaModule,
    ServicesModule,
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
