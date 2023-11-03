import React, {FunctionComponent} from 'react';
import styles from "@/components/ManageAccountKeys/styles.module.scss";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";
import {useForm} from "react-hook-form";
import {useUpdateAccountKeys} from "@/hooks/account/use-update-account-keys.hook";
import {AccountKeys} from "@my-monorepo/shared";

type InputType = {
  field: string
}


type Props = {
  id: keyof AccountKeys
  label: string
  value?: string
  placeholder?: string
  uid: string
}

const Key: FunctionComponent<Props> = ({
  id,
  value,
  label,
  placeholder,
  uid,
                                       }) => {

  const mutation = useUpdateAccountKeys(uid);

  const {
    register,
    handleSubmit,
    reset,
    formState: {dirtyFields}
  } = useForm<InputType>({
    defaultValues: {
      field: value ?? ''
    }
  })

  const onSubmit = (data: InputType) => {
    mutation.mutate({
      [id]: data.field
    })
    reset()
  }

  return (
    <form className={styles.ManageAccountKeys} onSubmit={handleSubmit(onSubmit)}>
      <FormFieldWrapper
        htmlFor={id}
        label={label}
      >
        <TextInput
          id={id}
          placeholder={placeholder}
          {...register('field')}
          autoComplete={'off'}
        />
      </FormFieldWrapper>
      <Button type={'submit'} disabled={!dirtyFields.field}>Update</Button>
      <Button type={'button'} variant={'danger'} onClick={revoke}>Revoke</Button>
    </form>
  );

  function revoke() {
    mutation.mutate({
      [id]: '',
    })
  }
}

export default Key;
