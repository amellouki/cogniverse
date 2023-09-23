import React, {FunctionComponent} from 'react';
import {Bot} from "@my-monorepo/shared";
import GridItem from "@/components/Bots/Grid/GridItem";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";
import styles from './styles.module.scss';

type Props = {
  bots: Bot[]
}

const BotsGrid: FunctionComponent<Props> = ({
  bots
                                         }) => {
  return (
    <div className={styles.BotsGrid}>
      <Link href={`/bots/create`} className={clsx(styles.GridItem, styles.addBot)}>
        <PlusIcon width={36} height={36} />
        <span>Add new bot</span>
      </Link>
      {bots.map(bot => (
        <GridItem key={bot.id} bot={bot} />
      ))}
    </div>
  );
}

export default BotsGrid;
