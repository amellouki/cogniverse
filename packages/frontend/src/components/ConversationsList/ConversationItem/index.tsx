import React, {FunctionComponent} from 'react';
import Link from "next/link";
import {ConversationItem as Conversation} from "@/types/ChatThread";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import styles from "./styles.module.scss";
import clsx from "clsx";
import {useRouter} from "next/router";

type ConversationItemProps = {
  conversation: Conversation
}

const ConversationItem: FunctionComponent<ConversationItemProps> = ({conversation}) => {
  const router = useRouter()
  const conversationId = router.query.conversationId as string

  return (
    <Link
      className={clsx(
        styles.conversationItem,
        +conversationId === conversation.id && styles.selected
      )}
      href={`/conversation/${conversation.id}`}
    >
      <ChatBubbleBottomCenterTextIcon width={24} height={24}/>
      <span>
        {conversation.title}
      </span>
    </Link>
  );
}

export default ConversationItem;
