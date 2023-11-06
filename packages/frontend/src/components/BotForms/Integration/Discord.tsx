import React, {CSSProperties, FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "@/components/BotForms/Integration/form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import DiscordIcon from "@/components/icons/Discord.icon";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import styles from "@/components/BotForms/Integration/styles.module.scss";

type Props = UseFormReturn<InputType> & {
  style?: CSSProperties;
}

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
      <Checkbox
        id={'integrate-with-discord'}
        {...register('integrateWithDiscord', {required: true})}
      >
        <span className="flex items-center gap-2"><DiscordIcon width={"24px"} height={"24px"}/><span>Integrate with Discord?</span></span>
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
