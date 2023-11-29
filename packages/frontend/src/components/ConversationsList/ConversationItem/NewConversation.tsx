import React, {FunctionComponent} from 'react';
import styles from "@/components/ConversationsList/ConversationItem/styles.module.scss";
import {SparklesIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useRouter} from "next/router";
import clsx from "clsx";

const NewConversation: FunctionComponent = () => {
  const { pathname } = useRouter()
  const isCreate = pathname === '/conversations/new'
  return (
    <Link className={clsx(styles.conversationItem, isCreate && styles.selected)} href={`/conversations`}>
      <SparklesIcon width={24} height={24} />
      <span>
        New conversation
      </span>
    </Link>
  );
}

export default NewConversation;
