import {z} from "zod";

const schema = z.object({
  llm: z.string().nonempty(),
  apiKey: z.string().optional(),
  prompt: z.string().optional(),
  isCustomPrompt: z.boolean(),
}).refine((data) => {
  return !(data.isCustomPrompt && !data.prompt);
}, {
  message: "Since you checked custom prompt, custom prompt is required",
  path: ["prompt"],
});

export type InputType = z.infer<typeof schema>

export default schema;
