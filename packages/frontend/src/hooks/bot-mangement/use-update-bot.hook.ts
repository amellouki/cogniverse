import {useMutation, useQueryClient} from "react-query";
import apiInstance from "@/helpers/api";
import {Bot, UpdatedBot} from "@my-monorepo/shared";

export default function useUpdateBot(botId?: Bot['id'], onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((updatedBot: UpdatedBot) => apiInstance.patch(`/bots/${updatedBot.id}`, updatedBot), {
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
