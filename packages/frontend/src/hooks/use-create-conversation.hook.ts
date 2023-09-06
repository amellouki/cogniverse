import {useMutation, useQueryClient} from "react-query";
import {NewConversation} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export default function useCreateConversation(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newConversation: NewConversation) => apiInstance.post('/api/create_conversation', newConversation), {
    onSuccess: () => {
      queryClient.invalidateQueries('conversations');
      onSuccess?.();
    },
  });
}
