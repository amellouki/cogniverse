import React, {FunctionComponent} from 'react';
import {RCConversation} from "@my-monorepo/shared";
import BotSummary from "@/components/ConversationElements/BotSummary";
import styles from './styles.module.scss'
import DocumentSummary from "@/components/ConversationElements/DocumentSummary";

type Props = {
  conversationElements: Pick<RCConversation, 'rcAgent' | 'document'>
}

const ConversationElements: FunctionComponent<Props> = ({
  conversationElements: {rcAgent, document}
                                                 }) => {
  return (
    <section className={styles.ConversationElements}>
      <BotSummary bot={rcAgent} />
      <DocumentSummary document={document} />
    </section>
  );
}

export default ConversationElements;
