import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/CreateBotNestedLayout";
import Link from "next/link";
import {BotType} from "@my-monorepo/shared";
import styles from "./styles.module.scss";

const Create: NextPageWithLayout = () => {
  return (
    <div className={styles.CreateBot}>
      <h2 className={styles.formTitle}>Create a new bot</h2>
      <span>Select the type of the bot you want to create!</span>
      <div className={styles.list}>
        <Link href={'/bots/create/' + BotType.CONVERSATIONAL}><s>Conversational</s></Link>
        <Link href={'/bots/create/' + BotType.RETRIEVAL_CONVERSATIONAL}><s>Retrieval Conversational</s></Link>
        <Link href={'/bots/create/' + BotType.AGENT}>Agent</Link>
      </div>
    </div>
  );
}

Create.getLayout = getLayout;

export default Create;
