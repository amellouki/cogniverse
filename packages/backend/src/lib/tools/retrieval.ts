import { ChainTool, Tool, ToolParams } from 'langchain/tools';
import { Pinecone } from '@pinecone-database/pinecone';
import { QUERY_EMBEDDING_MODEL } from 'src/constants';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import * as dotenv from 'dotenv';

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

interface RetrievalToolParams extends ToolParams {
  vectorStoreNamespace: string;
}

export class RetrievalTool extends Tool {
  private readonly vectorStoreNamespace: string;

  toJSON() {
    return this.toJSONNotImplemented();
  }

  constructor(toolParams?: RetrievalToolParams) {
    super(toolParams);
    this.vectorStoreNamespace = toolParams.vectorStoreNamespace;
  }

  get lc_namespace() {
    return [...super.lc_namespace, 'retrieval'];
  }

  static lc_name() {
    return 'Retrieval';
  }

  protected async _call(input: string): Promise<string> {
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: this.vectorStoreNamespace,
    });

    const docs = await vectorStore.asRetriever(3).getRelevantDocuments(input);
    const output = docs.map((doc) => doc.pageContent).join('\n\n\n');
    return output;
  }
  name = 'Retrieval';
  description =
    'Useful when you want to retrieve user documents to respond to a user query, input should be a standalone semantic query';
}
