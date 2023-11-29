import React, {FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import {InputType} from "./form.schema";
import SimpleColorPicker from "@/components/BaseFormFields/SimpleColorPicker";
import {Planet} from "react-kawaii";
import {COLOR_OPTIONS} from "@/constants";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import EmbeddedDocumentsSelector from "@/components/EmbeddedDocumentsSelector";
import styles from '../RCConfig/styles.module.scss';


type Props = {
  form: UseFormReturn<{
    botInfo: InputType
  }>
}

const BotInfo: FunctionComponent<Props> = (props) => {
  const {
    register,
    control,
    watch,
    formState: {errors},
  } = props.form

  const isBoundToDocument = watch('botInfo.isBoundToDocument');

  return (
    <section className={styles.CreateBot}>
      <Controller
        render={({ field: {onChange, value}}) => (
          <section className={styles.avatarSelection}>
            <SimpleColorPicker
              onChange={onChange}
              options={COLOR_OPTIONS}
              selected={value}
              legend={'Pick the bot\'s look'}
              error={errors.botInfo?.color}
            />
            {value && <Planet size={100} mood="happy" color={value}/>}
          </section>
        )}
        control={control}
        name={'botInfo.color'}
        defaultValue={''}
      />
      <FormFieldWrapper
        htmlFor={'bot-name'}
        label={'Bot Name'}
        fieldError={errors.botInfo?.name}
      >
        <TextInput
          id={'bot-name'}
          placeholder={'Provide unique bot name'}
          hasError={!!errors.botInfo?.name}
          autoComplete={'off'}
          {...register('botInfo.name', {required: true})}
        />
      </FormFieldWrapper>
      <FormFieldWrapper
        htmlFor={'description'}
        label={'Description'}
        fieldError={errors.botInfo?.description}
      >
        <TextInput
          id={'description'}
          placeholder={'Provide a description for your bot'}
          hasError={!!errors.botInfo?.description}
          autoComplete={'off'}
          {...register('botInfo.description', {required: true})}
        />
      </FormFieldWrapper>
      <Checkbox
        id={'bind-document'}
        {...register('botInfo.isBoundToDocument', {required: true})}
      >
        Bind document?
      </Checkbox>
      {isBoundToDocument && (
        <Controller
          control={control}
          name={'botInfo.boundDocumentId'}
          defaultValue={undefined}
          render={({field: {onChange, value}}) => (
            <EmbeddedDocumentsSelector
              onChange={onChange}
              selectedDocumentId={value}
              fieldError={errors.botInfo?.boundDocumentId}
            />
          )}
        />
      )}
      <Checkbox
        id={'is-public'}
        {...register('botInfo.isPublic', {required: true})}
      >
        Should this bot be public?
      </Checkbox>
    </section>
  );
}

export default BotInfo;
