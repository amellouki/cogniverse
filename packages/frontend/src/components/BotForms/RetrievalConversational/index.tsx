import React, {FunctionComponent, MutableRefObject, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useCreateBot from "@/hooks/bot-mangement/use-create-bot.hook";
import ControlledToggleButton from "../../BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";
import Prompt from "@/components/BaseFormFields/Prompt";
import schema, {InputType} from "./form.schema";
import {getNewBot} from "./helpers";
import {CLM_PROMPT_PLACEHOLDERS, RLM_PROMPT_PLACEHOLDERS} from "./contants";
import SimpleColorPicker from "@/components/BaseFormFields/SimpleColorPicker";
import {Planet} from "react-kawaii";
import EmbeddedDocumentsSelector from "@/components/EmbeddedDocumentsSelector";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import DiscordIcon from "@/components/icons/Discord.icon";
import styles from './styles.module.scss';
import {BotFormProps} from "@/components/BotForms/BotFormProps";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";

const COLOR_OPTIONS = [
  {label: 'Weldon Blue', value: '#749da1'},
  {label: 'Sage', value: '#b4be89'},
  {label: 'Gold', value: '#e0be99'},
  {label: 'Ruddy Pink', value: '#eb9191'},
];

type Props = BotFormProps & {
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

  useEffect(() => {
    if (!props.resetRef) return;
    props.resetRef.current = reset;
  }, [props.resetRef, reset])

  const onSubmit: SubmitHandler<InputType> = (data) => props.onSubmit(getNewBot(data))

  const isRLMCustomPrompt = watch('isRLMCustomPrompt');
  const isCLMCustomPrompt = watch('isCLMCustomPrompt');
  const isBoundToDocument = watch('isBoundToDocument');
  const integrateWithDiscord = watch('integrateWithDiscord');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <Controller
        render={({field: {onChange, value}}) => (
          <section className={styles.avatarSelection}>
            <SimpleColorPicker onChange={onChange} options={COLOR_OPTIONS} selected={value} legend={'Pick the bot\'s look'}
                               error={errors.color}/>
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
      <Checkbox
        id={'is-public'}
        {...register('isPublic', {required: true})}
      >
        Should this bot be public?
      </Checkbox>
      <Checkbox
        id={'integrate-with-discord'}
        {...register('integrateWithDiscord', {required: true})}
      >
        <span className="flex items-center gap-2"><DiscordIcon width={"24px"} height={"24px"} /><span>Integrate with Discord?</span></span>
      </Checkbox>
      {integrateWithDiscord && (
        <Controller
          control={control}
          name={'discordChannelIds'}
          defaultValue={[]}
          render={({field: {onChange, value}}) => {
            return (
              <ChipsInput
                value={value || []}
                onChange={onChange}
                fieldError={errors.discordChannelIds}
              />
            )
          }}
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