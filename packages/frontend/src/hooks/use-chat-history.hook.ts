import {useCallback, useEffect, useState} from "react";
import {ChatHistory} from "@/types/ChatRequest";
import {Message} from "@/types/ChatThread";
import { NewMessage } from '@my-monorepo/shared';

export default function useChatHistory(initHistory?: Message[]) {
  const [history, setHistory] = useState<ChatHistory>([]);
  useEffect(() => {
    setHistory(initHistory || [])
  }, [initHistory])
  const appendOptimistic = useCallback((message: Omit<NewMessage, 'conversationId'>) => {
    setHistory((prev) => ([...prev, {...message, id:0, conversationId: 0}]));
  }, [setHistory])
  const appendSuccess = useCallback((message: Message) => {
    setHistory((prev) => {
      if (prev[prev.length - 1]?.id === 0) {
        return [...prev.slice(0, -1), message];
      }
      return [...prev, message];
    });
  }, [setHistory])
  const appendError = useCallback(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1].id === 0) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  }, [setHistory])

  return {history, appendOptimistic, appendSuccess, appendError};
}
