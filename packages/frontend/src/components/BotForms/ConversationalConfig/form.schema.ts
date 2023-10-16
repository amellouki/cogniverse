import {z} from "zod";
import {VALID_BOT_NAME_REGEX} from "@my-monorepo/shared";

const schema = z.object({
  llm: z.string().nonempty(),
  apiKey: z.string().nonempty(),
  prompt: z.string().optional(),
  isCustomPrompt: z.boolean(),
}).refine((data) => {
  return !(data.isCustomPrompt && !data.prompt);
}, {
  message: "Retrieval Language Model prompt is required",
  path: ["rlmPrompt"],
}).refine(({prompt, isCustomPrompt}) => {
  if (!isCustomPrompt) return true;
  return !!prompt
}, {
  message: "Should provide a comprehensive prompt",
  path: ["rlmPrompt"],
});

export type InputType = z.infer<typeof schema>

export default schema;
