import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import Link from "next/link";
import {Icon} from "@/components/Logo/Icon";

const Logo: FunctionComponent = (props) => {
  return (
    <Link href={'/'} className={styles.Logo}>
      <Icon />
      <span className={styles.font}>
      Cogni<strong className={styles.highlight}>verse</strong>
      </span>
    </Link>
  );
}

export default Logo;
