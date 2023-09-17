import React, {FunctionComponent, ReactElement, useMemo} from 'react';
import Link from "next/link";
import styles from './styles.module.scss';
import BotIcon from "@/components/icons/Bot.icon";
import {DocumentDuplicateIcon, ChatBubbleLeftRightIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {useRouter} from "next/router";

type Props = {
  className?: string
}

const Navigation: FunctionComponent<Props> = ({ className }) => {
  return (
    <nav className={clsx(styles.Navigation, className)}>
      <NavItem href={'/conversations'} icon={<ChatBubbleLeftRightIcon width={36} height={36} />} title={'Conversations'} />
      <NavItem href={'/bots'} icon={<BotIcon width={"36px"} height={"36px"} />} title={'Bots'} />
      <NavItem href={'/documents'} icon={<DocumentDuplicateIcon width={36} height={36}/>} title={'Documents'} />
      <NavItem href={'/account'} icon={<UserCircleIcon width={36} height={36} />} title={'Account'} />
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
