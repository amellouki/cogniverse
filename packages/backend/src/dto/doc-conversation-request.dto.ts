import NewTitelessConversation from '@my-monorepo/shared/dist/types/new-titeless-conversation';

export class DocConversationRequestDto {
  conversationId?: number;
  question: string;
  newConversation?: NewTitelessConversation;
}
