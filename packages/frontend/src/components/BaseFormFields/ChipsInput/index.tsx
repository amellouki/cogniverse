import React, {FunctionComponent, useCallback, useMemo, useRef} from 'react';
import {FieldError, Merge} from "react-hook-form";
import {XCircleIcon} from "@heroicons/react/24/outline";
import styles from './styles.module.scss';
import FormFieldWrapper from "@/components/FormFieldWrapper";
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";


type Props = {
  value: string[]
  onChange: (value: string[]) => void
  fieldError?: Merge<FieldError, (FieldError | undefined)[]>
  placeholder?: string
  label: string
  id: string
}

// TODO: which channels are which? improve ux here
const ChipsInput: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  id,
  fieldError
}) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const selectedItems = useMemo(() => new Set(value), [value])

  const addItem = useCallback((item: string) => {
    selectedItems.add(item)
    onChange(Array.from(selectedItems))
  }, [selectedItems, onChange])

  const deleteItem = useCallback((item: string) => {
    selectedItems.delete(item)
    onChange(Array.from(selectedItems))
  }, [selectedItems, onChange])
  return (
    <div>
      <FormFieldWrapper label={label} htmlFor={id}>
        <div className={styles.inputWrapper}>
          <TextInput
            id={id}
            className={styles.input}
            ref={textInputRef}
            hasError={!!fieldError}
            placeholder={placeholder}
          />
          <Button onClick={
            () => {
              if (textInputRef.current?.value) {
                addItem(textInputRef.current.value)
                textInputRef.current.value = ''
              }
            }}
          >
            Add
          </Button>
        </div>
      </FormFieldWrapper>
      {fieldError?.message && <div className={styles.error}>{fieldError.message}</div>}
      <div>
        {Array
          .from(selectedItems)
          .map((item) => (
            <div key={item} className={styles.item}>
              <span>{item}</span>
              <button
                onClick={() => {
                  deleteItem(item)
                }}
              >
                <XCircleIcon width={24} height={24} />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}



export default ChipsInput;
