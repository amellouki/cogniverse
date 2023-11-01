import {useQuery} from "react-query";
import {Account} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";
export function useAccountHook() {
  return useQuery<Account>(['account-info'], () => apiInstance.get('/login/account-info').then((res) => res.data));
}
