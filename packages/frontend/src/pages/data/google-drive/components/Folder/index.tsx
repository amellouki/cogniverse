import { useRouter } from 'next/router';
import Selectable from '@/pages/data/google-drive/components/Selectable';
import { FolderIcon } from '@heroicons/react/24/solid';

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

export default Folder;
