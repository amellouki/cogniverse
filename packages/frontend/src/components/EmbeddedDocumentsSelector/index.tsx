import React, {FunctionComponent, useMemo} from 'react';
import useEmbeddedDocumentsList from "@/hooks/use-embedded-document-list.hook";
import ControlledOptionSelection from "@/components/BaseFormFields/ControlledOptionSelection";
import LabelValuePair from "@/types/LabelValuePair";
import styles from './styles.module.scss';
import {FieldError} from "react-hook-form";
import {getErrorText} from "@/helpers/get-error-text";

type Props = {
  onChange: (selectedDocumentId: number) => void
  selectedDocumentId: number | null
  fieldError?: FieldError
}

const EmbeddedDocumentsSelector: FunctionComponent<Props> = ({onChange, selectedDocumentId, fieldError}) => {
  const { data } = useEmbeddedDocumentsList();

  const options: LabelValuePair[] = useMemo(() => {
    if (!data) return [];
    return data.map((document) => {
      return {
        label: document.title,
        value: document.id + '',
      }
    })
  }, [data]);

  const selectedDocument = useMemo(() => {
    if (!options || selectedDocumentId === null) return null;
    return options.find((document) => document.value === selectedDocumentId + '');
  }, [options, selectedDocumentId]);

  if (data?.length === 0) return (<div>No documents registered yet!</div>);
  return (
    <div className={styles.EmbeddedDocumentsSelector}>
      <ControlledOptionSelection
        options={options}
        checkedOptions={selectedDocument ? [selectedDocument] : []}
        onChange={(option) => {
          onChange(parseInt(option[0].value));
        }}
      />
      {fieldError && <span className={styles.error}>{getErrorText('Document', fieldError)}</span>}
    </div>

  );
}

export default EmbeddedDocumentsSelector;
