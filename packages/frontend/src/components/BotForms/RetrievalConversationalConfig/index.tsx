import React, {FunctionComponent} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledToggleButton from "../../BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import Button from "@/components/Button";
import Prompt from "@/components/BaseFormFields/Prompt";
import schema, {InputType} from "./form.schema";
import {CLM_PROMPT_PLACEHOLDERS, RLM_PROMPT_PLACEHOLDERS} from "./contants";
import EmbeddedDocumentsSelector from "@/components/EmbeddedDocumentsSelector";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import styles from './styles.module.scss';

type Props = {
  onSubmit: (data: InputType) => void
  initValue?: InputType
  onCancel?: () => void
}

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.initValue,
  })

  const onSubmit: SubmitHandler<InputType> = (data) => props.onSubmit(data)

  const isRLMCustomPrompt = watch('isRLMCustomPrompt');
  const isCLMCustomPrompt = watch('isCLMCustomPrompt');
  const isBoundToDocument = watch('isBoundToDocument');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <div className={styles.ToggleButtonRow}>
        <span>Retrieval model prompt</span>
        <Controller
          render={({field: {onChange, value}}) => (
            <ControlledToggleButton
              id={'rlm'}
              pressed={value}
              onToggle={onChange}
              options={['Default', 'Custom']}
              className={styles.ToggleButton}
            />
          )}
          name={'isRLMCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isRLMCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'rlm-prompt'}
          label={'Retrieval model prompt'}
          fieldError={errors.rlmPrompt}
        >
          <Prompt
            {...register('rlmPrompt', {required: true})}
            id={'rlm-prompt'}
            aria-invalid={errors.rlmPrompt ? 'true' : 'false'}
            placeholder={'Provide retrieval model prompt'}
            hasError={!!errors.rlmPrompt}
            placeholders={RLM_PROMPT_PLACEHOLDERS}
          />
        </FormFieldWrapper>
      )}
      <div className={styles.ToggleButtonRow}>
        <span>Conversational model prompt</span>
        <Controller
          render={({field: {onChange, value}}) => (
            <ControlledToggleButton
              id={'clm'}
              pressed={value}
              onToggle={onChange}
              options={['Default', 'Custom']}
              className={styles.ToggleButton}
            />
          )}
          name={'isCLMCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isCLMCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'clm-prompt'}
          label={'Conversational model prompt'}
          fieldError={errors.clmPrompt}
        >
          <Prompt
            {...register('clmPrompt', {required: true})}
            id={'clm-prompt'}
            placeholder={'Provide conversational model prompt'}
            hasError={!!errors.clmPrompt}
            placeholders={CLM_PROMPT_PLACEHOLDERS}
          />
        </FormFieldWrapper>
      )}
      <Checkbox
        id={'bind-document'}
        {...register('isBoundToDocument', {required: true})}
      >
        Bind document?
      </Checkbox>
      {isBoundToDocument && (
        <Controller
          control={control}
          name={'boundDocumentId'}
          defaultValue={undefined}
          render={({field: {onChange, value}}) => (
            <EmbeddedDocumentsSelector
              onChange={onChange}
              selectedDocumentId={value}
              fieldError={errors.boundDocumentId}
            />
          )}
        />
      )}
      <section className={styles.actions}>
        {props.initValue && (
          <Button type={'button'} onClick={props.onCancel} variant={'outlined'}>Cancel</Button>
        )}
        <Button type={'submit'}>
          {props.initValue ? 'Update' : 'Create'}
        </Button>
      </section>
    </form>
  );
}

export default RetrievalConversational;
