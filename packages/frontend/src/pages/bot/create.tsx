import React, {FunctionComponent} from 'react';
import CreateBot from "@/components/CreateAgent";
import styles from './styles.module.scss'

const Create: FunctionComponent = () => {
  return <div className={styles.CreateAgent}><CreateBot /></div>;
}

export default Create;
