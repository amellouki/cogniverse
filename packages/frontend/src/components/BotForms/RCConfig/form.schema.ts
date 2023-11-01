import {z} from "zod";
import {
  CLM_PROMPT_PLACEHOLDERS,
  RLM_PROMPT_PLACEHOLDERS
} from "./contants";

const schema = z.object({
  // RLM: Retrieval Language Model
  isRLMCustomPrompt: z.boolean(),
  rlmPrompt: z.string().optional(),
  rLlm: z.string().nonempty(),
  rApiKey: z.string().optional(),
  // CLM: Conversational Language Model
  isCLMCustomPrompt: z.boolean(),
  clmPrompt: z.string().optional(),
  cLlm: z.string().nonempty(),
  cApiKey: z.string().optional(),
}).refine((data) => {
  return !(data.isRLMCustomPrompt && !data.rlmPrompt);
}, {
  message: "Retrieval Language Model prompt is required",
  path: ["rlmPrompt"],
}).refine((data) => {
  return !(data.isCLMCustomPrompt && !data.clmPrompt);
}, {
  message: "Conversational Language Model prompt is required",
  path: ["clmPrompt"],
}).refine(({rlmPrompt, isRLMCustomPrompt}) => {
  if (!isRLMCustomPrompt) return true;
  const missingPlaceholders = RLM_PROMPT_PLACEHOLDERS
    .filter((placeholder) => !rlmPrompt?.includes(placeholder));
  return missingPlaceholders.length === 0;
}, {
  message: "Retrieval Language Model prompt is missing required placeholders",
  path: ["rlmPrompt"],
}).refine(({clmPrompt, isCLMCustomPrompt}) => {
  if (!isCLMCustomPrompt) return true;
  const missingPlaceholders = CLM_PROMPT_PLACEHOLDERS
    .filter((placeholder) => !clmPrompt?.includes(placeholder));
  return missingPlaceholders.length === 0;
}, {
  message: "Conversational Language Model prompt is missing required placeholders",
  path: ["clmPrompt"],
});

export type InputType = z.infer<typeof schema>

export default schema;
