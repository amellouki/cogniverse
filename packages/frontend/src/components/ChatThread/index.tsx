import React, {FunctionComponent} from 'react'
import MessageBox from '@/components/MessageBox'
import styles from './styles.module.scss'
import {ChatHistory} from "@/types/ChatRequest";
import NewMessage from '@my-monorepo/shared/dist/new-message';

type ChatThreadProps = {
  response?: NewMessage,
  chatHistory: ChatHistory
}

const ChatThread: FunctionComponent<ChatThreadProps> = ({chatHistory, response}) => {

  return (
    <div className={styles.chatThread}>
      {chatHistory.map((message, key) => (
        <MessageBox key={key} message={message}/>
      ))}
      {response && <MessageBox bubble={true} message={response}/>}
    </div>
  )
}

export default ChatThread
