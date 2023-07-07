import React, {forwardRef, FunctionComponent, useImperativeHandle} from 'react';
import textInputStyles from '../TextInput/styles.module.scss';
import clsx from "clsx";
import useAutoresizeHook from "@/hooks/use-autoresize.hook";
import styles from './styles.module.scss';

export type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
}

const Textarea: FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { className, hasError, ...rest } = props;

  const [textareaRef, setTextareaRef] = useAutoresizeHook();
  useImperativeHandle(ref, () => textareaRef!);

  return (
    <textarea
      {...rest}
      ref={setTextareaRef}
      className={clsx(
        className,
        textInputStyles.textInput,
        styles.Textarea,
        props.hasError && textInputStyles.Error
      )}
    />
  );
});

Textarea.displayName = 'TextArea';

export default Textarea;
