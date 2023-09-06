import React, {FunctionComponent} from 'react';
import {useQuery} from "react-query";
import {ConversationItem as Conversation} from "@/types/ChatThread";
import ConversationItem from "@/components/ConversationsList/ConversationItem";
import styles from "@/components/ConversationsList/styles.module.scss";
import CreateNewBot from "@/components/ConversationsList/ConversationItem/CreateNewBot";
import apiInstance from "@/helpers/api";

const ConversationsList: FunctionComponent = () => {
  const {data} = useQuery<Conversation[]>("conversations", () => {
    return apiInstance.get("/api/conversations").then((res) => res.data);
  });
  return (
    <div className={styles.ConversationList}>
      <CreateNewBot />
      {data && data.map((conversation) => {
        return <ConversationItem key={conversation.id} conversation={conversation} />
      })}
    </div>
  );
}

export default ConversationsList;
