import {useCallback, useState} from 'react'
import {io} from "socket.io-client";
import {Message} from "@/types/ChatThread";
import NewMessage from '@my-monorepo/shared/dist/new-message';

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/conversational-retrieval-qa'

const useConversation = (
  onQuestionReceived: (message: Message) => void,
  onLatestResponseComplete: (message: Message) => void) => {
  const [response, setResponse] = useState<NewMessage>();
  const [resources, setResources] = useState<any>();

  const sendQuestion = useCallback((conversationId: number, question: string) => {
    const socket = io(PATH)
    socket.emit('getCompletion', {
      conversationId,
      question
    })
    socket.on('data', (data) => {
      const tokenMessage = data.content as NewMessage
      if (data.type === 'token' && tokenMessage.type === 'response-token') {
        setResponse((prev) => {
          if (!prev) return tokenMessage
          return {
            ...tokenMessage,
            content: prev.content + tokenMessage.content
          }
        })
      }
      if (data.type === 'retrieval') {
        onLatestResponseComplete(data.content)
      }
      if (data.type === 'response') {
        onLatestResponseComplete(data.content)
        setResponse(undefined)
      }
      if (data.type === 'question') {
        onQuestionReceived(data.content)
      }
    })
    socket.on('error', (error) => {
      console.error('error', error)
    })
    socket.on('disconnect', (reason) => {
      console.log('disconnect', reason)
    })

    return () => {
      socket.close()
    };
  }, [onLatestResponseComplete]);

  return {response, sendQuestion, resources};
}

export default useConversation
