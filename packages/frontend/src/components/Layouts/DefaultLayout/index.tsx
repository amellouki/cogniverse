import React, {FC, PropsWithChildren, ReactElement, ReactNode} from 'react'
import clsx from "clsx";
import ThemeChanger from "@/components/ThemeChanger";
import GithubIcon from "@/components/icons/Github.icon";
import LinkIconButton from "@/components/Button/IconButton/LinkIconButton";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import RouteGuard from "@/components/RouteGuard";
import styles from './styles.module.scss'

type Props = {
  className?: string
}

const DefaultLayout: FC<PropsWithChildren<Props>> = ({
  className,
  children
}) => {
  return (
    <div id="root" className={clsx(styles.container, className)}>
      <header>
        <Logo/>
        <LinkIconButton href={'https://github.com/amellouki/cogniverse'}>
          <GithubIcon/>
        </LinkIconButton>
        <div className={styles.spacer}/>
        <ThemeChanger/>
      </header>
      <div className={styles.body}>
        <Navigation className={styles.navigation} />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout

export const getDefaultLayout: (page: ReactElement) => ReactNode = ((page: ReactElement) => (
  <DefaultLayout>
    {page}
  </DefaultLayout>
))
export const getGuardedLayout: (page: ReactElement) => ReactNode = ((page: ReactElement) => (
  <RouteGuard>
    <DefaultLayout>
      {page}
    </DefaultLayout>
  </RouteGuard>
))
