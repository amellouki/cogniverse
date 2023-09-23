import React, {FunctionComponent, PropsWithChildren, ReactElement, ReactNode} from 'react';
import {getGuardedLayout} from "@/components/Layouts/DefaultLayout";
import clsx from "clsx";
import styles from "./styles.module.scss";

const BotNestedLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className={clsx('panel', styles.content)}>
      {props.children}
    </div>
  );
}

export default BotNestedLayout;

export const getLayout: (page: ReactElement) => ReactNode = (page) => getGuardedLayout(
  <BotNestedLayout>{page}</BotNestedLayout>
)
