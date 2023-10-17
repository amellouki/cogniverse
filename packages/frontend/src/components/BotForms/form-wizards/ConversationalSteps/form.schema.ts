import botInfoSchema from "@/components/BotForms/BotInfo/form.schema"
import botConfigSchema from "@/components/BotForms/ConversationalConfig/form.schema";
import integrationSchema from "@/components/BotForms/Integration/form.schema";
import { z } from "zod";


const schema = z.object({
  botInfo: botInfoSchema,
  botConfig: botConfigSchema,
  integration: integrationSchema,
})

export type InputType = z.infer<typeof schema>

export default schema;
