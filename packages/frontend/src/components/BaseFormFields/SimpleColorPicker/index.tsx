import React, {ChangeEventHandler, FunctionComponent} from 'react';
import styles from './styles.module.scss';
import useOptionsSelection from "@/hooks/use-options-selection.hook";
import LabelValuePair from "@/types/LabelValuePair";
import clsx from "clsx";

type Props = {
  options: LabelValuePair[];
  selected?: string;
  onChange: (value: string) => void;
}

const SimpleColorPicker: FunctionComponent<Props> = (props) => {

  return (<div className={styles.SimpleColorPicker}>
    {
      props.options.map((option, index) => {
      const checked = option.value === props.selected;
      return (
        <React.Fragment key={index}>
          {ColorOption('color', option.value, (newValue) => {
            props.onChange(newValue)
          }, checked)}
        </React.Fragment>
      );
    })}
  </div>);
}

const ColorOption = (name: string, color: string, onChange: (selected: string) => void, checked: boolean) => {
  return (
    <label style={{backgroundColor: color}} className={clsx(styles.ColorOption, checked && styles.checked)}>
      <input
        type="radio"
        name={name}
        value={color}
        checked={checked}
        onChange={() => onChange(color)}
        className={styles.input}
      />
      <span />
    </label>
  );
}

export default SimpleColorPicker;
