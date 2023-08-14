import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {BotType, Conversation} from "@my-monorepo/shared";
import {CallbackManager, CallbackManagerForChainRun} from "langchain/callbacks";
import createLlm from "../../llm/create-llm";
import {ENV} from "../../../constants";
import {BufferMemory} from "langchain/memory";
import {RetrievalConversationalChainService} from "../retrieval-conversational/retrieval-conversational-chain.service";
import ConversationalChain from "../../../models/chains/conversational.chain";

@Injectable()
export class ConversationalChainService {
  constructor(
    private configService: ConfigService,
  ) {}

  createChain(
    question: string,
    conversation: Conversation,
    callbackManager: CallbackManager,
  ) {
    const botConfig = conversation.bot.configuration;
    if (botConfig.type !== BotType.CONVERSATIONAL) {
      throw Error('Bot is not a conversational');
    }

    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    if (!openAiApiKey) {
      throw new Error(
        'Some environment variables are not set. Please check your .env.local file.',
      );
    }

    const llm = createLlm({
      type: 'gpt-3.5-turbo',
      apiKey: openAiApiKey,
      callbackManager,
    });

    return ConversationalChain.instantiate({
      template: botConfig.lm.prompt,
      llm,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        inputKey: 'question', // The key for the input to the chain
        outputKey: 'text', // The key for the final conversational output of the chain
        returnMessages: true, // If using with a chat model
        chatHistory: RetrievalConversationalChainService.constructHistory(conversation.chatHistory),
      })
    })
  }
}
