import React, {FunctionComponent, useMemo} from 'react';
import BotInfo from "@/components/BotForms/BotInfo";
import ConversationalConfig from "@/components/BotForms/ConversationalConfig";
import Integration from "@/components/BotForms/Integration";
import {InputType as BotInfoType} from "@/components/BotForms/BotInfo/form.schema"
import {InputType as ConfigType} from "@/components/BotForms/ConversationalConfig/form.schema";
import {InputType as IntegrationType} from "@/components/BotForms/Integration/form.schema";
import schema from "./form.schema";
import {getNewBot} from "@/components/BotForms/ConversationalSteps/helpers";
import {NewBot} from "@my-monorepo/shared";
import {useRouter} from "next/router";
import Steps from "@/components/BotForms/Steps";
import Portal from "@/components/Portal";
import {STEPS, INSIGHT} from "@/components/BotForms/ConversationalSteps/constants";
import styles from "./styles.module.scss";

type Props = {
  onSubmit: (data: NewBot) => void
}

const ConversationalSteps: FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [botInfo, setBotInfo] = React.useState<BotInfoType>();
  const [botConfig, setBotConfig] = React.useState<ConfigType>();
  const [integration, setIntegration] = React.useState<IntegrationType>();


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
        return <BotInfo
          onSubmit={(data) => {
            setBotInfo(data)
          }}
          initValue={botInfo}
          next={() => setStep(1)}
          back={() => router.push('/bots')}
        />
      case 1:
        return <ConversationalConfig
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
        return <div>Result <button onClick={onSubmit}>Submit</button></div>
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
