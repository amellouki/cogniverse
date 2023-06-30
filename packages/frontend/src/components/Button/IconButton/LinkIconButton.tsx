import React, {PropsWithChildren} from 'react';
import clsx from "clsx";
import buttonStyles from '../styles.module.scss';
import styles from './styles.module.scss';
import Link from "next/link";

type Props = {
  href: string;
  className?: string;
}

const LinkIconButton: React.FC<PropsWithChildren<Props>> = ({href, className, children}) => {
  return (
    <Link href={href} className={clsx(buttonStyles.button, styles.button, className)}>
      {children}
    </Link>
  );
};

export default LinkIconButton;
