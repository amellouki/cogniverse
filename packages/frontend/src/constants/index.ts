import SelectOption from "@/types/SelectOption";

export const END_COMPLETION = '[DONE]';

export const BOTS_OPTIONS: SelectOption[] = [
  { value: 'conversational', label: 'Conversational Bot' },
  { value: 'rc', label: 'PDF Retrieval Conversational' },
]

export const COLOR_OPTIONS = [
  {label: 'Weldon Blue', value: '#749da1'},
  {label: 'Sage', value: '#b4be89'},
  {label: 'Gold', value: '#e0be99'},
  {label: 'Ruddy Pink', value: '#eb9191'},
];

export const LOCAL_STORAGE = {
  TOKEN: 'token',
  TOKEN_EXPIRES_AT: 'token_expires_at',
}
