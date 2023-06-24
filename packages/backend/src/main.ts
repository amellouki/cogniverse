import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config({ path: './.env.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ALLOWED_DOMAINS?.split(','), // Allow these origins
    methods: 'GET,HEAD', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allow these headers
    credentials: true, // Allow cookies and credentials to be sent with requests
  });

  const config = new DocumentBuilder()
    .setTitle('Wise api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
