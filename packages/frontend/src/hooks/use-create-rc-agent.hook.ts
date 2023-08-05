import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import NewBot from "../../../shared/src/types/bot/new-bot";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/agent/create-rc'

export default function useCreateRCAgent(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newConversation: NewBot) => axios.post(PATH, newConversation), {
    onSuccess: (response) => {
      console.log('response', response)
      queryClient.invalidateQueries('agents');
      onSuccess?.();
    },
  });
}
