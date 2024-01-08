import { useInfiniteQuery, useMutation } from 'react-query';
import { useContext, useMemo } from 'react';
import Button from '@/components/Button';
import GoogleDriveSelection from '@/pages/data/google-drive/components/GoogleDriveSelection';
import { GDDataSourceRequestDto } from '@my-monorepo/shared';
import { SelectedFiles } from '@/pages/data/google-drive/[id]';
import apiInstance from '@/helpers/api';
import styles from './styles.module.scss';

async function list(id: string, pageToken: string | null) {
  return apiInstance
    .get(`google/ls/${id}`, {
      params: {
        pageToken,
      },
    })
    .then((res) => res.data);
}

function useAddGDriveDataSource(onSuccess?: () => void) {
  return useMutation(
    async (data: GDDataSourceRequestDto) => {
      return apiInstance
        .post('google/data-source', data)
        .then((res) => res.data);
    },
    {
      onSuccess,
    },
  );
}

const GoogleDriveListing = ({ id }: { id: string }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<any>(
    ['google-drive-list', id],
    ({ pageParam }) => list(id, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    },
  );
  const [selected, setSelected] = useContext(SelectedFiles);

  const children = useMemo(() => {
    return data?.pages.flatMap((page) => page.files);
  }, [data]);
  const selectedFiles = useMemo(() => {
    if (!children) return [];
    return Array.from(selected).map((id) => children.find((v) => v.id === id));
  }, [children, selected]);

  const dataSourceAdd = useAddGDriveDataSource(() => {
    setSelected(() => new Set());
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (!children) {
    return <div>No children</div>;
  }
  return (
    <>
      <section className={styles.actions}>
        <Button
          disabled={!selected.size || dataSourceAdd.isLoading}
          onClick={() => dataSourceAdd.mutate(mapSelectedToDto())}
        >
          Ingest documents
        </Button>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        )}
      </section>
      <GoogleDriveSelection items={children} />
    </>
  );

  function mapSelectedToDto(): GDDataSourceRequestDto {
    return {
      items: selectedFiles.map((file) => ({
        id: file.id as string,
        mimeType: file.mimeType as string,
      })),
    };
  }
};

export default GoogleDriveListing;
