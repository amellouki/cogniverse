import React, {FunctionComponent} from 'react';
import LabelValuePair from "@/types/LabelValuePair";
import useOptionsSelection from '@/hooks/use-options-selection.hook';
import clsx from "clsx";
import styles from './styles.module.scss'
import DocumentIcon from "@/components/DocumentIcon";

type Props = {
  options: LabelValuePair[];
  checkedOptions: LabelValuePair[];
  onChange: (option: LabelValuePair[]) => void
  multiSelection?: boolean
  renderOptionContent: (option: LabelValuePair, selected: boolean) => React.ReactNode
}

const ControlledOptionSelection: FunctionComponent<Props> = ({
   options,
   checkedOptions,
   onChange,
   multiSelection,
   renderOptionContent
}) => {
  const {isChecked, handleChange} = useOptionsSelection(checkedOptions, onChange, !multiSelection);

  return (
    <div className={styles.OptionSelection}>
      {options.map((option) => (
          <button
            key={option.value}
            type={'button'}
            className={clsx(styles.option, isChecked(option.value) && styles.selected)}
            onClick={() => handleChange(option, !isChecked(option.value))}
          >
            {renderOptionContent(option, isChecked(option.value))}
          </button>
        )
      )}
    </div>
  );
}

export default ControlledOptionSelection;
