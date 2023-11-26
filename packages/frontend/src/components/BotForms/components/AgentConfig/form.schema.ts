import {z} from "zod";

const schema = z.object({
  llm: z.string().nonempty(),
  apiKey: z.string().optional(),
})

export type InputType = z.infer<typeof schema>

export default schema;
