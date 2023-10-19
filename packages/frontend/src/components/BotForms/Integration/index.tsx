import React, {FunctionComponent} from 'react';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import schema, {InputType} from "./form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import DiscordIcon from "@/components/icons/Discord.icon";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import FormCTAs from "@/components/BotForms/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import styles from '../RCConfig/styles.module.scss';

type Props = BotFormProps2<InputType>

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

  const integrateWithDiscord = watch('integrateWithDiscord');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateBot}>
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
          render={({field: {onChange, value}}) => (
            <ChipsInput
              value={value || []}
              onChange={onChange}
              fieldError={errors.discordChannelIds}
              label={'Allowed discord channel ids'}
              id={'discord-channel-ids'}
              placeholder={'Provide a discord channel id'}
            />
          )}
        />
      )}
      <FormCTAs />
    </form>
  );
}

export default RetrievalConversational;
