import React, {ChangeEventHandler, FunctionComponent} from 'react';
import styles from './styles.module.scss';
import textInputStyles from '../TextInput/styles.module.scss';
import clsx from "clsx";
import useAutoresizeHook from "@/hooks/use-autoresize.hook";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>


const Textarea: FunctionComponent<Props> = (props) => {
  const setTextareaRef = useAutoresizeHook();
  return (
    <div className={props.className}>
      <textarea {...props} ref={setTextareaRef} className={clsx(textInputStyles.textInput, styles.Textarea)} />
    </div>
  );
}

export default Textarea;
