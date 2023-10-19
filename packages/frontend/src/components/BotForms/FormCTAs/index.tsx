import React, {FunctionComponent} from 'react';
import Button from "@/components/Button";
import styles from "@/components/BotForms/RCConfig/styles.module.scss";

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
