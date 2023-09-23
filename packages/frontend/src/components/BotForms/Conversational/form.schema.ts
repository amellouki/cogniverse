import {z} from "zod";

const schema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  prompt: z.string().optional(),
  isCustomPrompt: z.boolean(),
  color: z.string().nonempty({ message: "Pick a color" }),
  isPublic: z.boolean().default(false),
  integrateWithDiscord: z.boolean(),
  discordChannelIds: z.array(z.string()).optional(),
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
}).refine(({integrateWithDiscord, discordChannelIds}) => {
  return !(integrateWithDiscord && !discordChannelIds?.length);
}, {
  message: "At least one discord channel id is required",
  path: ["discordChannelIds"],
});

export type InputType = z.infer<typeof schema>

export default schema;
