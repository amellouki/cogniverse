import React, {FunctionComponent} from 'react';
import {UseFormReturn} from "react-hook-form";
import {InputType} from "./form.schema";
import styles from '../RCConfig/styles.module.scss';
import ToggleButtonGroup from "@/components/BaseFormFields/ToggleButtonGroup";
import Discord from "./Discord";
import Slack from "./Slack";
import DiscordIcon from "@/components/icons/Discord.icon";
import SlackIcon from "@/components/icons/Slack.icon";

type Props = {
  form: UseFormReturn<{
    integration: InputType
  }>
}

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
  const form = props.form;

  const [selectedTab, setSelectedTab] = React.useState<string | null>('discord')

  return (
    <section className={styles.CreateBot}>
      <div className={'self-center'}>
        <ToggleButtonGroup options={OPTIONS} onChange={setSelectedTab} selected={selectedTab} />
      </div>
      <Discord {...form} style={{display: selectedTab !== 'discord' ? 'none' : undefined}} />
      <Slack {...form} style={{display: selectedTab !== 'slack' ? 'none' : undefined}} />
    </section>
  );
}

export default RetrievalConversational;
