import React, {FunctionComponent, PropsWithChildren} from 'react';
import styles from './styles.module.scss';

type Props = PropsWithChildren & {
  id: string;
  label: string;
}

const FormFieldWrapper: FunctionComponent<Props> = (props) => {
  return (
    <label htmlFor={props.id} className={styles.HTMLLabel}>
      <div className={styles.LabelText}>{props.label}</div>
      <div className={styles.FormFieldWrapper}>{props.children}</div>
    </label>
  );
}

export default FormFieldWrapper;
