import React, {FunctionComponent, LabelHTMLAttributes, PropsWithChildren} from 'react';
import {FieldError} from "react-hook-form";
import {getErrorText} from "@/helpers/get-error-text";
import styles from './styles.module.scss';

type Props = PropsWithChildren & LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
  label: string;
  fieldError?: FieldError;
}

const FormFieldWrapper: FunctionComponent<Props> = ({
  label,
  fieldError,
  children,
  ...labelAttributes
}) => {
  return (
    <label {...labelAttributes} className={styles.HTMLLabel}>
      <div className={styles.LabelText}>{label}</div>
      <div className={styles.FormFieldWrapper}>{children}</div>
      {fieldError && <div className={styles.Error} role="alert">
        {getErrorText(label, fieldError)}
      </div>}
    </label>
  );
}

export default FormFieldWrapper;
