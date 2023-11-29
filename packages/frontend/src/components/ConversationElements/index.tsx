import React, {FunctionComponent} from 'react';
import {Conversation} from "@my-monorepo/shared";
import BotSummary from "@/components/ConversationElements/BotSummary";
import styles from './styles.module.scss'
import DocumentSummary from "@/components/ConversationElements/DocumentSummary";
import Portal from "@/components/Portal";

type Props = {
  conversationElements: Pick<Conversation, 'bot' | 'document'>
}

const ConversationElements: FunctionComponent<Props> = ({
  conversationElements: {bot, document}
                                                 }) => {
  return (
    <section className={styles.ConversationElements}>
      <Portal target={'header-placeholder'}>
        <BotSummary bot={bot} />
      </Portal>
      {document && <DocumentSummary document={document}/>}
    </section>
  );
}

export default ConversationElements;
