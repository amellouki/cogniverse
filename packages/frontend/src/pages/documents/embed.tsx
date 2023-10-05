import React from 'react';
import EmbedPdfForm from "../../components/EmbedPdfForm";
import styles from './styles.module.scss'
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/BotNestedLayout";

const EmbedDocument: NextPageWithLayout = () => {
  return (
    <section className={styles.EmbedDocument}>
      <EmbedPdfForm />
    </section>
  );
}

EmbedDocument.getLayout = getLayout;

export default EmbedDocument;
