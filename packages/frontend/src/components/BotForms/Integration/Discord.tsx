import React, {CSSProperties, FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "@/components/BotForms/Integration/form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import styles from "@/components/BotForms/Integration/styles.module.scss";
import AppLink from "@/components/AppLink";


type Props = UseFormReturn<InputType> & {
  style?: CSSProperties;
}

const DISCORD_ADD_TO_SERVER_URL = process.env.NEXT_PUBLIC_DISCORD_ADD_TO_SERVER_URL;

const Discord: FunctionComponent<Props> = ({
  style,
  control,
  register,
  watch,
  formState: {errors}
}) => {
  const integrateWithDiscord = watch('integrateWithDiscord');

  return (
    <div style={style} className={styles.formContent}>
      <span>Make sure to <AppLink href={DISCORD_ADD_TO_SERVER_URL!} target={'_blank'}>
        add the app to your server first.
      </AppLink></span>
      <Checkbox
        id={'integrate-with-discord'}
        {...register('integrateWithDiscord', {required: true})}
      >
        <span>Integrate with Discord?</span>
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
    </div>
  );
}

export default Discord;
