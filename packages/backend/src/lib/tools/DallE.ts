import OpenAI from 'openai';
import { ToolParams, Tool } from 'langchain/tools';

interface DallEToolParams extends ToolParams {
  openai_api_key?: string;
}

export class DallETool extends Tool {
  private openai: OpenAI;

  toJSON() {
    return this.toJSONNotImplemented();
  }

  constructor(toolParams?: DallEToolParams) {
    super(toolParams);
    this.openai = new OpenAI({
      apiKey: toolParams.openai_api_key ?? process.env.OPEN_AI_API_KEY,
    });
  }

  get lc_namespace() {
    return [...super.lc_namespace, 'dall-e'];
  }

  static lc_name() {
    return 'Dall-e';
  }

  name = 'image_generation';
  description =
    "DALL-E OpenAI's image generation model. useful when you want to generate an image from a text description or prompt. input should be a search query";

  protected async _call(input: string) {
    try {
      const img = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: input,
        quality: 'standard',
        response_format: 'url',
        size: '1792x1024',
      });

      console.log(JSON.stringify(img, null, 2));

      return JSON.stringify({
        status: 'success',
        images: img,
      });
    } catch (error) {
      return JSON.stringify({
        error: 'error occurred while generating the image',
      });
    }
  }
}
