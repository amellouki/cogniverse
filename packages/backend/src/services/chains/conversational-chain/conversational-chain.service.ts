import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotType, Conversation } from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';
import createLlm from '../../llm/create-llm';
import { BufferMemory } from 'langchain/memory';
import ConversationalChain from '../../../models/chains/conversational.chain';
import { ChatHistoryBuilderService } from '../../chat-history-builder/chat-history-builder.service';
import { ConversationalChainBuilder } from '../../../models/chain-builder';

@Injectable()
export class ConversationalChainService extends ConversationalChainBuilder {
  constructor(
    private configService: ConfigService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super();
  }

  fromConversation(
    conversation: Conversation,
    callbackManager: CallbackManager,
  ) {
    const botConfig = conversation.bot.configuration;
    if (botConfig.type !== BotType.CONVERSATIONAL) {
      throw Error('Bot is not a conversational');
    }

    const openAiApiKey = conversation.creator.openAiApiKey;
    if (!openAiApiKey) {
      throw new Error(
        'Please set your OpenAI API key in your account settings.',
      );
    }

    const llm = createLlm({
      type: (botConfig.lm?.modelName as any) || 'gpt-3.5-turbo',
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
        chatHistory: this.chatHistoryBuilder.build(conversation.chatHistory),
      }),
    });
  }
}
