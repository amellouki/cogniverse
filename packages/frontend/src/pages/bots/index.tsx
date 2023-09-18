import React from 'react';
import {useBots} from "@/hooks/use-bots.hook";
import styles from './styles.module.scss';
import Bots from "@/components/Bots";
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/BotNestedLayout";

const BotsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useBots();
  if (isLoading) return (<div>Loading...</div>)
  if (!data) return (<div>No bots</div>)
  return (
    <Bots bots={data} />
  );
}

BotsPage.getLayout = getLayout;

export default BotsPage;
