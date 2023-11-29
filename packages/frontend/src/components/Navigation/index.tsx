import React, {FunctionComponent, ReactElement, useMemo} from 'react';
import Link from "next/link";
import BotIcon from "@/components/icons/Bot.icon";
import {
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {useRouter} from "next/router";
import styles from './styles.module.scss';
import useLogout from "@/hooks/use-logout";

type Props = {
  className?: string
}

const Navigation: FunctionComponent<Props> = ({ className }) => {
  const logout = useLogout();
  return (
    <nav className={clsx(styles.Navigation, className)}>
      <NavItem href={'/conversations/new'} icon={<ChatBubbleLeftRightIcon width={36} height={36} />} title={'Playground'} />
      <NavItem href={'/bots'} icon={<BotIcon width={"36px"} height={"36px"} />} title={'Bots'} />
      <NavItem href={'/documents'} icon={<DocumentDuplicateIcon width={36} height={36}/>} title={'Documents'} />
      <NavItem href={'/account'} icon={<UserCircleIcon width={36} height={36} />} title={'Account'} />
      <button onClick={logout} className={styles.NavigationItem}>
        <ArrowRightOnRectangleIcon width={36} height={36} />
        <span>logout</span>
      </button>
    </nav>
  );
}


type NavItemProps = {
  href: string
  icon: ReactElement
  title: string
}

const NavItem: FunctionComponent<NavItemProps> = ({
  href,
  icon,
  title
}) => {
  const router = useRouter();
  const isActive = useMemo(() => router.asPath.startsWith(href), [router, href])
  return (
    <Link href={href} className={clsx(styles.NavigationItem, isActive && styles.active)}>
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export default Navigation;
