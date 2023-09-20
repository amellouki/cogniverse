import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";

type Props = {
  label: string;
  value: string | JSX.Element;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const DetailsItem: FunctionComponent<Props> = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName
}) => {
  return (
    <div className={clsx(styles.DetailsItem, className)}>
      <span className={clsx(styles.label, labelClassName)}>
        {label}
      </span>
      <span className={clsx(styles.value, valueClassName)}>
        {value}
      </span>
    </div>
  );
}

export default DetailsItem;
