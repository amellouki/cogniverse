import SelectOption from "@/types/SelectOption";

export const END_COMPLETION = '[DONE]';

export const AGENT_OPTIONS: SelectOption[] = [
  { value: 'rc', label: 'PDF Retrieval Conversational' },
  { value: 'simpleAgent', label: 'Simple Agent' },
]
