import React, {FunctionComponent} from 'react';
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import SelectOption from "@/types/SelectOption";
import RetrievalConversational from "@/components/CreateAgent/RetrievalConversational";
import styles from './styles.module.scss';

const agentOptions: SelectOption[] = [
  { value: 'rc', label: 'PDF Retrieval Conversational' },
  { value: 'simpleAgent', label: 'Simple Agent' },
]

const CreateAgent: FunctionComponent = () => {
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectOption | undefined | null>(null);
  return (
    <div className={styles.CreateConversation}>
      <h2 className={styles.formTitle}>Create a new agent</h2>
      <WrappedSelect
        options={agentOptions}
        label={'Select Agent Type'}
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
    case 'simpleAgent':
      return <div>Working on it...</div>
    default:
      return <div>Unknown</div>
  }
}

export default CreateAgent;
