import React, {createContext, useRef} from "react";
import QueryForm from "@/components/QueryForm";
import ChatThread from "@/components/ChatThread";
import useChatHistory from "@/hooks/use-chat-history.hook";
import useConversation from "@/hooks/use-conversation.hook";
import {useRouter} from "next/router";
import useConversations from "@/hooks/use-conversations.hook";
import SelectBot, {SelectionRef} from "@/components/SelectBot";
import ConversationElements from "@/components/ConversationElements";
import {NextPageWithLayout} from "@/pages/_app";
import styles from "./styles.module.scss";
import {getLayout} from "@/components/Layouts/DefaultLayout/ConversationsNestedLayout";
import {noop} from "lodash";

export const SendMessageContext = createContext<Function>(noop);

const Conversation: NextPageWithLayout = () => {
  const router = useRouter()
  const conversationId = parseInt(router.query.conversationId as string)
  const [newlyCreatedConversationId, setNewlyCreatedConversationId] = React.useState<number>()

  const {data, isLoading} = useConversations(conversationId || newlyCreatedConversationId)
  const {history, appendOptimistic, appendSuccess} = useChatHistory(data?.chatHistory);
  const {response, sendQuestion, resources} = useConversation(
    (question) => {
      appendSuccess(question)
    },
    (response) => {
      appendSuccess(response)
    },
    (id) => setNewlyCreatedConversationId(id)
  );

  const botSelectionRef = useRef<SelectionRef>()

  if (isLoading) {
    return <center>Loading...</center>
  }

  return (
    <SendMessageContext.Provider value={(message: string) => sendQuestion(message, conversationId || newlyCreatedConversationId)}>
      <div className={styles.Conversation}>
        {(!isLoading && !data) && <SelectBot botSelectionRef={botSelectionRef}/>}
        {data && <ConversationElements conversationElements={data}/>}
        <ChatThread chatHistory={history} response={response} avatar={data?.bot.configuration.avatar}/>
        <QueryForm className={styles.queryForm} onSubmit={(question: string) => {
          const id = data?.id || newlyCreatedConversationId
          appendOptimistic({
            content: question,
            type: 'question',
            fromId: 0,
            fromType: 'human',
          });
          sendQuestion(
            question,
            conversationId || newlyCreatedConversationId,
            newlyCreatedConversationId
              ? undefined
              : getNewConversation()
          );
        }}/>
      </div>
    </SendMessageContext.Provider>
  );

  function getNewConversation() {
    const current = botSelectionRef.current
    return current
      ?
      {
        botId: current.bot.id,
        documentId: current.document?.id,
      }
      : undefined
  }
};

Conversation.getLayout = getLayout

export default Conversation;
