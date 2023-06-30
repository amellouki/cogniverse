import {ComputerDesktopIcon, MoonIcon, SunIcon} from "@heroicons/react/24/outline";
import {
  ComputerDesktopIcon as SolidComputerDesktopIcon,
  MoonIcon as SolidMoonIcon,
  SunIcon as SolidSunIcon
} from "@heroicons/react/24/solid";
import React from "react";

const iconDimensions = {
  width: 16,
  height: 16
}

export const themeToIconMap = new Map<string, JSX.Element>([
  ['dark', <MoonIcon key={'icon-dark'} {...iconDimensions} />],
    ['light', <SunIcon key={'icon-light'} {...iconDimensions} />],
    ['system', <ComputerDesktopIcon key={'icon-system'} {...iconDimensions} />]
  ])

export const activeThemeToIconMap = new Map<string, JSX.Element>([
  ['dark', <SolidMoonIcon key={'icon-dark'} {...iconDimensions} />],
    ['light', <SolidSunIcon key={'icon-light'} {...iconDimensions} />],
    ['system', <SolidComputerDesktopIcon key={'icon-system'} {...iconDimensions} />]
  ])
