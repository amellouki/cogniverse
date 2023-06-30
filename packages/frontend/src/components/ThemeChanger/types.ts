const Themes = [
  'dark',
  'light'
] as const

export const ThemePreferences = [
  'dark',
  'system',
  'light'
] as const

export type ThemeType = typeof Themes[number]

export type ThemePreferenceType = typeof ThemePreferences[number];
