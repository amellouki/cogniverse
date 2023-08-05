import { Logger } from '@nestjs/common';
import { ConversationalRetrievalQaService } from './conversational-retrieval-qa.service';
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
import NewMessage from '@my-monorepo/shared/dist/types/new-message';
import { END_COMPLETION } from '../../constants';

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
    const { question, conversationId, newConversation } = request;
    let conversation;
    console.log('request', request);
    if (!conversationId && newConversation) {
      conversation = await this.conversationService.createRCConversation({
        ...newConversation,
        title: `hello there! ${Date.now()}`,
      });
      client.emit('data', getData('conversationDetails', conversation));
    } else if (!conversationId) {
      client.emit('error', 'No conversation id provided');
      client.disconnect();
      throw new Error('No conversation id provided');
    } else {
      conversation = await this.conversationService.getRcConversationById(
        conversationId,
      );
    }
    const sendToken = async (tokenMessage: NewMessage) => {
      client.emit('data', getData('token', tokenMessage));
    };

    console.log('sendToken');
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
