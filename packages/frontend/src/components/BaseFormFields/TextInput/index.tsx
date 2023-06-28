import React, {ChangeEventHandler} from "react";
import styles from './styles.module.scss'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  value?: string;
  error?: string;
};

const TextInput = (props: TextInputProps) => {
  const { id, value, onChange, error, className, ...rest } = props;
  return (
    <div className={className}>
      <input
        id={id}
        className={styles.textInput}
        value={value}
        onChange={onChange}
        placeholder={"Send a message..."}
        {...rest}
      />
      {error && <span className="text-input__error">{error}</span>}
    </div>
  );
};

export default TextInput;
