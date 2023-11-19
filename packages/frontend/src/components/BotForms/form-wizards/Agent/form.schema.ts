import botInfoSchema from "@/components/BotForms/BotInfo/form.schema"
import botConfigSchema from "@/components/BotForms/AgentConfig/form.schema";
import { z } from "zod";


const schema = z.object({
  botInfo: botInfoSchema,
  botConfig: botConfigSchema,
})

export type InputType = z.infer<typeof schema>

export default schema;
