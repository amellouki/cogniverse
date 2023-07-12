import LabelValuePair from "@/types/LabelValuePair";
import React, {useCallback, useMemo} from "react";

export default function useOptionsChecking(
  checkedOptions: LabelValuePair[],
  onChange: (option: LabelValuePair[]) => void,
  singleSelection: boolean = false
) {
  const checkedOptionsMap = useMemo(() => {
    return new Map(checkedOptions.map(option => [option.value, option]))
  }, [checkedOptions])

  const isChecked = useCallback((option: LabelValuePair) => {
    return !!checkedOptionsMap.get(option.value)
  }, [checkedOptionsMap])

  const handleChange = useCallback((option: LabelValuePair, checked: boolean) => {
    if (singleSelection) {
      onChange([option])
      return
    }
    if (checked) {
      onChange([...checkedOptions, option])
    } else {
      onChange(checkedOptions.filter((o) => o.value !== option.value))
    }
  }, [checkedOptions])
  return {isChecked, handleChange};
}
