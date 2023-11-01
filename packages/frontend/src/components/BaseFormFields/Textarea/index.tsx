import React, {forwardRef, FunctionComponent, useImperativeHandle} from 'react';
import useAutoresizeHook from "@/hooks/use-autoresize.hook";
import clsx from "clsx";
import textInputStyles from "../TextInput/styles.module.scss";
import styles from './styles.module.scss';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
}

const TextArea: FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {className, hasError, ...rest} = props;

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
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
