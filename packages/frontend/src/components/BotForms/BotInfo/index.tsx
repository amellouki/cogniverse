import React, {FunctionComponent} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import schema, {InputType} from "./form.schema";
import SimpleColorPicker from "@/components/BaseFormFields/SimpleColorPicker";
import {Planet} from "react-kawaii";
import {COLOR_OPTIONS} from "@/constants";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import styles from '../RCConfig/styles.module.scss';
import FormCTAs from "@/components/BotForms/FormCTAs";

type Props = BotFormProps2<InputType>

const BotInfo: FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.initValue,
  })

  const onSubmit: SubmitHandler<InputType> = useSubmit(props)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <Controller
        render={({ field: {onChange, value}}) => (
          <section className={styles.avatarSelection}>
            <SimpleColorPicker onChange={onChange} options={COLOR_OPTIONS} selected={value} legend={'Pick the bot\'s look'} error={errors.color} />
            {value && <Planet size={100} mood="happy" color={value}/>}
          </section>
        )}
        control={control}
        name={'color'}
        defaultValue={''}
      />
      <FormFieldWrapper
        htmlFor={'bot-name'}
        label={'Bot Name'}
        fieldError={errors.name}
      >
        <TextInput
          id={'bot-name'}
          placeholder={'Provide unique bot name'}
          hasError={!!errors.name}
          autoComplete={'off'}
          {...register('name', {required: true})}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        htmlFor={'description'}
        label={'Description'}
        fieldError={errors.description}
      >
        <TextInput
          id={'description'}
          placeholder={'Provide a description for your bot'}
          hasError={!!errors.description}
          {...register('description', {required: true})}
        />
      </FormFieldWrapper>
      <Checkbox
        id={'is-public'}
        {...register('isPublic', {required: true})}
      >
        Should this bot be public?
      </Checkbox>
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default BotInfo;
