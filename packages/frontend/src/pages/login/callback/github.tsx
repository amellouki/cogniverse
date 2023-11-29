import React, {useEffect} from 'react';
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "@/pages/_app";
import Login from "@/pages/login";
import {LOCAL_STORAGE} from "@/constants";
import apiInstance from "@/helpers/api";

const GithubCallback: NextPageWithLayout = (props) => {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const code = params.get('code');
    if (code) {
      apiInstance.post('/login/github', {code}).then(res => {
        localStorage.setItem(LOCAL_STORAGE.TOKEN, res.data.access_token);
        router.push('/conversations').then(() => console.log('Logged in successfully!'));
      })
    }
  }, [params])
  return (
    <div>Logging in...</div>
  );
}

GithubCallback.getLayout = Login.getLayout;

export default GithubCallback;
