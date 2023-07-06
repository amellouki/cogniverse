import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';

const Logo: FunctionComponent = (props) => {
  return (
    <span className={styles.Logo}>
      Cogni<strong className={styles.highlight}>verse</strong>
    </span>
  );
}

export default Logo;
