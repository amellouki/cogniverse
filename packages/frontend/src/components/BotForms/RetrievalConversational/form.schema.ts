import {z} from "zod";
import {
  CLM_PROMPT_PLACEHOLDERS,
  RLM_PROMPT_PLACEHOLDERS
} from "./contants";

const schema = z.object({
  name: z.string().nonempty().regex(/^[a-zA-Z0-9_-]+$/i, {message: "Name must be alphanumeric, underscores and dashes are allowed"}),
  description: z.string().optional(),
  // RLM: Retrieval Language Model
  isRLMCustomPrompt: z.boolean(),
  rlmPrompt: z.string().optional(),
  // CLM: Conversational Language Model
  isCLMCustomPrompt: z.boolean(),
  clmPrompt: z.string().optional(),
  color: z.string().nonempty({ message: "Pick a color" }),
  isBoundToDocument: z.boolean().default(false),
  boundDocumentId: z.number().optional(),
  isPublic: z.boolean().default(false),
  integrateWithDiscord: z.boolean(),
  discordChannelId: z.string().optional(),
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
}).refine(({isBoundToDocument, boundDocumentId}) => {
  if (!isBoundToDocument) return true;
  return !!boundDocumentId;
}, {
  message: "Document is required",
  path: ["boundDocumentId"],
}).refine(({integrateWithDiscord, discordChannelId}) => {
  return !(integrateWithDiscord && !discordChannelId);
}, {
  message: "Discord channel is required",
  path: ["discordChannelId"],
});

export type InputType = z.infer<typeof schema>

export default schema;
