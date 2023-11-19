import React, {FunctionComponent} from 'react';
import {InputType as BotInfoType} from "@/components/BotForms/BotInfo/form.schema";
import {InputType as ConfigType} from "@/components/BotForms/AgentConfig/form.schema";
import Portal from "@/components/Portal";
import Steps from "@/components/BotForms/Steps";
import {NewBot, SomethingWentWrongException} from "@my-monorepo/shared";
import BotInfo from "@/components/BotForms/BotInfo";
import ReviewBotDetails from "@/components/BotForms/ReviewBotDetails";
import {useRouter} from "next/router";
import AgentConfig from "@/components/BotForms/AgentConfig";
import {getNewBot} from "./helpers";
import schema, {InputType} from "./form.schema";
import {INSIGHT, STEPS, UPDATE_INSIGHT, UPDATE_STEPS} from "./constants";
import styles from "./styles.module.scss";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
  loading?: boolean
}


const Agent: FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [botInfo, setBotInfo] = React.useState<BotInfoType | undefined>(props.input?.botInfo);
  const [botConfig, setBotConfig] = React.useState<ConfigType | undefined>(props.input?.botConfig);

  const form = () => {
    const getData = () => {
      const parsed = schema.safeParse({
        botInfo,
        botConfig,
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
    console.log('step', step)
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
        return <AgentConfig
          onSubmit={(data) => {
            setBotConfig(data)
          }}
          initValue={botConfig}
          next={() => setStep(2)}
          back={() => setStep(0)}
        />
      case 2:
        return (
          <div>
            <ReviewBotDetails
              data={getData()}
              onNext={onSubmit}
              onBack={() => setStep(1)}
              loading={props.loading}
            />
          </div>
        )
      default:
        return <div>Unknown</div>
        // throw new SomethingWentWrongException('Unknown step');
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

export default Agent;
