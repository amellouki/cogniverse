import React, {FunctionComponent} from 'react';
import CreateConversation from "@/components/CreateConversation";
import styles from './styles.module.scss'

const Create: FunctionComponent = () => {
  return <div className={styles.CreateConversation}><CreateConversation /></div>;
}

export default Create;
