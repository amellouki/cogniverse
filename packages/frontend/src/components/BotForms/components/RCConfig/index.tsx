import React, {FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import ControlledToggleButton from "@/components/BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import Prompt from "@/components/BaseFormFields/Prompt";
import {InputType} from "./form.schema";
import {CLM_PROMPT_PLACEHOLDERS, RLM_PROMPT_PLACEHOLDERS} from "./contants";
import styles from './styles.module.scss';
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import {LLM_OPTIONS} from "@/constants";
import {RC_QA_TEMPLATE, RC_QUESTION_GENERATION_TEMPLATE} from "@my-monorepo/shared";

type Props = {
  form: UseFormReturn<{
    botConfig: InputType
  }>
}

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const {
    register,
    control,
    formState: {errors},
    watch,
  } = props.form;

  const isRLMCustomPrompt = watch('botConfig.isRLMCustomPrompt');
  const isCLMCustomPrompt = watch('botConfig.isCLMCustomPrompt');

  return (
    <section className={styles.CreateBot}>
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM for the retrieval model'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'rLlm'}
        />
      )} name={'botConfig.rLlm'} control={control} defaultValue={'gpt-3.5-turbo'} />
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
          name={'botConfig.isRLMCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isRLMCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'rlm-prompt'}
          label={'Retrieval model prompt'}
          fieldError={errors.botConfig?.rlmPrompt}
        >
          <Prompt
            {...register(
              'botConfig.rlmPrompt',
              {required: true, value: RC_QUESTION_GENERATION_TEMPLATE}
            )}
            id={'rlm-prompt'}
            aria-invalid={errors.botConfig?.rlmPrompt ? 'true' : 'false'}
            placeholder={'Provide retrieval model prompt'}
            hasError={!!errors.botConfig?.rlmPrompt}
            placeholders={RLM_PROMPT_PLACEHOLDERS}
          />
        </FormFieldWrapper>
      )}
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM for the conversational model'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'cLlm'}
        />
      )} name={'botConfig.cLlm'} control={control} defaultValue={'gpt-3.5-turbo'} />
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
          name={'botConfig.isCLMCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isCLMCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'clm-prompt'}
          label={'Conversational model prompt'}
          fieldError={errors.botConfig?.clmPrompt}
        >
          <Prompt
            {...register(
              'botConfig.clmPrompt',
              {required: true, value: RC_QA_TEMPLATE}
            )}
            id={'clm-prompt'}
            placeholder={'Provide conversational model prompt'}
            hasError={!!errors.botConfig?.clmPrompt}
            placeholders={CLM_PROMPT_PLACEHOLDERS}
          />
        </FormFieldWrapper>
      )}
    </section>
  );
}

export default RetrievalConversational;
