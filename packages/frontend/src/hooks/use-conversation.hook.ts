import {useCallback, useState} from 'react'
import {io} from "socket.io-client";
import {Message} from "@/types/ChatThread";
import {NewMessage, Conversation, NewTitelessConversation} from '@my-monorepo/shared';
import {LOCAL_STORAGE} from "@/constants";
import {useQueryClient} from "react-query";
import {toast} from "react-toastify";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/generation'

const useConversation = (
  onQuestionReceived: (message: Message) => void,
  onLatestResponseComplete: (message: Message) => void,
  setConversationId: (id: number) => void) => {
  const queryClient = useQueryClient()
  const [response, setResponse] = useState<NewMessage>();
  const [resources, setResources] = useState<any>();

  const sendQuestion = useCallback((question: string, conversationId?: number, newConversation?: NewTitelessConversation ) => {
    const socket = io(PATH, {
      query: {
        token: localStorage.getItem(LOCAL_STORAGE.TOKEN)
      }
    })
    socket.emit('getCompletion', {
      conversationId,
      question,
      newConversation
    })
    socket.on('data', (data) => {
      console.log('handle emitted data', data)
      const tokenMessage = data.content as NewMessage
      if (data.type === 'conversationDetails') {
        const conversation = data.content as Conversation
        queryClient.invalidateQueries('conversations')
        setConversationId(conversation.id)
      }
      console.log(tokenMessage)
      if (data.type === 'token' && tokenMessage.type === 'response-token') {
        setResponse((prev) => {
          if (!prev) return tokenMessage
          return {
            ...tokenMessage,
            content: prev.content + tokenMessage.content
          }
        })
      }
      if (data.type === 'retrieval' ||
          data.type === 'ui' ||
          data.type === 'generating' ||
          data.type === 'generated_image'
      ) {
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
      toast(error.message, {
        type: "error"
      })
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
