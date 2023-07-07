import React, {FunctionComponent} from 'react';
import {UseSelectReturnValue} from "downshift";
import {Option} from "./types";
import clsx from "clsx";
import buttonStyle from "@/components/Button/styles.module.scss";
import styles from './styles.module.scss';
import {ChevronDownIcon} from "@heroicons/react/24/solid";

const DEFAULT_PLACEHOLDER = 'Select...';

type Props = {
  select: UseSelectReturnValue<Option>
  options: Option[];
  placeholder?: string;
}

const SelectView: FunctionComponent<Props> = (props) => {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = props.select;

  return (
    <div className={styles.SelectView}>
      <button
        {...getToggleButtonProps()}
        className={clsx(
          styles.SelectButton,
          buttonStyle.button,
          isOpen && styles.open
        )}
      >
        <span>
          {
            selectedItem
            ? selectedItem.label
            : (props.placeholder ?? DEFAULT_PLACEHOLDER)
          }
        </span>
        <ChevronDownIcon className={styles.icon} width={24} height={24}/>
      </button>
      {isOpen &&
      <ul {...getMenuProps} className={styles.list}>
        {props.options.map((option, index) => (
          <li
            key={option.value}
            {...getItemProps({item: option, index})}
            className={clsx(
              selectedItem === option && styles.selected,
              highlightedIndex === index && styles.highlighted,
              styles.option
            )}
          >
            <span>{option.label}</span>
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default SelectView;
