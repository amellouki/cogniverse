import React, {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import {Message} from "@/types/ChatThread";
import {BotAvatar, NewMessage} from '@my-monorepo/shared';
import Sender from "@/components/Sender";
import Markdown from "react-markdown";

export type MessageBoxProps = {
  message: Message | NewMessage;
  avatar?: BotAvatar;
  bubble?: boolean;
};

const MessageBox: FunctionComponent<MessageBoxProps> = ({
  message,
  bubble,
  avatar,
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

  return (
    <div
      className={clsx(
        styles.messageBox,
        shouldWrapInBubble && styles.bubble
      )}
    >
      <div className="flex-shrink-0">
        <Sender sender={message.fromType} avatar={avatar} />
      </div>
      <Markdown className={styles.messageText}>
        {message.content}
      </Markdown>
    </div>
  );
};

export default MessageBox;
