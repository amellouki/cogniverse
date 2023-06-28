import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import Textarea from "@/components/BaseFormFields/Textarea";
import ControlledToggleButton from "../BaseFormFields/ControlledToggleButton";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import NewConversation from "@my-monorepo/shared/dist/new-conversation";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/api/create_conversation'


const CreateConversation: FunctionComponent = (props) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient()

  const mutation = useMutation((newConversation: NewConversation) => axios.post(PATH, newConversation), {
    onSuccess: () => {
      formRef.current?.reset();
      queryClient.invalidateQueries('conversations');
    },
  });

  // RLM: Retrieval Language Model
  const [isRLMCustomPrompt, setIsRLMCustomPrompt] = React.useState<boolean>(false)
  // CLM: Conversational Language Model
  const [isCLMCustomPrompt, setIsCLMCustomPrompt] = React.useState<boolean>(false)
  return (
    <form ref={formRef} onSubmit={(e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const titleElement = form.elements.namedItem('conversation-title') as HTMLInputElement;
      const rlmPromptElement = form.elements.namedItem('rlm-prompt') as HTMLInputElement;
      const clmPromptElement = form.elements.namedItem('clm-prompt') as HTMLInputElement;
      const retrievalLanguageModel = rlmPromptElement?.value ? {
        prompt: rlmPromptElement.value,
        name: "Retrieval model",
        type: "retrieval-model",
      } : null
      const conversationModel = clmPromptElement?.value ? {
        prompt: clmPromptElement.value,
        name: "Conversation model",
        type: "conversation-model",
      } : null
      mutation.mutate({
        title: titleElement.value,
        retrievalLanguageModel,
        conversationModel,
      });
    }} className={styles.CreateConversation}>
      <FormFieldWrapper id={'conversation-title'} label={'Conversation title'}>
        <TextInput id={'conversation-title'} placeholder={'Provide conversation title'}/>
      </FormFieldWrapper>
      <div className={styles.ToggleButtonRow}>
        <span>Retrieval model prompt</span>
        <ControlledToggleButton
          id={'rlm'} pressed={isRLMCustomPrompt}
          onToggle={setIsRLMCustomPrompt}
          options={['Default', 'Custom']}
          className={styles.ToggleButton}
        />
      </div>
      {isRLMCustomPrompt && (
        <FormFieldWrapper id={'rlm-prompt'} label={'Retrieval model prompt'}>
          <Textarea id={'rlm-prompt'} placeholder={'Provide retrieval model prompt'}/>
        </FormFieldWrapper>
      )}
      <div className={styles.ToggleButtonRow}>
        <span>Conversational model prompt</span>
        <ControlledToggleButton
          id={'clm'} pressed={isCLMCustomPrompt}
          onToggle={setIsCLMCustomPrompt}
          options={['Default', 'Custom']}
          className={styles.ToggleButton}
        />
      </div>
      {isCLMCustomPrompt && (
        <FormFieldWrapper id={'clm-prompt'} label={'Conversational model prompt'}>
          <Textarea id={'clm-prompt'} placeholder={'Provide conversational model prompt'}/>
        </FormFieldWrapper>
      )}
      <Button type={'submit'} className={styles.SubmitButton}>Create</Button>
    </form>
  );
}

export default CreateConversation;
