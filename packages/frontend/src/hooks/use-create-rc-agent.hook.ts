import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import NewRcAgent from "@my-monorepo/shared/dist/new-rc-agent";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/agent/create-rc'

export default function useCreateRCAgent(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation((newConversation: NewRcAgent) => axios.post(PATH, newConversation), {
    onSuccess: (response) => {
      console.log('response', response)
      queryClient.invalidateQueries('agents');
      onSuccess?.();
    },
  });
}
