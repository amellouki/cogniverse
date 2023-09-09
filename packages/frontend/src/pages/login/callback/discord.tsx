import React, {useEffect} from 'react';
import Login from "@/pages/login";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import apiInstance from "@/helpers/api";
import {LOCAL_STORAGE} from "@/constants";

const DiscordCallback: NextPageWithLayout = (props) => {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const code = params.get('code');
    if (code) {
      apiInstance.post('/login/discord', {code}).then(res => {
        localStorage.setItem(LOCAL_STORAGE.TOKEN, res.data.access_token);
        router.push('/').then(() => console.log('Logged in successfully!'));
      })
    }
  }, [params])
  return (
    <div></div>
  );
}


DiscordCallback.getLayout = Login.getLayout;

export default DiscordCallback;
