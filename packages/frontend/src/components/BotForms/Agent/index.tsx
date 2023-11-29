import React, {FunctionComponent} from 'react';
import Portal from "@/components/Portal";
import Steps from "../components/Steps";
import {NewBot} from "@my-monorepo/shared";
import BotInfo from "../components/BotInfo";
import {useRouter} from "next/router";
import schema, {InputType} from "./form.schema";
import {INSIGHT, STEPS, UPDATE_INSIGHT, UPDATE_STEPS} from "./constants";
import styles from "./styles.module.scss";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import FormCTAs from "@/components/BotForms/components/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {getNewBot} from "./helpers";
import ConversationalConfig from "../components/ConversationalConfig";
import Integration from "@/components/BotForms/components/Integration";

type Props = {
  onSubmit: (data: NewBot) => void
  input?: InputType
  update?: boolean
  loading?: boolean
}

const Agent: FunctionComponent<Props> = (props) => {
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

export default Agent;
