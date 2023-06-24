import React from "react";
import Layout from "../../components/Layout";
import QueryForm from "@/components/QueryForm";
import DebugDocs from "@/components/DebugDocs";
import ChatThread from "@/components/ChatThread";
import useChatHistory from "@/hooks/use-chat-history.hook";
import useConversation from "@/hooks/use-conversation.hook";
import styles from "../styles.module.scss";
import {useQuery} from "react-query";
import {Conversation} from "@/types/ChatThread";
import {useRouter} from "next/router";

const Conversation: React.FC = () => {
  const router = useRouter()
  const conversationId = router.query.conversationId as string

  console.log(conversationId)
  const {data} = useQuery<Conversation>(`conversation${conversationId}`, () => {
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

  return (
    <Layout className={styles.chat} mainContentClassName={styles.mainContentClassName}>
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
      {resources && <DebugDocs docs={resources}/>}
    </Layout>
  );
};

export default Conversation;
