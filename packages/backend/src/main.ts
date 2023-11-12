import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SlackAppService } from './modules/slack-app/slack-app.service';

dotenv.config({ path: './.env.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ALLOWED_DOMAINS?.split(','), // Allow these origins
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'], // Allow these headers
    credentials: true, // Allow cookies and credentials to be sent with requests
  });

  // Get SlackService
  const slackService = app.get(SlackAppService);
  // Access the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();
  // Attach the Slack Bolt App to the Express app
  slackService.attachToExpress(expressApp);

  const config = new DocumentBuilder()
    .setTitle('Cogniverse API')
    .setVersion('v0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
