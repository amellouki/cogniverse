import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layouts/DefaultLayout/BotNestedLayout';
import Button from '@/components/Button';
import apiInstance from '@/helpers/api';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { noop } from 'lodash';
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Data Sources</h1>
      <section>
        <Link href={'/data/google-drive/root'}>
          <Button>Google Drive</Button>
        </Link>
      </section>
    </div>
  );
};

Page.getLayout = getLayout;

export default Page;
