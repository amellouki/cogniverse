import {useQuery} from "react-query";
import {Conversation} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

const useConversations = (conversationId?: number) => useQuery<Conversation>(`conversation${conversationId}`, () => {
  return apiInstance.get(`/api/conversation?id=${conversationId}`).then((res) => res.data);
}, {
  enabled: !!conversationId,
});

export default useConversations
