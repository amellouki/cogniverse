import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import clsx from "clsx";

type ButtonProps = {
  onClick?: () => void;
  type?: "submit" | "button";
  className?: string;
  variant?: "primary" | "outlined" | "danger"
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={clsx(styles.button, getButtonStyle(), className)}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );

  function getButtonStyle() {
    if (restProps.variant === "primary") {
      return styles.primary
    } else if (restProps.variant === "danger") {
      return styles.danger
    } else if (restProps.variant === 'outlined') {
      return styles.outlined
    } else {
      return styles.primary
    }
  }
};

export default Button
