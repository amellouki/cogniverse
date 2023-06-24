import React, { FunctionComponent } from "react";
import styles from './styles.module.scss'
import QuoteIcon from "@/components/icons/Quote.icon";

type FormatJsonProps = {
  object: unknown;
};

const FormatJson: FunctionComponent<FormatJsonProps> = ({ object }) => {
  return (
    <blockquote className={styles.quoteBox}>
      <QuoteIcon />

      <pre className="block break-all" style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(object, null, 4)}</pre>
    </blockquote>
  );
};

export default FormatJson;
