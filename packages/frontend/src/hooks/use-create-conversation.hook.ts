import {useMutation, useQueryClient} from "react-query";
import NewConversation from "@my-monorepo/shared/dist/new-conversation";
import axios from "axios";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/api/create_conversation'

export default function useCreateConversation(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newConversation: NewConversation) => axios.post(PATH, newConversation), {
    onSuccess: () => {
      queryClient.invalidateQueries('conversations');
      onSuccess?.();
    },
  });
}
