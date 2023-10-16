import React, {FunctionComponent} from 'react';
import styles from "@/components/BotForms/RetrievalConversational/styles.module.scss";
import Button from "@/components/Button";

const FormCTAs: FunctionComponent = (props) => {
  return (
    <section className={styles.actions}>
      <Button type={'submit'} variant={'outlined'} id={'back'}>
        Back
      </Button>
      <Button type={'submit'} id={'next'}>
        Next
      </Button>
    </section>
  );
}

export default FormCTAs;
