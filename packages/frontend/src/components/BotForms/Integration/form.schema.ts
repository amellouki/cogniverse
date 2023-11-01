import {z} from "zod";
import {VALID_BOT_NAME_REGEX} from "@my-monorepo/shared";

const schema = z.object({
  integrateWithDiscord: z.boolean(),
  discordChannelIds: z.array(z.string()).optional(),
}).refine(({integrateWithDiscord, discordChannelIds}) => {
  return !(integrateWithDiscord && !discordChannelIds?.length);
}, {
  message: "At least one discord channel id is required",
  path: ["discordChannelIds"],
});

export type InputType = z.infer<typeof schema>

export default schema;
