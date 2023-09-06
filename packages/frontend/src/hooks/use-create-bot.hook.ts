import {useMutation, useQueryClient} from "react-query";
import NewBot from "../../../shared/src/types/bot/new-bot";
import apiInstance from "@/helpers/api";

export default function useCreateBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newBot: NewBot) => apiInstance.post('/bot/create', newBot), {
    onSuccess: (response) => {
      console.log('response', response)
      queryClient.invalidateQueries('bots');
      onSuccess?.();
    },
  });
}
