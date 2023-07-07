import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss'
import CreateConversation from "@/components/CreateConversation";

const Create: FunctionComponent = () => {
  return <div className={styles.CreateConversation}><CreateConversation /></div>;
}

export default Create;
