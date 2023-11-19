import React, {FunctionComponent} from 'react';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import schema, {InputType} from "./form.schema";
import {LLM_OPTIONS} from "@/constants";
import WrappedSelect from "../../BaseFormFields/Select/WrappedSelect";
import FormCTAs from "@/components/BotForms/FormCTAs";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import useSubmit from "@/components/BotForms/use-submit.hook";
import styles from '../RCConfig/styles.module.scss';

type Props =  BotFormProps2<InputType>

const AgentConfig: FunctionComponent<Props> = (props) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...props.initValue
    },
  })

  const onSubmit = useSubmit(props)

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
      )} name={'llm'} control={control} defaultValue={'gpt-3.5-turbo'} />
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default AgentConfig;
