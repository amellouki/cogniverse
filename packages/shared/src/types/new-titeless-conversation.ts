import {NewConversation} from "./new-conversation";

export type NewTitelessConversation = Omit<NewConversation, 'title'>
