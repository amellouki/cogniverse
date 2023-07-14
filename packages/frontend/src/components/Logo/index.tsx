import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import Link from "next/link";

const Logo: FunctionComponent = (props) => {
  return (
    <Link href={'/'} className={styles.Logo}>
      Cogni<strong className={styles.highlight}>verse</strong>
    </Link>
  );
}

export default Logo;
