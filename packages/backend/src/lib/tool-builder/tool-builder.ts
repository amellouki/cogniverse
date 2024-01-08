import { CallbackManager } from 'langchain/callbacks';
import { ToolType } from 'src/lib/tool-record';
import { SerpAPI, WolframAlphaTool } from 'langchain/tools';
import { AccountKeys, InternalServerException } from '@my-monorepo/shared';
import { DallETool } from 'src/lib/tools/DallE';
import { OptionsTool } from 'src/lib/tools/ButtonOptions';
import { RetrievalTool } from 'src/lib/tools/retrieval';

type ToolBuilderInput = {
  toolType: ToolType | string;
  callbackManager: CallbackManager;
  realWorldEffect?: (input: any) => any;
  keys?: AccountKeys;
};

export class ToolBuilder {
  build({
    toolType,
    callbackManager,
    realWorldEffect,
    keys,
  }: ToolBuilderInput) {
    switch (toolType) {
      case 'SerpAPI':
        const serpTool = new SerpAPI(process.env.SERP_API_KEY);
        serpTool.callbacks = callbackManager;
        return serpTool;
      case 'WolframAlpha':
        return new WolframAlphaTool({
          appid: process.env.WALPHA_APP_ID,
          callbacks: callbackManager,
        });
      case 'Dall-e':
        return new DallETool({
          callbacks: callbackManager,
          send: realWorldEffect,
          openai_api_key: keys?.openAiApiKey,
        });
      case 'Retrieval':
        return new RetrievalTool({
          callbacks: callbackManager,
          vectorStoreNamespace: keys.id,
        });
      case 'Options':
        return OptionsTool.create(realWorldEffect, callbackManager);
      default:
        throw new InternalServerException('Tool not supported');
    }
  }
}
