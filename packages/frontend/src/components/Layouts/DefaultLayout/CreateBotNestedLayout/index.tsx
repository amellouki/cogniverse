import React, {FunctionComponent, PropsWithChildren, ReactElement, ReactNode} from 'react';
import {getGuardedLayout} from "@/components/Layouts/DefaultLayout";
import clsx from "clsx";
import styles from "./styles.module.scss";

const CreateBotNestedLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className={clsx('panel', styles.content)}>
      <div className={styles.sideElement}></div>
      <div className={styles.mainElement}>{props.children}</div>
      <div className={styles.sideElement} id={'create-bot-right-sidebar'} />
    </div>
  );
}

export default CreateBotNestedLayout;

export const getLayout: (page: ReactElement) => ReactNode = (page) => getGuardedLayout(
  <CreateBotNestedLayout>{page}</CreateBotNestedLayout>
)
