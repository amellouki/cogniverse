import React, {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import {Message} from "@/types/ChatThread";

export type MessageBoxProps = {
  message: Message | Omit<Message, "id">;
  bubble?: boolean;
};

const MessageBox: FunctionComponent<MessageBoxProps> = ({
  message,
  bubble,
}) => {

  const shouldWrapInBubble = bubble || (message.fromType === "ai" && message.type !== "idea");

  return (
    <div
      className={clsx(
        styles.messageBox,
        shouldWrapInBubble && styles.bubble
      )}
    >
      <div className="flex-shrink-0">
        <div className={styles.sender}>
          <span className="align-middle">{message.fromType}</span>
        </div>
      </div>
      <div className={styles.messageText}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBox;
