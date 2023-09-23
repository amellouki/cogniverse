import React, {FunctionComponent, useCallback, useMemo, useRef} from 'react';
import TextInput from "@/components/BaseFormFields/TextInput";
import Button from "@/components/Button";
import {FieldError, Merge} from "react-hook-form";
import {XCircleIcon} from "@heroicons/react/24/outline";
import styles from './styles.module.scss';

type Props = {
  value: string[]
  onChange: (value: string[]) => void
  fieldError?: Merge<FieldError, (FieldError | undefined)[]>
}

// TODO: which channels are which? improve ux here
const ChipsInput: FunctionComponent<Props> = ({
  value,
  onChange,
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
      <div className={styles.inputWrapper}>
        <TextInput type={'number'} className={styles.input} ref={textInputRef} hasError={!!fieldError} />
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
