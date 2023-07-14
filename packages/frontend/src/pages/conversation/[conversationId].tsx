import React from "react";
import QueryForm from "@/components/QueryForm";
import ChatThread from "@/components/ChatThread";
import useChatHistory from "@/hooks/use-chat-history.hook";
import useConversation from "@/hooks/use-conversation.hook";
import {useQuery} from "react-query";
import {Conversation} from "@/types/ChatThread";
import {useRouter} from "next/router";
import Tips from "../../components/Tips";
import styles from "./styles.module.scss";

const Conversation: React.FC = () => {
  const router = useRouter()
  const conversationId = router.query.conversationId as string

  const {data, isLoading} = useQuery<Conversation>(`conversation${conversationId}`, () => {
    if (conversationId) {
      return fetch(process.env.NEXT_PUBLIC_BACKEND_API + `/api/conversation?id=${conversationId}`).then((res) => res.json());
    }
    return new Promise((resolve) => resolve(undefined))
  });
  const {history, appendOptimistic, appendSuccess} = useChatHistory(data?.ChatHistory);
  const {response, sendQuestion, resources} = useConversation(
    (question) => {
      appendSuccess(question)
    },
    (response) => {
      appendSuccess(response)
    }
  );

  if (!conversationId) {
    return <center><Tips /></center>
  }

  if (isLoading) {
    return <center>Loading...</center>
  }

  if (!data) {
    return <center>Not found</center>
  }

  return (
    <div className={styles.Conversation}>
      <ChatThread chatHistory={history} response={response}/>
      <QueryForm className={styles.queryForm} onSubmit={(question: string) => {
        if (!data) {
          return
        }
        appendOptimistic({
          content: question,
          type: 'question',
          fromId: 0,
          fromType: 'human',
          conversationId: data.id
        });
        sendQuestion(data.id, question);
      }}/>
      {data.document && <div><em>Retrieving data from <strong>{data.document.title}</strong></em></div>}
    </div>
  );
};

export default Conversation;
