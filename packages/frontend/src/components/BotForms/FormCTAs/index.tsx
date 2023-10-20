import React, {FunctionComponent} from 'react';
import Button from "@/components/Button";
import styles from "@/components/BotForms/RCConfig/styles.module.scss";

type Props = {
  onNext?: () => void
  onBack?: () => void
  forwardLabel?: string
  backLabel?: string
}

const FormCTAs: FunctionComponent<Props> = ({
  onNext,
  onBack,
  forwardLabel,
  backLabel,
                                            }) => {
  return (
    <section className={styles.actions}>
      <Button onClick={onBack} type={onBack ? 'button' : 'submit'} variant={'outlined'} id={'back'}>
        {backLabel || 'Back'}
      </Button>
      <Button onClick={onNext} type={onNext ? 'button' : 'submit'} id={'next'}>
        {forwardLabel || 'Next'}
      </Button>
    </section>
  );
}

export default FormCTAs;
