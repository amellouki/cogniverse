import React from 'react';
import Button from "@/components/Button";
import LinkButton from "@/components/Button/LinkButton";
import {NextPageWithLayout} from "@/pages/_app";
import GithubIcon from "@/components/icons/Github.icon";
import DiscordIcon from "@/components/icons/Discord.icon";
import styles from './styles.module.scss';
import Logo from "@/components/Logo";

const GITHUB_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;
const NEXT_PUBLIC_DISCORD_OAUTH_URL = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL;

const Login: NextPageWithLayout = (props) => {
  return (
    <div className={styles.Login}>
      <Logo />
      <div className={styles.loginContainer}>
        <Button disabled={true} className={styles.button}>Start as Guest</Button>
        <LinkButton
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}`}
          className={styles.button}
        >
          <GithubIcon /> <span>Login with GitHub</span>
        </LinkButton>
        <LinkButton
          href={NEXT_PUBLIC_DISCORD_OAUTH_URL ?? "#"}
          className={styles.button}
        >
          <DiscordIcon width={"24px"} height={"24px"} /> <span>Login with Discord</span>
        </LinkButton>
      </div>
    </div>
  );
}

Login.getLayout = (page) => page;

export default Login;
