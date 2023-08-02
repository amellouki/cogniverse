import {useQuery} from "react-query";
import RCConversation from "@my-monorepo/shared/dist/rc-conversation";

const useConversations = (conversationId?: number) => useQuery<RCConversation>(`conversation${conversationId}`, () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API + `/api/conversation?id=${conversationId}`).then((res) => res.json());
}, {
  enabled: !!conversationId,
});

export default useConversations
