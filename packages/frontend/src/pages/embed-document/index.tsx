import React, {FunctionComponent} from 'react';
import EmbedPdfForm from "../../components/EmbedPdfForm";
import styles from './styles.module.scss'

const EmbedDocument: FunctionComponent = () => {
  return (
    <section className={styles.EmbedDocument}>
      <EmbedPdfForm />
    </section>
  );
}

export default EmbedDocument;
