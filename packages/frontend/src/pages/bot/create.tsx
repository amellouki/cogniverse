import React, {FunctionComponent} from 'react';
import CreateBot from "../../components/CreateBot";
import styles from './styles.module.scss'

const Create: FunctionComponent = () => {
  return <div className={styles.CreateAgent}><CreateBot /></div>;
}

export default Create;
