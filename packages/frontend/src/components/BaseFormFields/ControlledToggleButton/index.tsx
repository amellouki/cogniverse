import React, {FunctionComponent, useCallback, useEffect} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";

type Props = {
  id: string;
  pressed: boolean;
  onToggle: (pressed: boolean) => void;
  options: [string, string];
  className?: string
}

const ControlledToggleButton: FunctionComponent<Props> = ({
  id,
  pressed,
  onToggle,
  options,
  className
  }) => {
  return (
    <label className={clsx(styles.ControlledToggleButton, pressed && styles.pressed, className)} htmlFor={id}>
      <span>{options[0]}</span>
      <div className={styles.wrapper}>
        <input
          id={id}
          type={'button'}
          name={id}
          value={pressed.toString()}
          onClick={(e) => {
            onToggle(!pressed)
          }}/>
      </div>
      <span>{options[1]}</span>
    </label>
  );
}

export default ControlledToggleButton;
