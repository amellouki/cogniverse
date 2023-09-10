import {z} from "zod";

const schema = z.object({
  name: z.string().nonempty(),
  prompt: z.string().optional(),
  isCustomPrompt: z.boolean(),
  color: z.string().nonempty({ message: "Pick a color" }),
  isPublic: z.boolean().default(false),
  integrateWithDiscord: z.boolean(),
  discordChannelId: z.string().optional(),
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
}).refine(({integrateWithDiscord, discordChannelId}) => {
  if (!integrateWithDiscord) return true;
  return !!discordChannelId;
}, {
  message: "Discord channel is required",
  path: ["discordChannelId"],
});

export type InputType = z.infer<typeof schema>

export default schema;
