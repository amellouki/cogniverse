import React, {FunctionComponent, useRef} from 'react';
import useCreateBot from "@/hooks/bot-mangement/use-create-bot.hook";
import {BotType, NewBot} from "@my-monorepo/shared";
import {MutableResetRef, ResetFunction} from "@/types/MutableResetRef";
import ConversationalSteps from "../BotForms/form-wizards/ConversationalSteps";
import RCSteps from "@/components/BotForms/form-wizards/RCSteps";
import styles from './styles.module.scss';

type Props = {
  botType: BotType
}

const CreateBot: FunctionComponent<Props> = ({
  botType
}) => {
  const resetRef = useRef<ResetFunction>();

  const botCreation = useCreateBot(() => {
    resetRef.current?.();
  })

  const onSubmit = botCreation.mutate

  return renderForm(botType, resetRef, onSubmit);
}

function renderForm(formType: string, ref: MutableResetRef, onSubmit: (data: NewBot) => void) {
  switch (formType) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RCSteps onSubmit={onSubmit} />
    case BotType.CONVERSATIONAL:
      return <ConversationalSteps onSubmit={onSubmit} />
    default:
      return <div>Unknown</div>
  }
}

export default CreateBot;
