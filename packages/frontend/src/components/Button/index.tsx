import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import clsx from "clsx";

//TODO: ADD BUTTON PREDEFINED STYLES (primary, secondary, outlined, etc)
type ButtonProps = {
  onClick?: () => void;
  type?: "submit" | "button";
  className?: string;
};
const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  children,
  className,
}) => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button
