import React, {forwardRef, FunctionComponent, InputHTMLAttributes, PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import {CheckIcon} from "@heroicons/react/24/outline";

type Props = InputHTMLAttributes<HTMLInputElement> & PropsWithChildren

const Checkbox: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {

  const { children, ...restProps } = props;
  return (
    <label htmlFor={props.id} className={styles.Checkbox}>
      <input {...restProps} type="checkbox" ref={ref} />
      <span>{children}</span>
      <CheckIcon className={styles.checkIcon} />
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
