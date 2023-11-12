import React, {FunctionComponent} from 'react';
import styles from './styles.module.scss';
import Button from "@/components/Button";
import {JSXOption} from "@/types/SelectOption";

type Props = {
  options: JSXOption[];
  selected: string | undefined | null;
  onChange: (value: string) => void;
}

const ToggleButtonGroup: FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.ToggleButtonGroup}>
      {
        props.options
          .map(({ label, value }) => (
            <Button
              key={value}
              onClick={() => props.onChange(value)}
              variant={props.selected === value ? 'outlined' : 'primary'}
              className={styles.button}
            >
              {label}
            </Button>
          ))
      }
    </div>);
}

export default ToggleButtonGroup;
