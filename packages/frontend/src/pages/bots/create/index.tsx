import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/CreateBotNestedLayout";
import styles from "@/components/CreateBot/styles.module.scss";
import Link from "next/link";
import {BotType} from "@my-monorepo/shared";

const Create: NextPageWithLayout = () => {
  return (
    <div className={styles.CreateBot}>
      <h2 className={styles.formTitle}>Create a new bot</h2>
      <span>Select the type of the bot you want to create!</span>
      <Link href={'/bots/create/' + BotType.CONVERSATIONAL}>Conversational</Link>
      <Link href={'/bots/create/' + BotType.RETRIEVAL_CONVERSATIONAL}>Retrieval Conversational</Link>
    </div>
  );
}

Create.getLayout = getLayout;

export default Create;
