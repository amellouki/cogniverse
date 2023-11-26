import {z} from "zod";

const schema = z.object({
  integrateWithDiscord: z.boolean(),
  discordChannelIds: z.array(z.string()).optional(),
  integrateWithSlack: z.boolean(),
  slackChannelIds: z.array(z.string()).optional(),
}).refine(({integrateWithDiscord, discordChannelIds}) => {
  return !(integrateWithDiscord && !discordChannelIds?.length);
}, {
  message: "At least one discord channel id is required",
  path: ["discordChannelIds"],
}).refine(({integrateWithSlack, slackChannelIds}) => {
  return !(integrateWithSlack && !slackChannelIds?.length);
}, {
  message: "At least one slack channel id is required",
  path: ["slackChannelIds"],
});

export type InputType = z.infer<typeof schema>

export default schema;
