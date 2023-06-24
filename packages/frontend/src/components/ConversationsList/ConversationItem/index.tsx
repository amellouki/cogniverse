import React, {FunctionComponent} from 'react';
import Link from "next/link";
import {ConversationItem as Conversation} from "@/types/ChatThread";
import styles from "./styles.module.scss";

type ConversationItemProps = {
  conversation: Conversation
}

const ConversationItem: FunctionComponent<ConversationItemProps> = ({ conversation }) => {
  return (
    <Link className={styles.conversationItem} href={`/conversation/${conversation.id}`}>
      {conversation.title}
    </Link>
  );
}

export default ConversationItem;
