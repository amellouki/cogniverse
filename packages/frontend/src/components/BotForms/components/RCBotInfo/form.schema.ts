import {z} from "zod";
import {VALID_BOT_NAME_REGEX} from "@my-monorepo/shared";

const schema = z.object({
  name: z.string().nonempty().regex(VALID_BOT_NAME_REGEX, {message: "Name must be alphanumeric, underscores and dashes are allowed"}),
  description: z.string().optional(),
  color: z.string().nonempty({ message: "Pick a color" }),
  isPublic: z.boolean().default(false),
  isBoundToDocument: z.boolean().default(false),
  boundDocumentId: z.number().optional(),
}).refine(({isBoundToDocument, boundDocumentId}) => {
  if (!isBoundToDocument) return true;
  return !!boundDocumentId;
}, {
  message: "Document is required",
  path: ["boundDocumentId"],
});

export type InputType = z.infer<typeof schema>

export default schema;
