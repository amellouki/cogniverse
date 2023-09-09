import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import apiInstance from "@/helpers/api";
import {LOCAL_STORAGE} from "@/constants";
import {useRouter} from "next/router";

const RouteGuard: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    validateToken();
    router.events.on('routeChangeComplete', validateToken);
    return () => {
      router.events.off('routeChangeComplete', validateToken);
    }
  }, [])

  return authorized ? <>{children}</> : null;

  function validateToken() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (!accessToken) {
      router.push('/login').then(() => console.log('Redirected to login page'))
      return;
    }
    apiInstance.get(`/login/validate?access_token=${accessToken}`).then((response) => {
      const invalid = response.data.invalid;
      if (invalid) {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        setAuthorized(false)
        router.push('/login').then(() => console.log('Redirected to login page'))
      } else {
        setAuthorized(true);
      }
    })
  }
}

export default RouteGuard;
