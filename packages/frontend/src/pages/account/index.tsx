import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import { getLayout } from "@/components/Layouts/DefaultLayout/BotNestedLayout";
import {useAccountHook} from "@/hooks/use-account.hook";
import DetailsItem from "@/components/DetailsItem";
import styles from './styles.module.scss'

const Account: NextPageWithLayout = () => {
  const { data, isLoading } = useAccountHook()
  if (isLoading) return (<div>Loading...</div>)
  if (!data) return (<div>Not found</div>)
  return (
    <section className={styles.Account}>
      <h1>
        Account details
      </h1>
      {data.profilePicture && <img alt={'profile picture'} src={data.profilePicture}/>}
      <DetailsItem label={'User name'} value={data.username} />
      <DetailsItem label={'authentication provider'} value={data.OAuthProvider} />
    </section>
  );
}

Account.getLayout = getLayout

export default Account;
