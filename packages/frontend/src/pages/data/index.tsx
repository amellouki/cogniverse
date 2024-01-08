import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import Link from 'next/link';
import styles from './styles.module.scss';
import GoogleDriveIcon from '@/components/icons/GoogleDrive.icon';
import RegisterForTest from '@/pages/data/google-drive/components/RegisterForTest';

const Page: NextPageWithLayout = () => {
  return (
    <div className={styles.Data}>
      <h1>Data Sources</h1>
      <span>Please select a platform to ingest data from</span>
      <section>
        <Link className={styles.item} href={'/data/google-drive/root'}>
          <GoogleDriveIcon width={'32px'} height={'32px'} />
          <span>Google Drive</span>
        </Link>
      </section>
      <RegisterForTest className={styles.registerForTest} />
    </div>
  );
};

Page.getLayout = getLayout;

export default Page;
