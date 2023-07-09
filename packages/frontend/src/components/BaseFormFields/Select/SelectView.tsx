import React, {FunctionComponent, useRef} from 'react';
import {UseSelectReturnValue} from "downshift";
import SelectOption from "@/types/SelectOption";
import clsx from "clsx";
import buttonStyle from "@/components/Button/styles.module.scss";
import styles from './styles.module.scss';
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import Portal from "@/components/Portal";
import useOverlay from "@/components/BaseFormFields/Select/use-overlay.hook";
import {useMounted} from "@/hooks/use-mounted.hook";

const DEFAULT_PLACEHOLDER = 'Select...';

type Props = {
  select: UseSelectReturnValue<SelectOption>
  options: SelectOption[];
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

  const {
    setReferenceElement,
    setPopperElement,
    attributes,
    popperStyles
  } = useOverlay();

  const mounted = useMounted()

  const count = useRef(0)
  console.log(count.current++)

  return (
    <div className={styles.SelectView}>
      <div ref={setReferenceElement}>
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
      </div>

      <Portal target={'select-overlay'}>
        <div ref={setPopperElement} style={{...popperStyles.popper}} {...attributes.popper}>
          <ul {...getMenuProps({}, {suppressRefError: true})} className={clsx(styles.list, !isOpen && styles.hidden)}>
            {isOpen && props.options.map((option, index) => (
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
          </ul>
        </div>
      </Portal>
    </div>
  );
}

export default SelectView;
