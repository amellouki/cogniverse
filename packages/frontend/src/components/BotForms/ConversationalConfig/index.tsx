import React, {FunctionComponent} from 'react';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledToggleButton from "../../BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import Prompt from "@/components/BaseFormFields/Prompt";
import schema, {InputType} from "./form.schema";
import TextInput from "@/components/BaseFormFields/TextInput";
import {LLM_OPTIONS} from "@/constants";
import WrappedSelect from "../../BaseFormFields/Select/WrappedSelect";
import FormCTAs from "@/components/BotForms/FormCTAs";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import useSubmit from "@/components/BotForms/use-submit.hook";
import styles from '../RCConfig/styles.module.scss';

type Props =  BotFormProps2<InputType>

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.initValue,
  })

  const onSubmit = useSubmit(props)

  const isCustomPrompt = watch('isCustomPrompt');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'llm'}
        />
      )} name={'llm'} control={control} defaultValue={'gpt3.5'} />
      <FormFieldWrapper
        htmlFor={'api-key'}
        label={'Api key'}
        fieldError={errors.apiKey}
      >
        <TextInput
          id={'api-key'}
          placeholder={'Provide your api key'}
          hasError={!!errors.apiKey}
          {...register('apiKey', {required: true})}
        />
      </FormFieldWrapper>
      <div className={styles.ToggleButtonRow}>
        <span>Customise the prompt or keep it default?</span>
        <Controller
          render={({ field: {onChange, value} }) => (
            <ControlledToggleButton
              id={'rlm'}
              pressed={value}
              onToggle={onChange}
              options={['Default', 'Custom']}
              className={styles.ToggleButton}
            />
          )}
          name={'isCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'rlm-prompt'}
          label={'Custom Prompt'}
          fieldError={errors.prompt}
        >
          <Prompt
            {...register('prompt', {required: true})}
            id={'rlm-prompt'}
            aria-invalid={errors.prompt ? 'true' : 'false'}
            placeholder={'Provide model prompt'}
            hasError={!!errors.prompt}
          />
        </FormFieldWrapper>
      )}
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default RetrievalConversational;
