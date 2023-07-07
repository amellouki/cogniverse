import React, {forwardRef, FunctionComponent, useImperativeHandle, useMemo} from 'react';
import {Props as TextareaProps} from '../Textarea'
import useAutoresizeHook from "@/hooks/use-autoresize.hook";
import clsx from "clsx";
import textInputStyles from "../TextInput/styles.module.scss";
import textareaStyles from "../Textarea/styles.module.scss";
import styles from './styles.module.scss';

type Props = TextareaProps & {
  placeholders: string[];
}

const Prompt: FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {className, hasError, placeholders, ...rest} = props;

  const [textareaRef, setTextareaRef] = useAutoresizeHook();
  useImperativeHandle(ref, () => textareaRef!);

  return (
    <div className={styles.Prompt}>
      <textarea
        {...rest}
        ref={ref}
        className={clsx(
          className,
          textInputStyles.textInput,
          textareaStyles.Textarea,
          props.hasError && textInputStyles.Error,
          styles.textarea
        )}
      />
      <div className={styles.placeholders}>
        <span>Should contain the following placeholders:</span>
        {placeholders.map((placeholder, index) => (
          <div
            key={placeholder}
            className={clsx(styles.promptPlaceholder)}
          >
            {placeholder}
          </div>
        ))}
      </div>
    </div>
  );
});

Prompt.displayName = 'Prompt';

export default Prompt;
