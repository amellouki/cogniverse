import React, {CSSProperties, FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "@/components/BotForms/Integration/form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import SlackIcon from "@/components/icons/Slack.icon";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import styles from './styles.module.scss';

type Props = UseFormReturn<InputType> & {
  style?: CSSProperties;
}

const Slack: FunctionComponent<Props> = ({
  style,
  control,
  register,
  watch,
  formState: {errors}
}) => {
  const integrateWithSlack = watch('integrateWithSlack');

  return (
    <div style={style} className={styles.formContent}>
      <Checkbox
        id={'integrate-with-slack'}
        {...register('integrateWithSlack', {required: true})}
      >
        <span className="flex items-center gap-2"><SlackIcon width={"24px"} height={"24px"}/><span>Integrate with Slack?</span></span>
      </Checkbox>
      {integrateWithSlack && (
        <Controller
          control={control}
          name={'slackChannelIds'}
          defaultValue={[]}
          render={({field: {onChange, value}}) => (
            <ChipsInput
              value={value || []}
              onChange={onChange}
              fieldError={errors.slackChannelIds}
              label={'Allowed Slack channel ids'}
              id={'slack-channel-ids'}
              placeholder={'Provide a slack channel id'}
            />
          )}
        />
      )}
    </div>
  );
}

export default Slack;
