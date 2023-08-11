import {useQuery} from "react-query";
import {Conversation} from "@my-monorepo/shared";

const useConversations = (conversationId?: number) => useQuery<Conversation>(`conversation${conversationId}`, () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API + `/api/conversation?id=${conversationId}`).then((res) => res.json());
}, {
  enabled: !!conversationId,
});

export default useConversations
