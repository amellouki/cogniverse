import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import React, {forwardRef, FunctionComponent} from "react";
import styles from "./styles.module.scss";
import {FieldError} from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  fieldError?: FieldError;
}

const SelectFile: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, id, fieldError, ...restProps } = props;
  return (
    <label htmlFor={props.id} className={styles.ImportFile}>
      <input
        {...restProps}
        id={id}
        type="file"
        ref={ref}
      />
      <span>
        <span>{label ?? 'Select PDF'}</span>
        <DocumentArrowUpIcon width={24} height={24} />
      </span>
      {fieldError && <div className={styles.error} role="alert">{fieldError.message}</div>}
    </label>
  );
});

export default SelectFile;
