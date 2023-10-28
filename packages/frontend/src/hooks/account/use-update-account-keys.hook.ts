import {useMutation, useQueryClient} from "react-query";
import {UpdateAccountKeys} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export function useUpdateAccountKeys(uid: string, onSuccess?: Function) {
  const queryClient = useQueryClient()
  return useMutation((updatedKeys: UpdateAccountKeys) => {
      return apiInstance.patch(`/account/${uid}/keys`, updatedKeys)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['account-info']).then(() => {
          console.log('updated account keys')
          onSuccess?.();
        })
      }
    })
}
