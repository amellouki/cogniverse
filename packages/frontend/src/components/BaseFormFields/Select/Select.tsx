import React, {FunctionComponent} from 'react';
import {useSelect} from "downshift";
import SelectView from "@/components/BaseFormFields/Select/SelectView";
import {SelectProps} from "./types";

const Select: FunctionComponent<SelectProps> = ({
  selected,
  onChange,
  id,
  ...props
}) => {
  const select = useSelect({
    items: props.options,
    itemToString: item => item?.label || '',
    onSelectedItemChange: ({selectedItem}) => onChange(selectedItem),
    selectedItem: selected,
    id,
  })
  return (
    <SelectView select={select} {...props} />
  );
}

export default Select;
