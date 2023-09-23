import React from 'react';
import Button from "@/components/Button";
import LinkButton from "@/components/Button/LinkButton";
import {NextPageWithLayout} from "@/pages/_app";
import GithubIcon from "@/components/icons/Github.icon";
import DiscordIcon from "@/components/icons/Discord.icon";
import styles from './styles.module.scss';
import Logo from "@/components/Logo";

const GITHUB_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;
const DISCORD_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID;

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
          href={`https://discord.com/api/oauth2/authorize?client_id=${DISCORD_OAUTH_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback%2Fdiscord&response_type=code&scope=identify`}
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
