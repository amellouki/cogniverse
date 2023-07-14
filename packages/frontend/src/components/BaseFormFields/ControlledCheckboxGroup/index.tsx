import React, {FunctionComponent} from 'react';
import Checkbox from "@/components/BaseFormFields/Checkbox";
import LabelValuePair from "@/types/LabelValuePair";
import useOptionsChecking from '@/hooks/use-options-checking.hook';
import styles from './styles.module.scss'

type Props = {
  options: LabelValuePair[];
  checkedOptions: LabelValuePair[];
  onChange: (option: LabelValuePair[]) => void
}

const ControlledCheckboxGroup: FunctionComponent<Props> = ({options, checkedOptions, onChange}) => {
  const {isChecked, handleChange} = useOptionsChecking(checkedOptions, onChange);

  return (
    <div className={styles.CheckboxGroup}>
      {options.map((option) => (
        <Checkbox
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked;
            handleChange(option, checked)
          }}
          checked={isChecked(option)} key={option.value} id={option.value}
        >
          {option.label}
        </Checkbox>
        )
      )}
    </div>
  );
}

export default ControlledCheckboxGroup;
