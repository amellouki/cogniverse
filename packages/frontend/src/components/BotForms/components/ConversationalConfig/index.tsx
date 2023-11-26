import React, {FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import ControlledToggleButton from "@/components/BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import Prompt from "@/components/BaseFormFields/Prompt";
import {InputType} from "./form.schema";
import {LLM_OPTIONS} from "@/constants";
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import styles from '../RCConfig/styles.module.scss';

type Props =  {
  form: UseFormReturn<{
    botConfig: InputType
  }>
}

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = props.form

  const isCustomPrompt = watch('botConfig.isCustomPrompt');

  return (
    <section className={styles.CreateBot}>
      <Controller render={({ field: {onChange, value } }) => (
        <WrappedSelect
          options={LLM_OPTIONS}
          label={'Select the LLM'}
          placeholder={'Select...'}
          selected={LLM_OPTIONS.find((option) => option.value === value)}
          onChange={(option) => onChange(option?.value)}
          id={'llm'}
        />
      )} name={'botConfig.llm'} control={control} defaultValue={'gpt-3.5-turbo'} />
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
          name={'botConfig.isCustomPrompt'}
          control={control}
          defaultValue={false}
        />
      </div>
      {isCustomPrompt && (
        <FormFieldWrapper
          htmlFor={'rlm-prompt'}
          label={'Custom Prompt'}
          fieldError={errors.botConfig?.prompt}
        >
          <Prompt
            {...register('botConfig.prompt', {required: true})}
            id={'rlm-prompt'}
            aria-invalid={errors.botConfig?.prompt ? 'true' : 'false'}
            placeholder={'Provide model prompt'}
            hasError={!!errors.botConfig?.prompt}
          />
        </FormFieldWrapper>
      )}
    </section>
  );
}

export default RetrievalConversational;
