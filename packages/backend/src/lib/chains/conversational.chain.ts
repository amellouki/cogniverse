import { LLMChain, LLMChainInput } from 'langchain/chains';
import { ChainValues } from 'langchain/schema';
import { CallbackManagerForChainRun } from 'langchain/callbacks';
import { ChatMessage } from '../chat-message';
import { PromptTemplate } from 'langchain/prompts';
import { ChainException, CONVERSATIONAL_PROMPT } from '@my-monorepo/shared';

const INSTRUCTIONS = `use the chat history and answer the following question.
chat history:{chat_history}
question: {question}
answer:`;

class ConversationalChain extends LLMChain {
  inputKey = 'question';
  chatHistoryKey = 'chat_history';

  _call(
    values: ChainValues,
    runManager?: CallbackManagerForChainRun,
  ): Promise<ChainValues> {
    if (!(this.inputKey in values)) {
      throw new ChainException(`Input key ${this.inputKey} not in values`);
    }
    if (!(this.chatHistoryKey in values)) {
      throw new ChainException(
        `Chat history key ${this.chatHistoryKey} not in values`,
      );
    }

    const question: string = values[this.inputKey];
    const chatHistory: string = ChatMessage.getChatHistoryString(
      values[this.chatHistoryKey],
    );
    return super._call(
      {
        question,
        chat_history: chatHistory || '[no chat history]',
      },
      runManager,
    );
  }

  static instantiate(
    input: Omit<LLMChainInput, 'prompt'> & { template: string },
  ) {
    const { template, ...rest } = input;
    const chain = new ConversationalChain({
      ...rest,
      prompt: PromptTemplate.fromTemplate(
        (template ?? CONVERSATIONAL_PROMPT) + INSTRUCTIONS,
      ),
    });
    return chain;
  }
}

export default ConversationalChain;
