import React, {FC, PropsWithChildren} from 'react'
import styles from './styles.module.scss'
import clsx from "clsx";
import ConversationsList from "@/components/ConversationsList";
import UploadPDF from "@/components/UploadPDF";
import ThemeChanger from "@/components/ThemeChanger";
import IconButton from "@/components/Button/IconButton";
import GithubIcon from "@/components/icons/Github.icon";
import LinkIconButton from "@/components/Button/IconButton/LinkIconButton";

type ScaffoldingProps = {
  className?: string
  mainContentClassName?: string
}

const Scaffolding: FC<PropsWithChildren<ScaffoldingProps>> = ({className, mainContentClassName, children}) => {
  return (
    <div id="root" className={clsx(styles.container, className)}>
      <header>
        <LinkIconButton href={'https://github.com/amellouki/papegaai'}>
          <GithubIcon />
        </LinkIconButton>
        <UploadPDF/>
        <ThemeChanger/>
      </header>
      <aside>
        <ConversationsList/>
      </aside>
      <main className={clsx(styles.contentWrapper, mainContentClassName)}>
        {children}
      </main>
    </div>
  )
}

export default Scaffolding
