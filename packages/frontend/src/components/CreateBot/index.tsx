import React, {FunctionComponent, useRef} from 'react';
import RetrievalConversational from "../BotForms/RetrievalConversational";
import useCreateBot from "@/hooks/bot-mangement/use-create-bot.hook";
import {BotType, NewBot} from "@my-monorepo/shared";
import {MutableResetRef, ResetFunction} from "@/types/MutableResetRef";
import ConversationalSteps from "@/components/BotForms/ConversationalSteps";
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

  return (
    <div className={styles.CreateBot}>
      {renderForm(botType, resetRef, onSubmit)}
    </div>
  );
}

function renderForm(formType: string, ref: MutableResetRef, onSubmit: (data: NewBot) => void) {
  switch (formType) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RetrievalConversational resetRef={ref} onSubmit={onSubmit} />
    case BotType.CONVERSATIONAL:
      return <ConversationalSteps onSubmit={onSubmit} />
    default:
      return <div>Unknown</div>
  }
}

export default CreateBot;
