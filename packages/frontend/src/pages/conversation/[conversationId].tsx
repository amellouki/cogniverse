import React, {useRef} from "react";
import QueryForm from "@/components/QueryForm";
import ChatThread from "@/components/ChatThread";
import useChatHistory from "@/hooks/use-chat-history.hook";
import useConversation from "@/hooks/use-conversation.hook";
import {useRouter} from "next/router";
import useConversations from "@/hooks/use-conversations.hook";
import SelectBot from "@/components/SelectBot";
import {useQueryClient} from "react-query";
import ConversationElements from "@/components/ConversationElements";
import styles from "./styles.module.scss";

const Conversation: React.FC = () => {
  const router = useRouter()
  const conversationId = parseInt(router.query.conversationId as string)
  const queryClient = useQueryClient()
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

  const botSelectionRef = useRef()

  if (isLoading) {
    return <center>Loading...</center>
  }

  console.log('Avatar', data?.bot.configuration.avatar)

  return (
    <div className={styles.Conversation}>
      {(!isLoading && !data) && <SelectBot botSelectionRef={botSelectionRef}/>}
      {data && <ConversationElements conversationElements={data} />}
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
          newlyCreatedConversationId ? undefined : botSelectionRef.current
        );
      }}/>
    </div>
  );
};

export default Conversation;
