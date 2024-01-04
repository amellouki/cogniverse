import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import Button from '@/components/Button';
import apiInstance from '@/helpers/api';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { noop } from 'lodash';
import SelectionArea, { SelectionEvent } from '@viselect/react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { FolderIcon } from '@heroicons/react/24/solid';
import { DocumentIcon } from '@heroicons/react/24/solid';

type FileId = string;

const SelectedFiles = createContext<
  [Set<FileId>, Dispatch<SetStateAction<Set<FileId>>>]
>([new Set<FileId>(), noop]);

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1>Data Sources</h1>
      <GoogleDrive />
    </>
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
    router.push(res.data.url).then(() => console.log('Redirected to google'));
  }
}

const GoogleDrive = () => {
  const [login] = useGoogle();
  const { data, isLoading } = useGoogleTokenStatus();
  const search = useSearchParams();
  const id = search.get('id');
  const selectedFilesState = useState<Set<FileId>>(new Set<FileId>());
  return (
    <SelectedFiles.Provider value={selectedFilesState}>
      <section className={styles.GoogleDrive}>
        {!isLoading && !data?.valid && (
          <Button onClick={login}>Connect to Google Drive</Button>
        )}
        {!isLoading && data?.valid && id && <GoogleDriveFolder id={id} />}
      </section>
    </SelectedFiles.Provider>
  );
};

const File = ({ data }: { data: any }) => {
  return (
    <Selectable id={data.id}>
      <DocumentIcon height={24} width={24} />
      <img src={data.thumbnailLink} />
      {data.name}
    </Selectable>
  );
};

const Folder = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <Selectable id={data.id}>
      <div onDoubleClick={() => router.push(data.id)}>
        <FolderIcon width={24} height={24} />
        {data.name}
      </div>
    </Selectable>
  );
};

const Selectable = ({ children, id }: { children: any; id: string }) => {
  const [selected] = useContext(SelectedFiles);
  return (
    <li
      className={clsx(styles.Selectable, selected.has(id) && styles.selected)}
      data-key={id}
    >
      {children}
    </li>
  );
};

const GoogleDriveItem = ({ data }: { data: any }) => {
  if (data.mimeType === 'application/vnd.google-apps.folder') {
    return <Folder data={data} />;
  }
  return <File data={data} />;
};

const GoogleDriveNavigation = ({ items }: { items: any[] }) => {
  const extractIds = (els: Element[]): string[] =>
    els
      .map((v) => v.getAttribute('data-key'))
      .filter(Boolean)
      .map(String);

  const [selected, setSelected] = useContext(SelectedFiles);

  console.log(selected);
  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id: string) => next.add(id));
      extractIds(removed).forEach((id: string) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className={styles.container}
      onStart={onStart}
      onMove={onMove}
      selectables={'.' + styles.Selectable}
    >
      <ul className={styles.Navigation}>
        {items?.map((file: any) => (
          <GoogleDriveItem key={file.id} data={file} />
        ))}
      </ul>
    </SelectionArea>
  );
};

async function list(id: string, pageToken: string | null) {
  return apiInstance
    .get(`google/ls/${id}`, {
      params: {
        pageToken,
      },
    })
    .then((res) => res.data);
}

const GoogleDriveFolder = ({ id }: { id: string }) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<any>(
    ['google-drive-list', id],
    ({ pageParam }) => list(id, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    },
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  const children = data?.pages.flatMap((page) => page.files);

  if (!children) {
    return <div>No children</div>;
  }
  return (
    <>
      <GoogleDriveNavigation items={children} />
      <button onClick={() => fetchNextPage()}>More</button>
    </>
  );
};
