import SelectOption from "@/types/SelectOption";

export const END_COMPLETION = '[DONE]';

export const AGENT_OPTIONS: SelectOption[] = [
  { value: 'rc', label: 'PDF Retrieval Conversational' },
  { value: 'conversational', label: 'Conversational Bot' },
]

export const COLOR_OPTIONS = [
  {label: 'Weldon Blue', value: '#749da1'},
  {label: 'Sage', value: '#b4be89'},
  {label: 'Gold', value: '#e0be99'},
  {label: 'Ruddy Pink', value: '#eb9191'},
];
