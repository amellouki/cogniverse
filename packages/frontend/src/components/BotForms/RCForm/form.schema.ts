import botInfoSchema from "../components/RCBotInfo/form.schema"
import botConfigSchema from "../components/RCConfig/form.schema";
import integrationSchema from "../components/Integration/form.schema";
import { z } from "zod";

const schema = z.object({
  botInfo: botInfoSchema,
  botConfig: botConfigSchema,
  integration: integrationSchema,
})

export type InputType = z.infer<typeof schema>

export default schema;
