import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  className?: string;
  href: string;
};
const LinkButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  href,
}) => {
  return (
    <Link
      href={href}
      className={clsx(styles.button, styles.primary, className)}
    >
      {children}
    </Link>
  );
};

export default LinkButton
