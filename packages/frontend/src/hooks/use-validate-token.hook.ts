import {useEffect} from "react";
import {LOCAL_STORAGE} from "@/constants";
import {useRouter} from "next/router";
import apiInstance from "@/helpers/api";
import {useSearchParams} from "next/navigation";

export function useValidateToken() {
  const { push, pathname } = useRouter();
  const params = useSearchParams();
  useEffect( () => {
    const code = params.get('code');
    apiInstance.get(`/login/validate?access_token=${localStorage.getItem(LOCAL_STORAGE.TOKEN)}`).then((response) => {
      const invalid = response.data.invalid;
      console.log('Token is invalid: ', invalid)
      if (invalid) {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        push('/login').then(() => console.log('Redirected to login page', Date.now()))
      }
    })
  }, [])
}
