import { NextPageWithLayout } from '@/pages/_app';
import Login from '@/pages/login';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import apiInstance from '@/helpers/api';
import { LOCAL_STORAGE } from '@/constants';

const Google: NextPageWithLayout = () => {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const code = params.get('code');
    if (code) {
      apiInstance.post('/google/consent', { code }).then((res) => {
        router
          .push('/data/google-drive/root')
          .then(() => console.log('Logged in successfully!'));
      });
    }
  }, [params]);
  return <div>Logging in...</div>;
};

Google.getLayout = Login.getLayout;

export default Google;
