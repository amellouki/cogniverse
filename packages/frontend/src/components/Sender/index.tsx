import React, {FunctionComponent} from 'react';
import {BoltIcon, UserIcon} from "@heroicons/react/24/outline";
import styles from './styles.module.scss'

type Props = {
  sender: string;
}

const senderIcon = new Map<string, JSX.Element>([
  ['human', <UserIcon width={24} height={24} key={'human'} />],
  ['ai', <BoltIcon key={'ai'} width={24} height={24}>🤖</BoltIcon>],
]);

const Sender: FunctionComponent<Props> = ({ sender }) => {
  return (
    <div className={styles.Sender}>
      {senderIcon.get(sender)}
    </div>
  );
}

export default Sender;
