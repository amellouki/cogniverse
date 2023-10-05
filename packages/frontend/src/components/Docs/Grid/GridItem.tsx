import React, { FunctionComponent } from 'react';
import { DocumentMetadata } from "@my-monorepo/shared";
import DocumentIcon from "@/components/DocumentIcon";
import Link from "next/link";
import styles from './styles.module.scss';
import {readableFileSize} from "@/helpers/readable-file-size";

type Props = {
  doc: DocumentMetadata
}

const GridItem: FunctionComponent<Props> = ({
  doc
                                     }) => {
  return (
    <Link href={``} className={styles.GridItem}>
      <section>
        <DocumentIcon extension={'pdf'} />
        <div className={styles.information}>
          <span><strong>{doc.title}</strong></span>
          <span>{readableFileSize(doc.size, true)}</span>
        </div>
      </section>
    </Link>
  );
}

export default GridItem;
