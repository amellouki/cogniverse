import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import { getLayout } from "@/components/Layouts/DefaultLayout/BotNestedLayout";
import {useAccountHook} from "@/hooks/account/use-account.hook";
import DetailsItem from "@/components/DetailsItem";
import styles from './styles.module.scss'
import ManageAccountKeys from "../../components/ManageAccountKeys";
import Image from "next/image";
import {OAuthProvider} from "@my-monorepo/shared";

const Account: NextPageWithLayout = () => {
  const { data, isLoading } = useAccountHook()
  if (isLoading) return (<div>Loading...</div>)
  if (!data) return (<div>Not found</div>)
  return (
    <section className={styles.Account}>
      <h1>
        Account details
      </h1>
      {data.profilePicture && data.OAuthProvider !== OAuthProvider.DISCORD && (
        <Image
          alt={'profile picture'}
          src={data.profilePicture}
          width={64}
          height={64}
        />
      )}
      <DetailsItem label={'User name'} value={data.username} />
      <DetailsItem label={'authentication provider'} value={data.OAuthProvider} />
      <ManageAccountKeys account={data} />
    </section>
  );
}

Account.getLayout = getLayout

export default Account;
