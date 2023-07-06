import React, {FunctionComponent, PropsWithChildren} from 'react';
import {FieldError} from "react-hook-form";
import {getErrorText} from "./helper";
import styles from './styles.module.scss';

type Props = PropsWithChildren & {
  htmlFor: string;
  label: string;
  fieldError?: FieldError;
}

const FormFieldWrapper: FunctionComponent<Props> = (props) => {
  return (
    <label htmlFor={props.htmlFor} className={styles.HTMLLabel}>
      <div className={styles.LabelText}>{props.label}</div>
      <div className={styles.FormFieldWrapper}>{props.children}</div>
      {props.fieldError && <div className={styles.Error} role="alert">
        {getErrorText(props.label, props.fieldError)}
      </div>}
    </label>
  );
}

export default FormFieldWrapper;
