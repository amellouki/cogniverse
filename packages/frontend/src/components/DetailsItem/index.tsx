import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";

type Props = {
  label: string;
  value: string | JSX.Element;
  className?: string;
}

const DetailsItem: FunctionComponent<Props> = ({
  label,
  value,
  className
                                        }) => {
  return (
    <div className={clsx(styles.DetailsItem, className)}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.value}>
        {value}
      </span>
    </div>
  );
}

export default DetailsItem;
