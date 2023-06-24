import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

//TODO: ADD BUTTON PREDEFINED STYLES (primary, secondary, outlined, etc)
type ButtonProps = {
  onClick?: () => void;
  type?: "submit" | "button";
};
const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  children
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button
