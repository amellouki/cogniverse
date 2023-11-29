import React, {CSSProperties, FunctionComponent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import {InputType} from "./form.schema";
import Checkbox from "@/components/BaseFormFields/Checkbox";
import ChipsInput from "@/components/BaseFormFields/ChipsInput";
import styles from './styles.module.scss';

type Props = UseFormReturn<{
  integration: InputType
}> & {
  style?: CSSProperties;
}

const Slack: FunctionComponent<Props> = ({
  style,
  control,
  register,
  watch,
  formState: {errors}
}) => {
  const integrateWithSlack = watch('integration.integrateWithSlack');

  return (
    <div style={style} className={styles.formContent}>
      <Checkbox
        id={'integrate-with-slack'}
        {...register('integration.integrateWithSlack', {required: true})}
      >
        <span>Integrate with Slack?</span>
      </Checkbox>
      {integrateWithSlack && (
        <Controller
          control={control}
          name={'integration.slackChannelIds'}
          defaultValue={[]}
          render={({field: {onChange, value}}) => (
            <ChipsInput
              value={value || []}
              onChange={onChange}
              fieldError={errors.integration?.slackChannelIds}
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
