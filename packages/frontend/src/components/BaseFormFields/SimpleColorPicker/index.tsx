import React, {FunctionComponent} from 'react';
import {FieldError} from "react-hook-form";
import clsx from "clsx";
import LabelValuePair from "@/types/LabelValuePair";
import wrapperStyles from '@/components/FormFieldWrapper/styles.module.scss';
import styles from './styles.module.scss';

type Props = {
  selected?: string;
  onChange: (value: string) => void;
  options: LabelValuePair[];
  legend: string;
  error?: FieldError;
}

const SimpleColorPicker: FunctionComponent<Props> = (props) => {

  return (
    <fieldset className={styles.SimpleColorPicker}>
      <legend className={wrapperStyles.LabelText}>{props.legend}</legend>
      <section className={styles.options}>
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
          })
        }
      </section>
      {props.error && <p className={wrapperStyles.Error} role="alert"> {props.error.message} </p>}
    </fieldset>
  );
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
