import {z} from "zod";
import {VALID_BOT_NAME_REGEX} from "@my-monorepo/shared";

const schema = z.object({
  name: z.string().nonempty().regex(VALID_BOT_NAME_REGEX, {message: "Name must be alphanumeric, underscores and dashes are allowed"}),
  description: z.string().optional(),
  color: z.string().nonempty({ message: "Pick a color" }),
  isPublic: z.boolean().default(false),
});

export type InputType = z.infer<typeof schema>

export default schema;
