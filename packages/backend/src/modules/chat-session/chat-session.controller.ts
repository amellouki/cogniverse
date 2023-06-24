import { Controller, Get, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';

interface ChatSession extends ExpressSession {
  messages: number;
}

interface ChatRequest extends Request {
  session: ChatSession;
}

@Controller('chat-session')
export class ChatSessionController {
  private readonly logger = new Logger(ChatSessionController.name);

  @Get()
  chat(@Req() request: ChatRequest) {
    this.logger.log('On request', request.session.messages);
    request.session.messages = request.session.messages
      ? request.session.messages + 1
      : 1;
    this.logger.log('Updated', request.session.messages);
  }
}
