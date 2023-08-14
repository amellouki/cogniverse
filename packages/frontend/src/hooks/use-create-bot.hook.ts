import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import NewBot from "../../../shared/src/types/bot/new-bot";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/bot/create'

export default function useCreateBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newBot: NewBot) => axios.post(PATH, newBot), {
    onSuccess: (response) => {
      console.log('response', response)
      queryClient.invalidateQueries('bots');
      onSuccess?.();
    },
  });
}
