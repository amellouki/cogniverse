import Selectable from '@/pages/data/google-drive/components/Selectable';
import { DocumentIcon } from '@heroicons/react/24/solid';
import styles from './styles.module.scss';

const File = ({ data }: { data: any }) => {
  return (
    <Selectable className={styles.File} id={data.id}>
      {data.thumbnailLink && (
        <img
          alt={`Thumbnail for file name ${data.name}`}
          src={data.thumbnailLink}
        />
      )}
      <div className={styles.caption}>
        <DocumentIcon height={24} width={24} />
        <span>{data.name}</span>
      </div>
    </Selectable>
  );
};

export default File;
