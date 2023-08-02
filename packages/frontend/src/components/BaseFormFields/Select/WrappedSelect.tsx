import React, {FunctionComponent} from 'react';
import FormFieldWrapper from "@/components/FormFieldWrapper";
import {SelectProps} from "./types";
import {useSelect} from "downshift";
import SelectView from "@/components/BaseFormFields/Select/SelectView";

type Props = SelectProps & {
  label: string;
}

const WrappedSelect: FunctionComponent<Props> = ({
  label,
  selected,
  onChange,
  id,
  className,
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
    <FormFieldWrapper label={label} className={className} {...select.getLabelProps()}>
      <SelectView select={select} {...props} />
    </FormFieldWrapper>
  );
}

export default WrappedSelect;
