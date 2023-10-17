import React, {FunctionComponent} from 'react';
import RetrievalConversationalConfig from "../../RCConfig";
import Integration from "@/components/BotForms/Integration";
import {InputType as BotInfoType} from "@/components/BotForms/RCBotInfo/form.schema"
import {InputType as ConfigType} from "@/components/BotForms/RCConfig/form.schema";
import {InputType as IntegrationType} from "@/components/BotForms/Integration/form.schema";
import schema, {InputType} from "./form.schema";
import {getNewBot} from "@/components/BotForms/form-wizards/RCSteps/helpers";
import {NewBot} from "@my-monorepo/shared";
import {useRouter} from "next/router";
import Steps from "@/components/BotForms/Steps";
import Portal from "@/components/Portal";
import {STEPS, INSIGHT} from "@/components/BotForms/form-wizards/RCSteps/constants";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import RCBotInfo from "@/components/BotForms/RCBotInfo";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
}

const ConversationalSteps: FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [botInfo, setBotInfo] = React.useState<BotInfoType | undefined>(props.input?.botInfo);
  const [botConfig, setBotConfig] = React.useState<ConfigType | undefined>(props.input?.botConfig);
  const [integration, setIntegration] = React.useState<IntegrationType | undefined>(props.input?.integration);


  const form = () => {
    const onSubmit = () => {
      const parsed = schema.safeParse({
        botInfo,
        botConfig,
        integration,
      })

      if (parsed.success) {
        props.onSubmit(getNewBot(parsed.data))
      } else {
        console.log('Failed to parse')
        console.log(parsed.error)
      }
    }
    switch (step) {
      case 0:
        return <RCBotInfo
          onSubmit={(data) => {
            setBotInfo(data)
          }}
          initValue={botInfo}
          next={() => setStep(1)}
          back={() => router.push('/bots')}
        />
      case 1:
        return <RetrievalConversationalConfig
          onSubmit={(data) => {
            setBotConfig(data)
          }}
          initValue={botConfig}
          next={() => setStep(2)}
          back={() => setStep(0)}
        />
      case 2:
        return <Integration
          onSubmit={(data) => {
            setIntegration(data)
          }}
          initValue={integration}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      case 3:
        return <div>Result <Button type={'submit'} onClick={onSubmit}>Submit</Button></div>
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <Portal target={'create-bot-right-sidebar'}>
        <Steps
          currentStep={step}
          steps={STEPS}
          insight={INSIGHT}
        />
      </Portal>
      <h2 className={styles.formTitle}>{STEPS[step]?.title}</h2>
      <span className={styles.description}>{STEPS[step]?.description}</span>
      {form()}
    </>
  )
}

export default ConversationalSteps;
