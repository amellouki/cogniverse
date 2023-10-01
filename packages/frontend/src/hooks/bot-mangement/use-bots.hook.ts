import {useQuery} from "react-query";
import {Bot} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export function useBots() {
  return useQuery<Bot[]>('bots', () => {
    return apiInstance.get('/bots').then((res) => res.data)
  });
}
