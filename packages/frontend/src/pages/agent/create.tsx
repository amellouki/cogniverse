import React, {FunctionComponent} from 'react';
import CreateAgent from "@/components/CreateAgent";
import styles from './styles.module.scss'

const Create: FunctionComponent = () => {
  return <div className={styles.CreateAgent}><CreateAgent /></div>;
}

export default Create;
