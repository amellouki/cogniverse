import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import apiInstance from '@/helpers/api';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { noop } from 'lodash';
import styles from './styles.module.scss';
import GoogleDriveListing from '@/pages/data/google-drive/components/GoogleDriveListing';

type FileId = string;

export const SelectedFiles = createContext<
  [Set<FileId>, Dispatch<SetStateAction<Set<FileId>>>]
>([new Set<FileId>(), noop]);

const Page: NextPageWithLayout = () => {
  const [login] = useGoogle();
  const { data, isLoading: isLoadingTokenStatus } = useGoogleTokenStatus();
  const search = useSearchParams();
  const id = search.get('id');
  const [selected, setSelected] = useState<Set<FileId>>(new Set<FileId>());

  useEffect(() => {
    if (!isLoadingTokenStatus && !data?.valid) {
      login()
        .then(() => console.log('Redirected to google'))
        .catch(console.error);
    }
  }, [isLoadingTokenStatus, data, id, login]);

  if (isLoadingTokenStatus) {
    return <div>Checking connection to Google Drive</div>;
  }
  return (
    <SelectedFiles.Provider value={[selected, setSelected]}>
      <section className={styles.GoogleDrive}>
        {!isLoadingTokenStatus && data?.valid && id && (
          <GoogleDriveListing id={id} />
        )}
      </section>
    </SelectedFiles.Provider>
  );
};

Page.getLayout = getLayout;

export default Page;

function useGoogleTokenStatus() {
  return useQuery<any>(['google-token-status'], async () => {
    return apiInstance.get('google/token-status').then((res) => res.data);
  });
}

function useGoogle() {
  const router = useRouter();

  return [login];

  async function login() {
    const res = await apiInstance.get('google/auth_url');
    if (!res.data.url) {
    }
    return router.push(res.data.url);
  }
}
