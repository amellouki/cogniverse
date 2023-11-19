import React, {FunctionComponent, useRef} from 'react';
import useCreateBot from "@/hooks/bot-mangement/use-create-bot.hook";
import {BotType, NewBot} from "@my-monorepo/shared";
import {MutableResetRef, ResetFunction} from "@/types/MutableResetRef";
import ConversationalSteps from "../BotForms/form-wizards/ConversationalSteps";
import RCSteps from "@/components/BotForms/form-wizards/RCSteps";
import styles from './styles.module.scss';
import {useRouter} from "next/router";
import Agent from "@/components/BotForms/form-wizards/Agent";

type Props = {
  botType: BotType
}

const CreateBot: FunctionComponent<Props> = ({
  botType
}) => {
  const router = useRouter();

  const botCreation = useCreateBot(() => {
    router.push('/bots').then(() => {
      console.log('successfully redirected to bots page')
    })
  })

  const onSubmit = botCreation.mutate;

  return renderForm(botType, botCreation.status === 'loading', onSubmit);
}

function renderForm(formType: string, loading: boolean, onSubmit: (data: NewBot) => void) {
  switch (formType) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RCSteps onSubmit={onSubmit} />
    case BotType.CONVERSATIONAL:
      return <ConversationalSteps onSubmit={onSubmit} />
    case BotType.AGENT:
      return <Agent onSubmit={onSubmit} />
    default:
      return <div>Unknown</div>
  }
}

export default CreateBot;
