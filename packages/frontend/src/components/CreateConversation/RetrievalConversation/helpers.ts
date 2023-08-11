import {InputType} from "./form.schema";
import {NewConversation} from "@my-monorepo/shared";

export function getNewConversation(data: InputType): NewConversation {
  if (data.documentId === null) throw new Error("Document is required");

  return {
    title: data.title,
    botId: 0,
    documentId: data.documentId,
  }
}
