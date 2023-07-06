import React, {forwardRef} from "react";
import styles from './styles.module.scss'
import clsx from "clsx";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  hasError?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, hasError, ...rest } = props;
  return (
    <div className={className}>
      <input
        className={clsx(styles.textInput, hasError && styles.Error)}
        {...rest}
        ref={ref}
      />
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
