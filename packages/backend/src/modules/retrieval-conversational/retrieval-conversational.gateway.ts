import { Logger } from '@nestjs/common';
import { RetrievalConversationalService } from './retrieval-conversational.service';
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
import { NewMessage } from '@my-monorepo/shared';
import {ChatHistoryService} from "../../repositories/chat-history/chat-history.service";
import {catchError, filter, of, throwError} from "rxjs";
import {END_COMPLETION} from "../../constants";

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
export class RetrievalConversationalGateway {
  private readonly logger = new Logger(RetrievalConversationalGateway.name);

  constructor(
    private service: RetrievalConversationalService,
    private conversationService: ConversationService,
    private chatHistoryService: ChatHistoryService,
  ) {}

  @SubscribeMessage('getCompletion')
  async getCompletion(
    @MessageBody() request: DocConversationRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { question, conversationId, newConversation } = request;
    let conversation;

    if (!conversationId && newConversation) {
      conversation = await this.conversationService.createConversation({
        ...newConversation,
        title: `New Conversation ${Date.now()}`,
      });
      client.emit('data', getData('conversationDetails', conversation));
    } else if (!conversationId) {
      client.emit('error', 'No conversation id provided');
      client.disconnect();
      throw new Error('No conversation id provided');
    } else {
      conversation = await this.conversationService.getConversationById(
        conversationId,
      );
    }
    const sendToken = async (tokenMessage: NewMessage) => {
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

    const added = await this.chatHistoryService.saveMessage({
      content: question,
      conversationId: conversation.id,
      fromType: 'human',
      type: 'message',
      fromId: null,
    });
    sendConfirmQuestion(added);

    try {
      const events$ = this.service
        .getCompletion$(question || '', conversation)

      events$.pipe(filter((event) => event.type === 'response-token')).subscribe(sendToken);
      events$.pipe(filter((event) => event.type === 'idea')).subscribe((idea) => {
        this.chatHistoryService
          .saveMessage(idea)
          .then((message) => {
            sendRetrieval(message);
          })
          .catch((e) => {
            throw e;
          });
      });
      events$.pipe(filter((event) => event.type === 'message')).subscribe((response) => {
        this.chatHistoryService.saveMessage(response).then((message) => {
          client.emit('data', getData('response', response));
          client.emit('event', { state: END_COMPLETION });
          client.disconnect();
        })
      });
    } catch (e) {
      client.emit('error', e);
      client.disconnect();
    }
  }
}
