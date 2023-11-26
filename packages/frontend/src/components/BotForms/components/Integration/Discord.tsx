import React, {CSSProperties, FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "./form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import styles from "../../components/Integration/styles.module.scss";
import AppLink from "@/components/AppLink";


type Props = UseFormReturn<{
  integration: InputType
}> & {
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
  const integrateWithDiscord = watch('integration.integrateWithDiscord');

  return (
    <div style={style} className={styles.formContent}>
      <span>Make sure to <AppLink href={DISCORD_ADD_TO_SERVER_URL!} target={'_blank'}>
        add the app to your server first.
      </AppLink></span>
      <Checkbox
        id={'integrate-with-discord'}
        {...register('integration.integrateWithDiscord', {required: true})}
      >
        <span>Integrate with Discord?</span>
      </Checkbox>
      {integrateWithDiscord && (
        <Controller
          control={control}
          name={'integration.discordChannelIds'}
          defaultValue={[]}
          render={({field: {onChange, value}}) => (
            <ChipsInput
              value={value || []}
              onChange={onChange}
              fieldError={errors.integration?.discordChannelIds}
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
