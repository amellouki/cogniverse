import {useMutation, useQueryClient} from "react-query";
import apiInstance from "@/helpers/api";
import {Bot, UpdatedBot} from "@my-monorepo/shared";

export default function useDeleteBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((botId: Bot['id']) => apiInstance.delete(`/bots/${botId}`), {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(['bots']),
      ]).then(() => {
        onSuccess?.();
      })
      queryClient.removeQueries(['bot']);
    },
  });
}
