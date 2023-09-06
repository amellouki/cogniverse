import React, {FunctionComponent, useEffect} from 'react';
import styles from './styles.module.scss';
import Button from "@/components/Button";
import LinkButton from "@/components/Button/LinkButton";
import {NextPageWithLayout} from "@/pages/_app";

const GITHUB_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;

const Login: NextPageWithLayout = (props) => {
  return (
    <div className={styles.Login}>
      <Button disabled={true} className={styles.button}>Guest</Button>
      <LinkButton href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}`} className={styles.button}>Authenticate with GitHub</LinkButton>
      <Button disabled={true} className={styles.button}>Discord</Button>
    </div>
  );
}

Login.getLayout = (page) => page;

export default Login;
