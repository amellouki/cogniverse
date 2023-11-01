import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";

type Props = {
  steps: {title: string, description: string}[]
  insight: string
  currentStep: number
}

const Steps: FunctionComponent<Props> = ({
  steps,
  currentStep,
  insight,
}) => {
  return (
    <section className={styles.Steps}>
      <div className={styles.insight}>
        {insight}
      </div>
      {steps.map((step, index) => (
        <Step
          key={index}
          stepNumber={index + 1}
          title={step.title}
          description={step.description}
          current={index === currentStep}
        />
      ))}
    </section>
  );
}

export default Steps;

type StepItemProps = {
  stepNumber: number
  title: string
  description: string
  current: boolean
}

const Step: FunctionComponent<StepItemProps> = ({
  stepNumber,
  title,
  description,
  current,
}) => {
  return (
    <div className={clsx(styles.step, current && styles.current)}>
      <span className={styles.stepNumber}>{stepNumber}</span>
      <div className={styles.right}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
