import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import styles from "./styles.module.scss";
import {ThemePreferences, ThemePreferenceType, ThemeType} from "@/components/ThemeChanger/types";
import {themeToIconMap} from "@/components/ThemeChanger/iconMap";

const ThemeChanger: FunctionComponent = (props) => {
  const [themePreference, setThemePreference] = useState<ThemePreferenceType>('system')
  const colorSchemeQueryList = useRef<MediaQueryList>()
  const prefersColorSchemeHandler = useRef<(e: MediaQueryListEvent) => void>()

  const appendHandler = useCallback(() => {
    prefersColorSchemeHandler.current = (e: MediaQueryListEvent) => {
      setThemeDOM(e.matches ? 'dark' : 'light')
    }
    colorSchemeQueryList.current?.addEventListener('change', prefersColorSchemeHandler.current)
  }, [])

  const removeHandler = useCallback(() => {
    if (prefersColorSchemeHandler.current) {
      colorSchemeQueryList.current?.removeEventListener('change', prefersColorSchemeHandler.current)
      prefersColorSchemeHandler.current = undefined
    }
  }, []);

  useEffect(() => {
    colorSchemeQueryList.current = window.matchMedia('(prefers-color-scheme: dark)')
    const systemTheme = colorSchemeQueryList.current.matches ? 'dark' : 'light';
    setThemeDOM(systemTheme)
    setThemePreference('system')
    appendHandler()
    return () => {
      removeHandler()
    }
  }, [setThemePreference, appendHandler, removeHandler]);

  const updateTheme = useCallback((preference: ThemePreferenceType) => {
    setThemePreference(preference)
    if (preference === 'system') {
      const systemTheme = colorSchemeQueryList.current?.matches ? 'dark' : 'light';
      setThemeDOM(systemTheme)
      appendHandler();
    } else {
      removeHandler();
      setThemeDOM(preference)
    }
  }, [appendHandler, removeHandler])
  // TODO: Style button group & make it a11ble
  return (
    <div className={clsx(styles.ThemeChanger, styles[themePreference])}>
      {ThemePreferences.map((preference) => (
        <button
          onClick={() => updateTheme(preference)}
          aria-label={`Change theme to ${preference}`}
          aria-pressed={preference === themePreference}
          className={clsx(styles.iconButton, preference === themePreference && styles.selected)}
          key={preference}
        >
          {themeToIconMap.get(preference)}
        </button>
      ))}
    </div>
  );

}

export default ThemeChanger;

function setThemeDOM(newTheme: ThemeType) {
  const root = window.document.documentElement;
  root.setAttribute('data-theme', newTheme);
  const currentTheme = newTheme === 'light' ? 'dark' : 'light'
  root.classList.remove(`${currentTheme}-theme`);
  root.classList.add(`${newTheme}-theme`);
}
