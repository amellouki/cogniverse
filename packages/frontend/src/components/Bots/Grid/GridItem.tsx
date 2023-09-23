import React, {FunctionComponent} from 'react';
import {Bot, BotAvatarType} from "@my-monorepo/shared";
import {Planet} from "react-kawaii";
import Link from "next/link";
import styles from './styles.module.scss';

type Props = {
  bot: Bot
}

const GridItem: FunctionComponent<Props> = ({
  bot
                                     }) => {
  const avatar = bot.configuration.avatar;
  return (
    <Link href={`/bots/${bot.id}`} className={styles.GridItem}>
      <section>
        {avatar.type === BotAvatarType.BOT_AVATAR_EMOTE && <Planet size={50} mood="happy" color={avatar.backgroundColor} />}
        <div className={styles.information}>
          <span><strong>{bot.name}</strong></span>
          <span>{bot.type}</span>
          <span className={styles.description}>{bot.description}</span>
        </div>
      </section>
    </Link>
  );
}

export default GridItem;
