import React, {FunctionComponent} from 'react';
import {Account} from "@my-monorepo/shared";
import styles from './styles.module.scss';
import Key from "@/components/ManageAccountKeys/Key";

type Props = {
  account: Account
}

const ManageAccountKeys: FunctionComponent<Props> = ({
                                                       account
                                                     }) => {

  return (
    <div className={styles.ManageAccountKeys}>
      <Key
        key={account.openAiApiKey}
        value={account.openAiApiKey ?? undefined}
        id={'openAiApiKey'}
        uid={account.id}
        label={'Open AI api key'}
      />
    </div>
  )
}

export default ManageAccountKeys;
