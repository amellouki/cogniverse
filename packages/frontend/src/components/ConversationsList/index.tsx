import React, {FunctionComponent} from 'react';
import {useQuery} from "react-query";
import {ConversationItem as Conversation} from "@/types/ChatThread";
import ConversationItem from "@/components/ConversationsList/ConversationItem";
import Link from "next/link";
import itemStyles from "@/components/ConversationsList/ConversationItem/styles.module.scss";
import styles from "@/components/ConversationsList/styles.module.scss";

const ConversationsList: FunctionComponent = (props) => {
  const {data} = useQuery<Conversation[]>("conversations", () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/api/conversations").then((res) => res.json());
  });
  return (
    <div className={styles.ConversationList}>
      <Link className={itemStyles.conversationItem} href={`/conversation/create`}>
        Create new conversation
      </Link>
      {data && data.map((conversation) => {
        return <ConversationItem key={conversation.id} conversation={conversation} />
      })}
    </div>
  );
}

export default ConversationsList;
