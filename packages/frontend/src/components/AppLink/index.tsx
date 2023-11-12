import React, {FunctionComponent, HTMLProps, RefAttributes} from 'react';
import NextLink, {LinkProps} from 'next/link';
import styles from './styles.module.scss';

type Props = LinkProps & HTMLProps<HTMLAnchorElement> & RefAttributes<HTMLAnchorElement>

const AppLink: FunctionComponent<Props> = (props) => {
  return <NextLink {...props} className={styles.Link} />;
}

export default AppLink;
