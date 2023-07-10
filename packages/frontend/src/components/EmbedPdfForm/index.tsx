import React, {FunctionComponent} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import SelectFile from "../BaseFormFields/SelectFile";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";
import {InputType} from "@/components/EmbedPdfForm/types";
import {getRequestBody} from "./helpers";
import {useMutateDocs} from "@/components/EmbedPdfForm/mutate-docs.hook";
import {zodResolver} from "@hookform/resolvers/zod";
import schema from "./form.schema";
import styles from './styles.module.scss';
import {DocumentCheckIcon} from "@heroicons/react/24/outline";

const EmbedPdfForm: FunctionComponent = (props) => {
  const [uploadStatus, setUploadStatus] = React.useState<string>();
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<InputType>({
    resolver: zodResolver(schema)
  });

  const files = watch('files');
  const selectedFile = files && files[0]?.name;

  const mutation = useMutateDocs(setUploadStatus, () => setIsProcessing(false));

  const onSubmit: SubmitHandler<InputType> = (data) => {
    mutation.mutate(getRequestBody(data));
    setIsProcessing(true);
  }
  return (
    <form className={styles.EmbedPdfForm} onSubmit={handleSubmit(onSubmit)} >
      <h2 className={styles.formTitle}>Embed Your PDF</h2>
      <FormFieldWrapper
        htmlFor="block_size"
        label={'Block size'}
        fieldError={errors.blockSize}
      >
        <TextInput
          {...register('blockSize', {required: true})}
          id="block_size"
          type={'number'}
          inputMode={'numeric'}
          min={0}
          placeholder={'Provide block size'}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        htmlFor="overlap"
        label={'Overlap'}
        fieldError={errors.overlap}
      >
        <TextInput
          {...register('overlap', {required: true})}
          id="overlap"
          type={'number'}
          inputMode={'numeric'}
          min={0}
          placeholder={'Provide overlap'}
        />
      </FormFieldWrapper>
      <SelectFile
        {...register('files', {required: true})}
        label={'Select PDF'}
        accept={'application/pdf'}
        id="select_file"
        fieldError={errors.files}
      />
      {selectedFile && <div className={styles.selectedFile}><span>{selectedFile}<DocumentCheckIcon width={24} height={24} /></span></div>}
      {uploadStatus && <div className={styles.progress}>{uploadStatus}</div>}
      <Button className={styles.button} type="submit" disabled={isProcessing}>Embed</Button>
    </form>
  );
}

export default EmbedPdfForm;
