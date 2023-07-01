import React, {FC, PropsWithChildren} from 'react'
import styles from './styles.module.scss'
import clsx from "clsx";
import ConversationsList from "@/components/ConversationsList";
import UploadPDF from "@/components/UploadPDF";
import ThemeChanger from "@/components/ThemeChanger";
import GithubIcon from "@/components/icons/Github.icon";
import LinkIconButton from "@/components/Button/IconButton/LinkIconButton";
import Logo from "@/components/Logo";

type Props = {
  className?: string
  mainClassName?: string
}

const Layout: FC<PropsWithChildren<Props>> = ({
  className,
  mainClassName,
  children
}) => {
  return (
    <div id="root" className={clsx(styles.container, className)}>
      <header>
        <Logo/>
        <LinkIconButton href={'https://github.com/amellouki/papegaai'}>
          <GithubIcon/>
        </LinkIconButton>
        <div className={styles.spacer}/>
        <UploadPDF/>
        <ThemeChanger/>
      </header>
      <aside>
        <ConversationsList/>
      </aside>
      <main className={clsx(styles.main, mainClassName)}>
        {children}
      </main>
    </div>
  )
}

export default Layout
