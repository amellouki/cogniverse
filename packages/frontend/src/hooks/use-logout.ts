import {LOCAL_STORAGE} from "@/constants";
import {useRouter} from "next/router";
import {useCallback} from "react";

export default function useLogout() {
  const router = useRouter();
  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.TOKEN_EXPIRES_AT);
    router.push('/login').then(() => {
      console.log('logged out and redirected to login page!')
    });
  }, [router])
  return logout;
}
