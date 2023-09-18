import React, {FunctionComponent} from 'react';
import {useBots} from "@/hooks/use-bots.hook";
import styles from './styles.module.scss';
import Bots from "@/components/Bots";
import clsx from "clsx";

const Index: FunctionComponent = (props) => {
  const { data, isLoading } = useBots();
  return (
    <div className={clsx(styles.BotsPage, 'panel')}>
      { data && (
        <Bots bots={data} />
      )}
    </div>
  );
}

export default Index;
