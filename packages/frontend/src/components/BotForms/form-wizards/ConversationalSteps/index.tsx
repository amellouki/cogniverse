import React, {FunctionComponent} from 'react';
import BotInfo from "@/components/BotForms/BotInfo";
import ConversationalConfig from "@/components/BotForms/ConversationalConfig";
import Integration from "@/components/BotForms/Integration";
import {InputType as BotInfoType} from "@/components/BotForms/BotInfo/form.schema"
import {InputType as ConfigType} from "@/components/BotForms/ConversationalConfig/form.schema";
import {InputType as IntegrationType} from "@/components/BotForms/Integration/form.schema";
import schema from "./form.schema";
import {getNewBot} from "@/components/BotForms/form-wizards/ConversationalSteps/helpers";
import {NewBot, SomethingWentWrongException} from "@my-monorepo/shared";
import {useRouter} from "next/router";
import Steps from "@/components/BotForms/Steps";
import Portal from "@/components/Portal";
import {STEPS, INSIGHT} from "@/components/BotForms/form-wizards/ConversationalSteps/constants";
import styles from "./styles.module.scss";
import {InputType} from "@/components/BotForms/form-wizards/ConversationalSteps/form.schema";
import ReviewBotDetails from "@/components/BotForms/ReviewBotDetails";
import {UPDATE_INSIGHT, UPDATE_STEPS} from "@/components/BotForms/form-wizards/RCSteps/constants";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
  loading?: boolean
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
        throw new SomethingWentWrongException('Failed to parse')
      }
    }
    const onSubmit = () => {
      props.onSubmit(getData())
    }
    switch (step) {
      case 0:
        return <BotInfo
          onSubmit={(data) => {
            setBotInfo(data)
          }}
          initValue={botInfo}
          next={() => setStep(1)}
          back={() => router.back()}
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
        return (
          <div>
            <ReviewBotDetails
              data={getData()}
              onNext={onSubmit}
              onBack={() => setStep(2)}
              loading={props.loading}
            />
          </div>
        )
      default:
        throw new SomethingWentWrongException('Unknown step');
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
