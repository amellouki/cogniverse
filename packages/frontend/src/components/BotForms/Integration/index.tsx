import React, {FunctionComponent} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import schema, {InputType} from "./form.schema";
import FormCTAs from "@/components/BotForms/FormCTAs";
import useSubmit from "@/components/BotForms/use-submit.hook";
import {BotFormProps2} from "@/components/BotForms/BotFormProps";
import styles from '../RCConfig/styles.module.scss';
import ToggleButtonGroup from "@/components/BaseFormFields/ToggleButtonGroup";
import Discord from "@/components/BotForms/Integration/Discord";
import Slack from "@/components/BotForms/Integration/Slack";

type Props = BotFormProps2<InputType>

const OPTIONS = ['Discord', 'Slack']

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.initValue,
  })

  const onSubmit = useSubmit(props)

  const [selectedTab, setSelectedTab] = React.useState<string | null>(null)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.CreateBot}>
      <ToggleButtonGroup options={OPTIONS} onChange={setSelectedTab} selected={selectedTab} />
      <Discord {...form} style={{display: selectedTab !== 'Discord' ? 'none' : undefined}} />
      <Slack {...form} style={{display: selectedTab !== 'Slack' ? 'none' : undefined}} />
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default RetrievalConversational;
