import SelectOption from "@/types/SelectOption";

export type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: SelectOption | undefined | null) => void;
  selected: SelectOption | undefined | null;
  id: string;
  className?: string;
}
