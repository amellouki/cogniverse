import botInfoSchema from "../components/BotInfo/form.schema"
import botConfigSchema from "../components/AgentConfig/form.schema";
import { z } from "zod";


const schema = z.object({
  botInfo: botInfoSchema,
  botConfig: botConfigSchema,
})

export type InputType = z.infer<typeof schema>

export default schema;
