import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import Button from '@/components/Button';
import apiInstance from '@/helpers/api';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Data Sources</h1>
      <section>
        <GoogleDrive />
      </section>
    </div>
  );
};

Page.getLayout = getLayout;

export default Page;

function useGoogle() {
  const router = useRouter();

  return [
    async function login() {
      const res = await apiInstance.get('google/auth_url');
      if (!res.data.url) {
      }
      router.push(res.data.url).then(() => console.log('Redirected to google'));
    },
    async function ls() {
      const res = await apiInstance.get(`google/ls/root`);
      console.log(res);
    },
  ];
}

const GoogleDrive = () => {
  const [login, ls] = useGoogle();

  return (
    <div>
      <Button onClick={login}>Connect to Google Drive</Button>
      <Button onClick={ls}>List directory</Button>
    </div>
  );
};
