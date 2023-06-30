import React, {PropsWithChildren} from 'react';
import clsx from "clsx";
import buttonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const IconButton: React.FC<PropsWithChildren<Props>> = ({children, ...rest}) => {
  return (
    <button {...rest} className={clsx(buttonStyles.button, styles.button, rest.className)}>
      {children}
    </button>
  );
}

export default IconButton;
