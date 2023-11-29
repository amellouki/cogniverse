import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import Logo from "@/components/Logo";
import LinkIconButton from "@/components/Button/IconButton/LinkIconButton";
import GithubIcon from "@/components/icons/Github.icon";
import LinkButton from "@/components/Button/LinkButton";
import clsx from "clsx";
import Motivation from "@/components/Motivation";
import layoutStyles from "@/components/Layouts/DefaultLayout/styles.module.scss";
import styles from './styles.module.scss';
import Welcome from "@/components/Welcome";

const Home: NextPageWithLayout = () => {
  debugger;
  return (
    <div className={clsx(layoutStyles.container, styles.Home)}>
      <header>
        <Logo/>
        <div className={layoutStyles.spacer}/>
        <LinkButton href={'/login'}>Login</LinkButton>
        <LinkIconButton href={'https://github.com/amellouki/cogniverse'}>
          <GithubIcon/>
        </LinkIconButton>
      </header>
      <main>
        <Welcome />
        <Motivation />
      </main>
    </div>
  );
}

Home.getLayout = (x) => x;

export default Home;
