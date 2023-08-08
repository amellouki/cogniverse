import { NewTitelessConversation } from '@my-monorepo/shared';

export class DocConversationRequestDto {
  conversationId?: number;
  question: string;
  newConversation?: NewTitelessConversation;
}
