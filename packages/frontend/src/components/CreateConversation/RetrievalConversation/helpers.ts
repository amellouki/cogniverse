import {InputType} from "./form.schema";
import NewConversation from "@my-monorepo/shared/dist/types/new-conversation";

export function getNewConversation(data: InputType): NewConversation {
  if (data.documentId === null) throw new Error("Document is required");

  return {
    title: data.title,
    agentId: 0,
    documentId: data.documentId,
  }
}
