import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import styles from "./styles.module.scss";
import React, { FunctionComponent, useRef } from "react";
import useFileUpload from "@/hooks/use-file-upload";

const UploadPDF: FunctionComponent = (props) => {
  const { fileInput, onFileUpload } = useFileUpload();

  return (
    <Button>
      <label htmlFor="upload-document" className={styles.uploadFile}>
        <input
          onChange={onFileUpload}
          type="file"
          id="upload-document"
          ref={fileInput}
        />
        <span>
          <span>Upload PDF</span>
          <DocumentArrowUpIcon width={24} height={24} />
        </span>
      </label>
    </Button>
  );
};

export default UploadPDF;
