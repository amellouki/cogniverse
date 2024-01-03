import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import Button from '@/components/Button';
import apiInstance from '@/helpers/api';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <div>
      {!isLoading && !data?.valid && (
        <Button onClick={login}>Connect to Google Drive</Button>
      )}
      {!isLoading && data?.valid && id && <GoogleDriveFolder id={id} />}
    </div>
  );
};

const File = ({ data }: { data: any }) => {
  return (
    <div>
      <strong>File Item</strong>
      {data.name}
    </div>
  );
};

const Folder = ({ data }: { data: any }) => {
  return (
    <div>
      <Link href={data.id}>
        <strong>Folder</strong>
        {data.name}
      </Link>
    </div>
  );
};

const GoogleDriveItem = ({ data }: { data: any }) => {
  if (data.mimeType === 'application/vnd.google-apps.folder') {
    return <Folder data={data} />;
  }
  return <File data={data} />;
};

const GoogleDriveNavigation = ({ items }: { items: any[] }) => {
  return (
    <div>
      {items?.map((file: any) => (
        <GoogleDriveItem key={file.id} data={file} />
      ))}
    </div>
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
    <div>
      <GoogleDriveNavigation items={children} />
      <button onClick={() => fetchNextPage()}>More</button>
    </div>
  );
};
