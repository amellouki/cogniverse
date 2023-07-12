import { IsNotEmpty } from "class-validator";
import NewConversation from "@my-monorepo/shared/dist/new-conversation";

export default class CreateConversationRequestDto implements NewConversation {
  @IsNotEmpty()
  title: string;

  conversationModel: CreateLanguageModelDto | null;
  retrievalLanguageModel: CreateLanguageModelDto | null;

  @IsNotEmpty()
  documentId: number;
}

class CreateLanguageModelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  prompt: string;
}
