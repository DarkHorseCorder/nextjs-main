import { alpha, PaletteMode } from "@mui/material";
import { colorPalettes, themeColors } from "./colors";

export const palette = {
  common: {
    black: colorPalettes.alpha.black[100],
    white: colorPalettes.alpha.white[100],
  },
  mode: "dark" as PaletteMode,
  primary: {
    light: colorPalettes.primary.light,
    main: colorPalettes.primary.main,
    dark: colorPalettes.primary.dark,
  },
  secondary: {
    light: colorPalettes.secondary.light,
    main: colorPalettes.secondary.main,
    dark: colorPalettes.secondary.dark,
    contrast: alpha(themeColors.secondaryContrast, 0.87),
  },
  error: {
    light: colorPalettes.error.light,
    main: colorPalettes.error.main,
    dark: colorPalettes.error.dark,
    contrastText: themeColors.trueWhite,
    shades: alpha(themeColors.errorShades, 0.5),
  },
  success: {
    light: colorPalettes.success.light,
    main: colorPalettes.success.main,
    dark: colorPalettes.success.dark,
    contrastText: themeColors.trueWhite,
  },
  info: {
    light: colorPalettes.info.light,
    main: colorPalettes.info.main,
    dark: colorPalettes.info.dark,
    contrastText: themeColors.trueWhite,
  },
  warning: {
    light: colorPalettes.warning.light,
    main: colorPalettes.warning.main,
    dark: colorPalettes.warning.dark,
  },
  text: {
    primary: themeColors.textPrimary,
    c: alpha(themeColors.textSecondary, 0.7),
    light: colorPalettes.alpha.white[70],
    disabled: themeColors.disabled,
  },
  background: {
    paper: themeColors.background,
    default: themeColors.background,
    light: themeColors.backgroundAlt,
    elevation: themeColors.elevation,
  },
  action: {
    active: alpha(themeColors.active, 0.56),
    hover: colorPalettes.primary.lighter,
    hoverOpacity: 0.1,
    selected: colorPalettes.alpha.black[10],
    selectedOpacity: 0.1,
    disabled: colorPalettes.alpha.black[50],
    disabledBackground: colorPalettes.alpha.black[5],
    disabledOpacity: 0.38,
    focus: colorPalettes.alpha.black[10],
    focusOpacity: 0.05,
    activatedOpacity: 0.12,
  },
};
