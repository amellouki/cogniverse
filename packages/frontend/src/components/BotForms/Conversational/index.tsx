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
import SimpleColorPicker from "@/components/BaseFormFields/SimpleColorPicker";
import {Planet} from "react-kawaii";
import styles from '../RetrievalConversational/styles.module.scss';
import {COLOR_OPTIONS} from "@/constants";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import DiscordIcon from "@/components/icons/Discord.icon";
import {BotFormProps} from "@/components/BotForms/BotFormProps";

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
    if(!props.resetRef) return;
    props.resetRef.current = reset
  }, [props.resetRef, reset])

  const onSubmit: SubmitHandler<InputType> = (data) => props.onSubmit(getNewBot(data))

  const isCustomPrompt = watch('isCustomPrompt');
  const integrateWithDiscord = watch('integrateWithDiscord');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
      <Controller
        render={({ field: {onChange, value}}) => (
          <section className={styles.avatarSelection}>
            <SimpleColorPicker onChange={onChange} options={COLOR_OPTIONS} selected={value} legend={'Pick color'} error={errors.color} />
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
        <FormFieldWrapper
          htmlFor={'discord-channel-id'}
          label={'Discord channel ID'}
          fieldError={errors.discordChannelId}
        >
          <TextInput
            id={'discord-channel-id'}
            placeholder={'Provide your Discord channel ID'}
            hasError={!!errors.discordChannelId}
            {...register('discordChannelId', {required: true})}
          />
        </FormFieldWrapper>
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
