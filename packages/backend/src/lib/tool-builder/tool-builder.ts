import { CallbackManager } from 'langchain/callbacks';
import { ToolType } from 'src/lib/tool-record';
import { SerpAPI, WolframAlphaTool } from 'langchain/tools';
import { InternalServerException } from '@my-monorepo/shared';

type ToolBuilderInput = {
  toolType: ToolType | string;
  callbackManager: CallbackManager;
};

export class ToolBuilder {
  build({ toolType, callbackManager }: ToolBuilderInput) {
    console.log('toolType', toolType);
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
      default:
        throw new InternalServerException('Tool not supported');
    }
  }
}
