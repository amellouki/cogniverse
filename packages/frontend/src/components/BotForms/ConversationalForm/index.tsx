import React, {FunctionComponent} from 'react';
import BotInfo from "../components/BotInfo";
import ConversationalConfig from "../components/ConversationalConfig";
import Integration from "../components/Integration";
import {NewBot} from "@my-monorepo/shared";
import {useRouter} from "next/router";
import Steps from "../components/Steps";
import Portal from "@/components/Portal";
import {UPDATE_INSIGHT, UPDATE_STEPS} from "@/components/BotForms/RCForm/constants";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormCTAs from "../components/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {InputType} from "./form.schema";
import schema from "./form.schema";
import {STEPS, INSIGHT} from "./constants";
import styles from "./styles.module.scss";
import {getNewBot} from "./helpers";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
  loading?: boolean
}

const ConversationalSteps: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.input
  });

  const onSubmit = useSubmit({
    onSubmit: (data: InputType) => props.onSubmit(getNewBot(data))
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formWrapper}>
      <Portal target={'create-bot-right-sidebar'}>
        <Steps
          currentStep={NaN}
          steps={props.update ? UPDATE_STEPS : STEPS}
          insight={props.update ? UPDATE_INSIGHT : INSIGHT}
        />
      </Portal>
      <BotInfo
        form={form as any}
      />
      <ConversationalConfig
        form={form as any}
      />
      <Integration
        form={form as any}
      />
      <FormCTAs onBack={router.back} />
    </form>
  )
}

export default ConversationalSteps;
