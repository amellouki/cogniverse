import React, {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import {Message} from "@/types/ChatThread";
import {BotAvatar, NewMessage} from '@my-monorepo/shared';
import Sender from "@/components/Sender";
import Markdown from "react-markdown";
import GeneratedUI from "@/components/GeneratedUI";
import Image from "next/image";

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

  if (message.type === "generating") {
    return (
      <div
        className={clsx(styles.idea, styles.messageBox)}
      >
        <div className={styles.messageText}>
          {message.content}
        </div>
      </div>
    )
  }

  if (message.type === "generated_image") {
    console.log('drawing image');
    return (
      <div className={styles.imageWrapper}>
        <img
          src={message.content}
          alt="Generated Image"
          style={{
            width: '100%',
            minWidth: '500px',
            height: 'auto',
          }}
          width={500}
          height={500}
        />
      </div>
    )
  }

  if (message.type === 'ui') {
    return (
      <GeneratedUI data={JSON.parse(message.content)}/>
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
        <Sender sender={message.fromType} avatar={avatar}/>
      </div>
      <Markdown className={styles.messageText}>
        {message.content}
      </Markdown>
    </div>
  );
};

export default MessageBox;
