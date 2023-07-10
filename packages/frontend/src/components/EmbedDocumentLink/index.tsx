import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import React, { FunctionComponent } from "react";
import LinkButton from "@/components/Button/LinkButton";
import styles from "./styles.module.scss";

const UploadPDF: FunctionComponent = (props) => {

  return (
    <LinkButton className={styles.EmbedDocumentLink} href={'/embed-document'}>
      <span>
        <span>Embed document</span>
        <DocumentArrowUpIcon width={24} height={24} />
      </span>
    </LinkButton>
  );
};

export default UploadPDF;
