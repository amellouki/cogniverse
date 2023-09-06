import { NewTitelessConversation } from '@my-monorepo/shared';
import { AuthPayload } from '../types/auth-payload';
import { SecureRequest } from '../types/secure-request';

export class DocConversationRequestDto extends SecureRequest {
  authPayload: AuthPayload;
  conversationId?: number;
  question: string;
  newConversation?: NewTitelessConversation;
}
