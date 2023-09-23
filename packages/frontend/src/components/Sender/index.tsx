import React, {CSSProperties, FunctionComponent, useMemo} from 'react';
import {BoltIcon, UserIcon} from "@heroicons/react/24/outline";
import styles from './styles.module.scss'
import {BotAvatar, BotAvatarType} from "@my-monorepo/shared";

type Props = {
  sender: string;
  avatar?: BotAvatar
}

const senderIcon = new Map<string, JSX.Element>([
  ['human', <UserIcon width={24} height={24} key={'human'} />],
  ['ai', <BoltIcon key={'ai'} width={24} height={24}>🤖</BoltIcon>],
]);

const Sender: FunctionComponent<Props> = ({ sender, avatar }) => {
  const style = useMemo((): CSSProperties | undefined => {
    if (avatar?.type === BotAvatarType.BOT_AVATAR_EMOTE && sender === 'ai') {
      return {
        backgroundColor: avatar.backgroundColor
      }
    }
  }, [avatar])

  return (
    <div className={styles.Sender} style={style}>
      {senderIcon.get(sender)}
    </div>
  );
}

export default Sender;
