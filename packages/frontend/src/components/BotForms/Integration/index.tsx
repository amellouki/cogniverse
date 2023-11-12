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
import DiscordIcon from "@/components/icons/Discord.icon";
import SlackIcon from "@/components/icons/Slack.icon";

type Props = BotFormProps2<InputType>

const OPTIONS = [
  {
    label: (
      <span className="flex items-center gap-2">
        <DiscordIcon width={"24px"} height={"24px"}/>
        <span>Discord</span>
      </span>
    ),
    value: 'discord'
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <SlackIcon width={"24px"} height={"24px"}/>
        <span>Slack</span>
      </span>
    ),
    value: 'slack'
  }
]

const RetrievalConversational: FunctionComponent<Props> = (props) => {
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: props.initValue,
  })

  const onSubmit = useSubmit(props)

  const [selectedTab, setSelectedTab] = React.useState<string | null>('discord')

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.CreateBot}>
      <div className={'self-center'}>
        <ToggleButtonGroup options={OPTIONS} onChange={setSelectedTab} selected={selectedTab} />
      </div>
      <Discord {...form} style={{display: selectedTab !== 'discord' ? 'none' : undefined}} />
      <Slack {...form} style={{display: selectedTab !== 'slack' ? 'none' : undefined}} />
      <FormCTAs onBack={props.back} />
    </form>
  );
}

export default RetrievalConversational;
