import React, { FC } from 'react'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'
import styles from './styles.module.scss'
import clsx from "clsx";

type QueryFormProps = {
  onSubmit: (query: string) => void;
  className?: string;
}

const QueryForm: FC<QueryFormProps> = ({ onSubmit, className }) => {
  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const inputElement = form.elements.namedItem(
          "query-field"
        ) as HTMLInputElement;
        onSubmit(inputElement.value);
      }}
    >
      <TextInput id={"query-field"} className={styles.fillRest} />
      <Button type="submit">Send</Button>
    </form>
  )
}

export default QueryForm
