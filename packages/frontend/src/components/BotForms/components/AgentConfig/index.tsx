import React, {FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "./form.schema";
import {LLM_OPTIONS} from "@/constants";
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import styles from '../RCConfig/styles.module.scss';

type Props =  {
  form: UseFormReturn<{
    botConfig: InputType
  }>
}

const AgentConfig: FunctionComponent<Props> = (props) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = props.form

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
    </section>
  );
}

export default AgentConfig;
