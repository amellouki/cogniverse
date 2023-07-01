import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';

const Logo: FunctionComponent = (props) => {
  return (
    <span className={styles.Logo}>
      Papega<strong className={styles.ai}>ai</strong>
    </span>
  );
}

export default Logo;
