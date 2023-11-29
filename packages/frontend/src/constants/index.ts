import SelectOption from "@/types/SelectOption";
import {BotType} from "@my-monorepo/shared";

export const END_COMPLETION = '[DONE]';

export const BOTS_OPTIONS: SelectOption[] = [
  { value: BotType.CONVERSATIONAL, label: 'Conversational Bot' },
  { value: BotType.RETRIEVAL_CONVERSATIONAL, label: 'PDF Retrieval Conversational' },
]

export const LLM_OPTIONS: SelectOption[] = [
  { value: 'gpt-3.5-turbo', label: 'GPT3.5 turbo' },
  { value: 'gpt-4', label: 'GPT4' },
  { value: 'gpt-3.5-turbo-1106', label: 'GPT3.5 (function calling)' },
  { value: 'gpt-4-1106-preview', label: 'GPT4 (function calling)' }
];

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
