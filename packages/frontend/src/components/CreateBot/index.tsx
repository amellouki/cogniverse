import React, {FunctionComponent, useRef} from 'react';
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import SelectOption from "@/types/SelectOption";
import RetrievalConversational from "../BotForms/RetrievalConversational";
import {BOTS_OPTIONS} from "@/constants";
import Conversational from "../BotForms/Conversational";
import styles from './styles.module.scss';
import useCreateBot from "@/hooks/bot-mangement/use-create-bot.hook";
import {NewBot} from "@my-monorepo/shared";
import {MutableResetRef, ResetFunction} from "@/types/MutableResetRef";

const CreateBot: FunctionComponent = () => {
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectOption | undefined | null>(null);
  const resetRef = useRef<ResetFunction>();

  const mutation = useCreateBot(() => {
    resetRef.current?.();
  })

  const onSubmit = (data: NewBot) => {
    mutation.mutate(data);
  }

  return (
    <div className={styles.CreateBot}>
      <h2 className={styles.formTitle}>Create a new bot</h2>
      <WrappedSelect
        options={BOTS_OPTIONS}
        label={'Select Bot Type'}
        placeholder={'Select...'}
        selected={selectedOption}
        onChange={setSelectedOption}
        id={'agent-type'}
      />
      {selectedOption && renderForm(selectedOption.value, resetRef, onSubmit)}
    </div>
  );
}

function renderForm(formType: string, ref: MutableResetRef, onSubmit: (data: NewBot) => void) {
  switch (formType) {
    case 'rc':
      return <RetrievalConversational resetRef={ref} onSubmit={onSubmit} />
    case 'conversational':
      return <Conversational resetRef={ref} onSubmit={onSubmit} />
    default:
      return <div>Unknown</div>
  }
}

export default CreateBot;
