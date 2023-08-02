import React, {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import {Message} from "@/types/ChatThread";
import NewMessage from '@my-monorepo/shared/dist/new-message';
import Sender from "@/components/Sender";

export type MessageBoxProps = {
  message: Message | NewMessage;
  bubble?: boolean;
};

const MessageBox: FunctionComponent<MessageBoxProps> = ({
  message,
  bubble,
}) => {

  const shouldWrapInBubble = bubble || (message.fromType === "ai" && message.type !== "idea");

  if (message.type === "idea") {
    return (
      <div
        className={clsx(styles.idea, styles.messageBox)}
      >
        <div><strong>Searching for: </strong></div>
        <div className={styles.messageText}>
          {message.content}
        </div>
      </div>
    )
  }

  console.log('MessageBox', message)
  return (
    <div
      className={clsx(
        styles.messageBox,
        shouldWrapInBubble && styles.bubble
      )}
    >
      <div className="flex-shrink-0">
        <Sender sender={message.fromType} />
      </div>
      <div className={styles.messageText}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBox;
