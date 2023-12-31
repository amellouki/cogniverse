import {useQuery} from "react-query";
import {Bot} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export function useBotDetails(id?: Bot['id']) {
  return useQuery<Bot>(['bot', id], () => {
    return apiInstance.get(`/bots/${id}`).then((res) => res.data)
  }, {
    enabled: !!id,
  });
}
