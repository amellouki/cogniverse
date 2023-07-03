import React, {FunctionComponent} from 'react';
import styles from "@/components/ConversationsList/ConversationItem/styles.module.scss";
import {SparklesIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useRouter} from "next/router";
import clsx from "clsx";

const CreateNewConversation: FunctionComponent = () => {
  const { pathname } = useRouter()
  const isCreate = pathname === '/conversation/create'
  return (
    <Link className={clsx(styles.conversationItem, isCreate && styles.selected)} href={`/conversation/create`}>
      <SparklesIcon width={24} height={24} />
      <span>
          [Updated successfully in production!]
        </span>
    </Link>
  );
}

export default CreateNewConversation;
