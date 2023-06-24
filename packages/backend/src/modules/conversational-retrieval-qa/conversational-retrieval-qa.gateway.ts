import { Logger } from '@nestjs/common';
import { ConversationalRetrievalQaService } from './conversational-retrieval-qa.service';
import { END_COMPLETION } from '../../constants';
import { DocConversationRequestDto } from '../../dto/doc-conversation-request.dto';
import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import * as dotenv from 'dotenv';
import { ConversationService } from '../../repositories/conversation/conversation.service';
import { Message } from '@prisma/client';

dotenv.config({ path: './.env.local' });

function getData(type: string, content: unknown) {
  return {
    type,
    content,
  };
}

@WebSocketGateway({
  namespace: 'conversational-retrieval-qa',
  cors: {
    origin: process.env.ALLOWED_DOMAINS?.split(','),
    methods: 'GET,HEAD',
  },
})
export class ConversationalRetrievalQaGateway {
  private readonly logger = new Logger(ConversationalRetrievalQaGateway.name);

  constructor(
    private service: ConversationalRetrievalQaService,
    private conversationService: ConversationService,
  ) {}

  @SubscribeMessage('getCompletion')
  async getCompletion(
    @MessageBody() request: DocConversationRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { question, conversationId } = request;

    this.logger.log(request);

    const conversation = await this.conversationService.getConversationById(
      conversationId,
    );

    this.logger.log(conversation);
    const sendToken = async (tokenMessage: Omit<Message, 'id'>) => {
      client.emit('data', getData('token', tokenMessage));
    };
    const sendRetrieval = async (retrievedStandaloneQuestion: Message) => {
      client.emit('data', {
        type: 'retrieval',
        content: retrievedStandaloneQuestion,
      });
    };
    const sendConfirmQuestion = (question: Message) => {
      client.emit('data', {
        type: 'question',
        content: question,
      });
    };
    this.service
      .getCompletion(question || '', conversation, {
        sendToken,
        sendRetrieval,
        sendConfirmQuestion,
      })
      .then((response) => {
        client.emit('data', getData('response', response));
        client.emit('event', { state: END_COMPLETION });
        client.disconnect();
      })
      .catch((error) => {
        this.logger.error('Completion error', error);
        client.emit('error', JSON.stringify(error));
      });
  }
}
