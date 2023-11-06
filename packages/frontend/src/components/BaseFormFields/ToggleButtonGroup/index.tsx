import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import Button from "@/components/Button";

type Props = {
  options: string[];
  selected: string | undefined | null;
  onChange: (value: string) => void;
}

const ToggleButtonGroup: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.ToggleButtonGroup}>
      {
        props.options
          .map((option) => (
            <Button
              key={option}
              onClick={() => props.onChange(option)}
              variant={props.selected === option ? 'outlined' : 'primary'}
            >
              {option}
            </Button>
          ))
      }
    </div>);
}

export default ToggleButtonGroup;
