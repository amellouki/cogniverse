import React, {FunctionComponent} from 'react';
import RetrievalConversationalConfig from "../components/RCConfig";
import Integration from "../components/Integration";
import {NewBot} from "@my-monorepo/shared";
import Steps from "../components/Steps";

import Portal from "@/components/Portal";
import {STEPS, INSIGHT, UPDATE_STEPS, UPDATE_INSIGHT} from "./constants";
import styles from "@/components/BotForms/ConversationalForm/styles.module.scss";
import RCBotInfo from "../components/RCBotInfo";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormCTAs from "../components/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {useRouter} from "next/router";
import schema, {InputType} from "./form.schema";
import {getNewBot} from "./helpers";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
  loading?: boolean
}

const RCForm: FunctionComponent<Props> = (props) => {
  const router = useRouter();

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.input
  })

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
      <RCBotInfo
        form={form as any}
      />
      <RetrievalConversationalConfig
        form={form as any}
      />
      <Integration
        form={form as any}
      />
      <FormCTAs onBack={router.back} />
    </form>
  )
}

export default RCForm;
