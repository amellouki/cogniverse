import {useMutation, useQueryClient} from "react-query";
import {NewBot} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export default function useCreateBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newBot: NewBot) => apiInstance.post('/bots', newBot), {
    onSuccess: () => {
      queryClient.invalidateQueries('bots');
      onSuccess?.();
    },
  });
}
