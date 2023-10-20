import React, {FunctionComponent} from 'react';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledToggleButton from "../../BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import Prompt from "@/components/BaseFormFields/Prompt";
import schema, {InputType} from "./form.schema";
import {CLM_PROMPT_PLACEHOLDERS, RLM_PROMPT_PLACEHOLDERS} from "./contants";
import styles from './styles.module.scss';
import WrappedSelect from "../../BaseFormFields/Select/WrappedSelect";
import {LLM_OPTIONS} from "@/constants";
import TextInput from "@/components/BaseFormFields/TextInput";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import FormCTAs from "@/components/BotForms/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";

type Props = BotFormProps2<InputType>

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

  console.log('errors', errors)

  const onSubmit = useSubmit(props)

  const isRLMCustomPrompt = watch('isRLMCustomPrompt');
  const isCLMCustomPrompt = watch('isCLMCustomPrompt');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM for the retrieval model'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'rLlm'}
        />
      )} name={'rLlm'} control={control} defaultValue={'gpt3.5'} />
      <FormFieldWrapper
        htmlFor={'api-key'}
        label={'Api key'}
        fieldError={errors.rApiKey}
      >
        <TextInput
          id={'api-key'}
          placeholder={'Provide an api key for the retrieval model'}
          hasError={!!errors.rApiKey}
          {...register('rApiKey', {required: true})}
        />
      </FormFieldWrapper>
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
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM for the conversational model'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'cLlm'}
        />
      )} name={'cLlm'} control={control} defaultValue={'gpt3.5'} />
      <FormFieldWrapper
        htmlFor={'c-api-key'}
        label={'Conversational model api key'}
        fieldError={errors.rApiKey}
      >
        <TextInput
          id={'c-api-key'}
          placeholder={'Provide an api key'}
          hasError={!!errors.rApiKey}
          {...register('cApiKey', {required: true})}
        />
      </FormFieldWrapper>
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
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default RetrievalConversational;
