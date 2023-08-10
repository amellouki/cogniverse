import React, {FunctionComponent} from 'react';
import {Bot, BotAvatarType} from "@my-monorepo/shared";
import {Planet} from "react-kawaii";
import styles from './styles.module.scss'

type Props = {
  bot: Bot
}

const BotSummary: FunctionComponent<Props> = ({ bot }) => {
  const avatar = bot.configuration.avatar
  return (
    <section className={styles.BotSummary}>
      {avatar.type === BotAvatarType.BOT_AVATAR_EMOTE && <Planet size={50} mood="blissful" color={avatar.backgroundColor} />}
      <div>
        <h2><strong>{bot.name}</strong></h2>
        <h3>{bot.type}</h3>
      </div>
    </section>
  );
}

export default BotSummary;
