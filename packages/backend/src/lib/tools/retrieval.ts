import { ChainTool, Tool } from 'langchain/tools';
import { Pinecone } from '@pinecone-database/pinecone';
import { QUERY_EMBEDDING_MODEL } from 'src/constants';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { VectorDBQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import * as dotenv from 'dotenv';
import { CallbackManager } from 'langchain/callbacks';
import { Document } from 'langchain/document';

dotenv.config({ path: './.env.local' });

const model = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const index = client.Index(process.env.PINECONE_INDEX);
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
  modelName: QUERY_EMBEDDING_MODEL,
});

export async function createRetrievalTool(
  callbacks?: CallbackManager,
  namespace?: string,
) {
  const vectoreStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace,
  });
  const chain = VectorDBQAChain.fromLLM(model, vectoreStore, {
    k: 3,
    callbacks: CallbackManager.fromHandlers({
      handleRetrieverEnd(documents: Document[]): any {
        console.log('handleRetrieverEnd', documents);
      },
    }),
  });
  const tool = new ChainTool({
    name: 'Retrieval',
    description:
      'Useful when you want to retrieve user documents to respond to a user query, input should be a standalone semantic query',
    chain,
    callbacks,
    // callbacks: CallbackManager.fromHandlers({
    //   handleToolStart(
    //     tool: any,
    //     input: string,
    //     runId: string,
    //     parentRunId?: string,
    //     tags?: string[],
    //     metadata?: Record<string, unknown>,
    //     name?: string,
    //   ): any {
    //     console.log('handleToolStart:rertieval', input);
    //   },
    //
    //   handleToolEnd(
    //     output: string,
    //     runId: string,
    //     parentRunId?: string,
    //     tags?: string[],
    //   ): any {
    //     console.log('handleToolEnd:retrieval', output);
    //   },
    // }),
  });
  return tool;
}
