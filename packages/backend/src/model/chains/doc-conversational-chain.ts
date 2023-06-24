import {
  ConversationalRetrievalQAChain,
  ConversationalRetrievalQAChainInput,
  LLMChain,
  loadQAChain,
  QAChainParams,
} from 'langchain/chains';
import { BaseRetriever, ChainValues } from 'langchain/schema';
import { CallbackManagerForChainRun } from 'langchain/callbacks';
import { Document } from 'langchain/docstore';
import { BaseLanguageModel } from 'langchain/base_language';
import { PromptTemplate } from 'langchain';

const initialization =
  'You are a query ai. Your output will be used to query a vector database that about a certain book so we can retrieve the correct segment to answer the human question.';

const question_generator_template =
  initialization +
  ' ' +
  `Given the following Chat History and a follow up human input, attempt to rephrase the follow up input to be a standalone question to query the database.

Chat History:
{chat_history}

Follow Up Human Input: {question}
Standalone question, if it doesn't make sense to query the book in the database for such human input then respond with nothing:`;

const qaTemplate = `Given the following conversation, use the following pieces of context to best respond to the follow up human input. If you don't know an answer to a question, just say that you don't know, don't try to make up an answer.
Chat History:
{chat_history}

Context:
{context}

Additional Human Input: {question}
Helpful Answer:
`;

export default class DocConversationalChain extends ConversationalRetrievalQAChain {
  async _call(
    values: ChainValues,
    runManager?: CallbackManagerForChainRun,
  ): Promise<ChainValues> {
    if (!(this.inputKey in values)) {
      throw new Error(`Question key ${this.inputKey} not found.`);
    }
    if (!(this.chatHistoryKey in values)) {
      throw new Error(`Chat history key ${this.chatHistoryKey} not found.`);
    }
    const question: string = values[this.inputKey];
    const chatHistory: string =
      ConversationalRetrievalQAChain.getChatHistoryString(
        values[this.chatHistoryKey],
      );
    let newQuestion = question;
    if (chatHistory.length > 0) {
      const result = await this.questionGeneratorChain.call(
        {
          question,
          chat_history: chatHistory,
        },
        runManager?.getChild(),
      );
      const keys = Object.keys(result);
      if (keys.length === 1) {
        newQuestion = result[keys[0]];
      } else {
        throw new Error(
          'Return from llm chain has multiple values, only single values supported.',
        );
      }
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
        template: conversationTemplate || qaTemplate,
        inputVariables: ['chat_history', 'context', 'question'],
      }),
      type: 'stuff',
    };

    const qaChain = loadQAChain(llm, qaChainOptions);

    const questionGeneratorChainPrompt = PromptTemplate.fromTemplate(
      questionGeneratorChainOptions?.template || question_generator_template,
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
