import {
  ConversationalRetrievalQAChain,
  ConversationalRetrievalQAChainInput,
  LLMChain,
  loadQAChain,
  QAChainParams,
} from 'langchain/chains';
import { ChainValues } from 'langchain/schema';
import { BaseRetriever } from 'langchain/schema/retriever';
import { CallbackManagerForChainRun } from 'langchain/callbacks';
import { Document } from 'langchain/document';
import { BaseLanguageModel } from 'langchain/base_language';
import { ChatMessage } from '../chat-message';
import { PromptTemplate } from 'langchain/prompts';
import {
  ChainException,
  RC_QA_TEMPLATE,
  RC_QUESTION_GENERATION_TEMPLATE,
} from '@my-monorepo/shared';

export default class DocConversationalChain extends ConversationalRetrievalQAChain {
  async _call(
    values: ChainValues,
    runManager?: CallbackManagerForChainRun,
  ): Promise<ChainValues> {
    if (!(this.inputKey in values)) {
      throw new ChainException(`Question key ${this.inputKey} not found.`);
    }
    if (!(this.chatHistoryKey in values)) {
      throw new ChainException(
        `Chat history key ${this.chatHistoryKey} not found.`,
      );
    }
    const question: string = values[this.inputKey];
    const chatHistory: string = ChatMessage.getChatHistoryString(
      values[this.chatHistoryKey],
    );
    let newQuestion = question;

    const result1 = await this.questionGeneratorChain.call(
      {
        question,
        chat_history: chatHistory || '[no chat history]',
      },
      runManager?.getChild(),
    );
    const keys = Object.keys(result1);
    if (keys.length === 1) {
      newQuestion = result1[keys[0]];
    } else {
      throw new ChainException(
        'Return from llm chain has multiple values, only single values supported.',
      );
    }

    let docs: Document[] = [];
    if (newQuestion.length > 0 && newQuestion !== '[no-question]') {
      docs = await this.retriever.getRelevantDocuments(newQuestion);
    }
    const inputs = {
      question,
      input_documents: docs,
      chat_history: chatHistory,
    };
    const result = await this.combineDocumentsChain.call(
      inputs,
      runManager?.getChild(),
    );
    if (this.returnSourceDocuments) {
      return {
        ...result,
        sourceDocuments: docs,
      };
    }
    return result;
  }

  static fromLLM(
    llm: BaseLanguageModel,
    retriever: BaseRetriever,
    options: {
      outputKey?: string; // not used
      returnSourceDocuments?: boolean;
      conversationTemplate?: string;
      questionGeneratorChainOptions?: {
        llm?: BaseLanguageModel;
        template?: string;
      };
    } & Omit<
      ConversationalRetrievalQAChainInput,
      'retriever' | 'combineDocumentsChain' | 'questionGeneratorChain'
    > = {},
  ): ConversationalRetrievalQAChain {
    const {
      questionGeneratorChainOptions,
      conversationTemplate,
      verbose,
      ...rest
    } = options;

    const qaChainOptions: QAChainParams = {
      prompt: new PromptTemplate({
        template: conversationTemplate || RC_QA_TEMPLATE,
        inputVariables: ['chat_history', 'context', 'question'],
      }),
      type: 'stuff',
    };

    const qaChain = loadQAChain(llm, qaChainOptions);

    const questionGeneratorChainPrompt = PromptTemplate.fromTemplate(
      questionGeneratorChainOptions?.template ||
        RC_QUESTION_GENERATION_TEMPLATE,
    );
    const questionGeneratorChain = new LLMChain({
      prompt: questionGeneratorChainPrompt,
      llm: questionGeneratorChainOptions?.llm ?? llm,
      verbose,
    });
    return new this({
      retriever,
      combineDocumentsChain: qaChain,
      questionGeneratorChain,
      verbose,
      ...rest,
    });
  }
}
