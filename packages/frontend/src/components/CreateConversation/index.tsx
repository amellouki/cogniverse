import React, {FunctionComponent} from 'react';
import WrappedSelect from "@/components/BaseFormFields/Select/WrappedSelect";
import RetrievalConversation from "@/components/CreateConversation/RetrievalConversation";
import styles from './styles.module.scss';
import SelectOption from "@/types/SelectOption";


const ConversationOptions: SelectOption[] = [
  { value: 'retrieval', label: 'Retrieval' },
  { value: 'companion', label: 'Companion' },
  { value: 'agent', label: 'Agent' },
]

const CreateConversation: FunctionComponent = () => {
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectOption | undefined | null>(null);
  return (
    <div className={styles.CreateConversation}>
      <h2 className={styles.formTitle}>Create a new conversation</h2>
      <WrappedSelect
        options={ConversationOptions}
        label={'Select Conversation Type'}
        placeholder={'Select...'}
        selected={selectedOption}
        onChange={setSelectedOption}
        id={'conversation-type'}
      />
      {selectedOption && renderForm(selectedOption.value)}
    </div>
  );
}

function renderForm(formType: string) {
  switch (formType) {
    case 'retrieval':
      return <RetrievalConversation/>
    case 'companion':
      return <div>Working on it...</div>
    case 'agent':
      return <div>Working on it...</div>
    default:
      return <div>Unknown</div>
  }
}

export default CreateConversation;
