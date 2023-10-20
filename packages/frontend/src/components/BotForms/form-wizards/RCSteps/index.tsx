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
import {STEPS, INSIGHT, UPDATE_STEPS, UPDATE_INSIGHT} from "@/components/BotForms/form-wizards/RCSteps/constants";
import styles from "../ConversationalSteps/styles.module.scss";
import RCBotInfo from "@/components/BotForms/RCBotInfo";
import ReviewBotDetails from "@/components/BotForms/ReviewBotDetails";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
}

const ConversationalSteps: FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [botInfo, setBotInfo] = React.useState<BotInfoType | undefined>(props.input?.botInfo);
  const [botConfig, setBotConfig] = React.useState<ConfigType | undefined>(props.input?.botConfig);
  const [integration, setIntegration] = React.useState<IntegrationType | undefined>(props.input?.integration);


  const form = () => {
    const getData = () => {
      const parsed = schema.safeParse({
        botInfo,
        botConfig,
        integration,
      })

      if (parsed.success) {
        return getNewBot(parsed.data)
      } else {
        throw new Error('Failed to parse')
      }
    }
    const onSubmit = () => {
      props.onSubmit(getData())
    }
    switch (step) {
      case 0:
        return <RCBotInfo
          onSubmit={(data) => {
            setBotInfo(data)
          }}
          initValue={botInfo}
          next={() => setStep(1)}
          back={() => router.back()}
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
        return (
          <ReviewBotDetails
            data={getData()}
            onNext={onSubmit}
            onBack={() => setStep(2)}
          />
        )
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <div className={styles.formWrapper}>
      <Portal target={'create-bot-right-sidebar'}>
        <Steps
          currentStep={step}
          steps={props.update ? UPDATE_STEPS : STEPS}
          insight={props.update ? UPDATE_INSIGHT : INSIGHT}
        />
      </Portal>
      <h2 className={styles.formTitle}>{(props.update ? UPDATE_STEPS : STEPS)[step]?.title}</h2>
      <span className={styles.description}>{(props.update ? UPDATE_STEPS : STEPS)[step]?.description}</span>
      {form()}
    </div>
  )
}

export default ConversationalSteps;
