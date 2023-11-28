import OpenAI from 'openai';
import { ToolParams, Tool } from 'langchain/tools';

export class DallETool extends Tool {
  private openai: OpenAI;

  toJSON() {
    return this.toJSONNotImplemented();
  }

  constructor(toolParams?: ToolParams) {
    super(toolParams);
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
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
        success:
          'image is successfully generated and now displayed in the chat',
      });
    } catch (error) {
      return JSON.stringify({
        error: 'error occurred while generating the image',
      });
    }
  }
}
