import React, {forwardRef, FunctionComponent, useImperativeHandle} from 'react';
import useAutoresizeHook from "@/hooks/use-autoresize.hook";
import clsx from "clsx";
import textInputStyles from "../TextInput/styles.module.scss";
import styles from './styles.module.scss';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  placeholders?: string[];
  hasError?: boolean;
}

const Prompt: FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {className, hasError, placeholders, ...rest} = props;

  const [textareaRef, setTextareaRef] = useAutoresizeHook();
  useImperativeHandle(ref, () => textareaRef!);

  return (
    <div className={styles.Prompt}>
      <textarea
        {...rest}
        ref={setTextareaRef}
        className={clsx(
          className,
          textInputStyles.textInput,
          props.hasError && textInputStyles.Error,
          styles.textarea
        )}
      />
      {placeholders?.length && <div className={styles.placeholders}>
        <span>Should contain the following placeholders:</span>
        {placeholders.map((placeholder, index) => (
          <div
            key={placeholder}
            className={clsx(styles.promptPlaceholder)}
          >
            {placeholder}
          </div>
        ))}
      </div>}
    </div>
  );
});

Prompt.displayName = 'Prompt';

export default Prompt;
