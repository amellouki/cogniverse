import NewTitelessConversation from '@my-monorepo/shared/dist/new-titeless-conversation';

export class DocConversationRequestDto {
  conversationId?: number;
  question: string;
  newConversation?: NewTitelessConversation;
}
