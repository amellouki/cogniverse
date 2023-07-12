import React, {FunctionComponent} from 'react';
import {DocumentIcon} from "@heroicons/react/24/outline";
import styles from './styles.module.scss'

type Props = {
  extension: string
}

const DocumentIconWithExtension: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.DocumentIcon}>
      <DocumentIcon className={styles.icon} />
      <span className={styles.extension}>
        {props.extension}
      </span>
    </div>
  );
}

export default DocumentIconWithExtension;
