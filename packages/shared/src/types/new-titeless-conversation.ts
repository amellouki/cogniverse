import NewConversation from "./new-conversation";

type NewTitelessConversation = Omit<NewConversation, 'title'>

export default NewTitelessConversation;
