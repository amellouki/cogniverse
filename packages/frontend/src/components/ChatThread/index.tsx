import React, {FunctionComponent} from 'react'
import MessageBox from '@/components/MessageBox'
import styles from './styles.module.scss'
import {ChatHistory} from "@/types/ChatRequest";
import {NewMessage} from '@my-monorepo/shared';
import {BotAvatar} from "@my-monorepo/shared";

type ChatThreadProps = {
  response?: NewMessage,
  chatHistory: ChatHistory
  avatar?: BotAvatar
}

const ChatThread: FunctionComponent<ChatThreadProps> = ({chatHistory, response, avatar}) => {

  return (
    <div className={styles.chatThread}>
      {chatHistory.map((message, key) => (
        <MessageBox key={message.id} message={message} avatar={avatar}/>
      ))}
      {response && <MessageBox bubble={true} message={response} avatar={avatar}/>}
    </div>
  )
}

export default ChatThread
