import React, {FunctionComponent} from 'react';
import DocumentIcon from "@/components/DocumentIcon";
import {DocumentMetadata} from "@my-monorepo/shared";
import styles from './styles.module.scss'

type Props = {
  document: DocumentMetadata
}

const DocumentSummary: FunctionComponent<Props> = ({ document }) => {
  return (
    <section className={styles.DocumentSummary}>
      <DocumentIcon className={styles.icon} extension={'pdf'} />
      <div>
        <p>Retrieving data from: </p>
        <h2><strong>{document.title}</strong></h2>
      </div>
    </section>
  );
}

export default DocumentSummary;
