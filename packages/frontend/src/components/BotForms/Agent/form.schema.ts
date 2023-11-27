import botInfoSchema from "../components/BotInfo/form.schema"
import botConfigSchema from "../components/ConversationalConfig/form.schema";
import integrationSchema from "../components/Integration/form.schema";
import { z } from "zod";


const schema = z.object({
  botInfo: botInfoSchema,
  botConfig: botConfigSchema,
  integration: integrationSchema,
})

export type InputType = z.infer<typeof schema>

export default schema;
