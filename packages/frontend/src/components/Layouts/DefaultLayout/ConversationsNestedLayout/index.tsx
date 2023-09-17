import React, {FC, PropsWithChildren, ReactElement, ReactNode} from 'react';
import ConversationsList from "@/components/ConversationsList";
import clsx from "clsx";
import styles from "./styles.module.scss";
import {getGuardedLayout} from "@/components/Layouts/DefaultLayout";

const ConversationsNestedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.content}>
      <nav className={styles.conversationsList}>
        <ConversationsList/>
      </nav>
      <main className={clsx(styles.main, styles.mainClassName)}>
        {children}
      </main>
    </section>
  );
}

export default ConversationsNestedLayout;

export const getLayout: (page: ReactElement) => ReactNode = (page) => getGuardedLayout(
  <ConversationsNestedLayout>{page}</ConversationsNestedLayout>
)
