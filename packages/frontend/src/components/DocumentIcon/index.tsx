import React, {FunctionComponent} from 'react';
import {DocumentIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";
import styles from './styles.module.scss'

type Props = {
  extension: string
  className?: string
}

const DocumentIconWithExtension: FunctionComponent<Props> = (props) => {
  return (
    <div className={clsx(styles.DocumentIcon, props.className)}>
      <DocumentIcon className={styles.icon} width={50} height={50} />
      <span className={styles.extension}>
        {props.extension}
      </span>
    </div>
  );
}

export default DocumentIconWithExtension;
