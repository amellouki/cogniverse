import {Message} from "@/types/ChatThread";

export type ChatHistory = Message[];

type ChatRequest = {
  conversationId: number;
  question: string;
}

export default ChatRequest;
