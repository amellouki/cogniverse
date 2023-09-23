import {useMutation, useQueryClient} from "react-query";
import apiInstance from "@/helpers/api";
import {UpdatedBot} from "@my-monorepo/shared";

export default function useUpdateBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((updatedBot: UpdatedBot) => apiInstance.post('/bot/update', updatedBot), {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(['bots']),
        queryClient.invalidateQueries(['bot']),
      ]).then(() => {
        onSuccess?.();
      })
    },
  });
}
