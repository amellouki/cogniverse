import { DynamicStructuredTool } from 'langchain/tools';
import z from 'zod';
import { CallbackManager } from 'langchain/callbacks';

const schema = z.object({
  options: z.array(
    z.object({
      text: z.string(),
      value: z.string(),
    }),
  ),
});

type SendFunction = (input: z.infer<typeof schema>) => Promise<boolean>;

export class OptionsTool {
  static create(send: SendFunction, callbacks?: CallbackManager) {
    return new DynamicStructuredTool({
      name: 'button_options',
      description:
        'Useful when you want to display options to the user in a button format, you will acknowledgement if the options were sent successfully',
      schema,
      func: async (input) => {
        const ack = await send(input);
        if (ack) {
          return JSON.stringify({
            status: 'success',
            message: 'options sent',
          });
        } else {
          return JSON.stringify({
            status: 'error',
            message: 'options not sent',
          });
        }
      },
      callbacks,
    });
  }
}
