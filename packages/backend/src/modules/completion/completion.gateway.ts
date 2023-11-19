import { RetrievalConversationalService } from './retrieval-conversational.service';
import { DocConversationRequestDto } from '../../dto/doc-conversation-request.dto';
import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import * as dotenv from 'dotenv';
import { ConversationService } from '../../repositories/conversation/conversation.service';
import { Message } from '@prisma/client';
import {
  NewMessage,
  BotType,
  Conversation,
  BotTypeNotSupportedException,
  AppException,
} from '@my-monorepo/shared';
import { ChatHistoryService } from '../../repositories/chat-history/chat-history.service';
import { catchError, filter, of } from 'rxjs';
import { END_COMPLETION } from '../../constants';
import { ConversationalService } from './conversational.service';
import { WsAuthGuard } from '../../guards/ws-auth/ws-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';

dotenv.config({ path: './.env.local' });

function getData(type: string, content: unknown) {
  return {
    type,
    content,
  };
}

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  namespace: 'generation',
  cors: {
    origin: process.env.ALLOWED_DOMAINS?.split(','),
    methods: 'GET,HEAD',
  },
})
export class GenerationGateway {
  constructor(
    private retrievalConversationalService: RetrievalConversationalService,
    private conversationalService: ConversationalService,
    private agentService: AgentService,
    private conversationService: ConversationService,
    private chatHistoryService: ChatHistoryService,
  ) {}

  private getService(botType: BotType) {
    switch (botType) {
      case BotType.RETRIEVAL_CONVERSATIONAL:
        return this.retrievalConversationalService;
      case BotType.CONVERSATIONAL:
        return this.conversationalService;
      case BotType.AGENT:
        throw this.agentService;
      default:
        throw new BotTypeNotSupportedException();
    }
  }

  private unauthorisedAccess(
    conversation: Conversation,
    creatorId: string,
  ): boolean {
    return (
      conversation.creatorId !== creatorId ||
      (!conversation.bot.public && conversation.bot.creatorId !== creatorId)
    );
  }

  @SubscribeMessage('getCompletion')
  async getCompletion(
    @MessageBody() request: DocConversationRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { authPayload, question, conversationId, newConversation } = request;
    let conversation: Conversation;

    if (!conversationId && newConversation) {
      conversation = (await this.conversationService.createConversation(
        authPayload.uid,
        {
          ...newConversation,
          title: `New Conversation ${Date.now()}`,
        },
      )) as Conversation; // TODO: fix this;
      client.emit('data', getData('conversationDetails', conversation));
    } else if (!conversationId) {
      client.emit('error', 'No conversation id provided');
      client.disconnect();
      throw new WsException('No conversation id provided');
    } else {
      conversation = await this.conversationService.getConversationById(
        conversationId,
      );
    }

    if (this.unauthorisedAccess(conversation, authPayload.uid)) {
      client.emit('error', 'Unauthorised access');
      client.disconnect();
      throw new WsException('Unauthorised access');
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

    const service = this.getService(conversation.bot.type);

    try {
      const events$ = service.getCompletion$(question || '', conversation);

      events$.pipe(filter((event) => event.type === 'error')).subscribe((e) => {
        if (e.type !== 'error' || !('payload' in e)) {
          return;
        }
        const error = e.payload as AppException;
        client.emit('error', { ...error, message: error.message });
        client.disconnect();
      });

      events$
        .pipe(filter((event) => event.type === 'response-token'))
        .subscribe(sendToken);

      events$
        .pipe(filter((event) => event.type === 'idea'))
        .subscribe((idea) => {
          if (idea.type !== 'idea') {
            return;
          }
          this.chatHistoryService
            .saveMessage(idea)
            .then((message) => {
              sendRetrieval(message);
            })
            .catch((e) => {
              throw e;
            });
        });

      events$
        .pipe(filter((event) => event.type === 'message'))
        .subscribe((response) => {
          if (response.type !== 'message') {
            return;
          }
          this.chatHistoryService.saveMessage(response).then(() => {
            client.emit('data', getData('response', response));
            client.emit('event', { state: END_COMPLETION });
            client.disconnect();
          });
        });
    } catch (e) {
      client.emit('error', e);
      client.disconnect();
    }
  }
}
