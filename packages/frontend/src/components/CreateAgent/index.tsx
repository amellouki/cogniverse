import React, {FunctionComponent} from 'react';
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import SelectOption from "@/types/SelectOption";
import RetrievalConversational from "@/components/CreateAgent/RetrievalConversational";
import styles from './styles.module.scss';
import {AGENT_OPTIONS} from "@/constants";

const CreateBot: FunctionComponent = () => {
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectOption | undefined | null>(null);
  return (
    <div className={styles.CreateConversation}>
      <h2 className={styles.formTitle}>Create a new agent</h2>
      <WrappedSelect
        options={AGENT_OPTIONS}
        label={'Select Bot Type'}
        placeholder={'Select...'}
        selected={selectedOption}
        onChange={setSelectedOption}
        id={'agent-type'}
      />
      {selectedOption && renderForm(selectedOption.value)}
    </div>
  );
}

function renderForm(formType: string) {
  switch (formType) {
    case 'rc':
      return <RetrievalConversational />
    case 'conversational':
      return <div>Working on it...</div>
    default:
      return <div>Unknown</div>
  }
}

export default CreateBot;
