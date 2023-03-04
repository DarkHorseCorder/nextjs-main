import { alpha, darken } from "@mui/material";
import { breakpoints } from "./breakpoints";
import { themeColors, colorPalettes } from "./colors";
import { palette } from "./palette";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components: any = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        minHeight: 60,
        height: 60,
        padding: "10px 0",
        borderBottom: "none",
        boxShadow: "none",
        zIndex: 2,
      },
      colorSecondary: {
        color: themeColors.textSecondary,
        backgroundColor: themeColors.background,
        borderColor: themeColors.background,
      },
    },
  },
  RaLayout: {
    styleOverrides: {
      root: {
        "& .RaLayout-content": {
          padding: 10,
          zIndex: "1",
          marginTop: 10,
        },
      },
    },
  },
  RaDatagrid: {
    styleOverrides: {
      root: {
        "& .RaDatagrid-headerCell": {
          color: alpha(themeColors.textSecondary, 0.7),
          borderBottom: `1px solid ${colorPalettes.alpha.white[5]}`,
          borderRadius: `0!important`,
          position: "relative",
          zIndex: "inherit",
        },
        "& .RaDatagrid-rowCell": {
          padding: 16,
          maxWidth: 500,
          overflow: "hidden",
        },
        "& .RaDatagrid-rowCell:last-child": {
          textAlign: "right",
        },
      },
    },
  },
  RaCreate: {
    styleOverrides: {
      root: {
        "& .RaCreate-card": {
          marginTop: 0,
          paddingTop: 10,
          backgroundColor: themeColors.backgroundAlt,
        },
      },
    },
  },
  RaEdit: {
    styleOverrides: {
      root: {
        "& .RaEdit-card": {
          marginTop: 0,
          paddingTop: 10,
          backgroundColor: themeColors.backgroundAlt,
        },
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: "false",
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(darken("#070C27", 0.5), 0.4),

        "&.MuiBackdrop-invisible": {
          backgroundColor: "transparent",
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        textTransform: "none",
        marginLeft: 8,
        marginRight: 8,
        fontWeight: 400,
        fontSize: "0.75rem",
        color: alpha(themeColors.textSecondary, 0.7),
        minHeight: 17,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: palette.background.light,
      },
      root: {
        "& .MuiDialogContentText-root": {
          color: themeColors.textPrimary,
        },
        "& .MuiDialogTitle-root": {
          color: colorPalettes.primary.main,
          fontSize: "1.5rem",
        },
        "& .MuiDialogContent-root": {
          padding: "20px 48px",
          paddingTop: 0,
        },
        "& .MuiDialogActions-root": {
          padding: 16,
        },
        "& .MuiDialogActions-root .MuiButton-root": {
          fontSize: "0.8125rem",
          color: themeColors.textPrimary,
          borderRadius: 30,
        },
        "& .MuiDialogActions-root .ra-confirm": {
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          color: themeColors.secondaryContrast,
          backgroundColor: themeColors.error,
          "& .MuiButton-startIcon": {
            marginLeft: 8,
            marginRight: -4,
          },
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      "html, body": {
        width: "100%",
        height: "100%",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
        flex: 1,
      },
      "#root": {
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      },
      html: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
      },
      ".child-popover .MuiPaper-root .MuiList-root": {
        flexDirection: "column",
      },
      "#nprogress": {
        pointerEvents: "none",
      },
      "#nprogress .bar": {
        background: colorPalettes.primary.lighter,
      },
      "#nprogress .spinner-icon": {
        borderTopColor: colorPalettes.primary.lighter,
        borderLeftColor: colorPalettes.primary.lighter,
      },
      "#nprogress .peg": {
        boxShadow: `0 0 15px ${colorPalettes.primary.lighter}, 0 0 8px${colorPalettes.primary.light}`,
      },
      ":root": {
        "--swiper-theme-color": colorPalettes.primary.main,
        colorScheme: "dark",
      },
      code: {
        background: colorPalettes.info.lighter,
        color: colorPalettes.alpha.black[100],
        borderRadius: 4,
        padding: 4,
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.8)",
          opacity: 0,
        },
      },
      "@keyframes float": {
        "0%": {
          transform: "translate(0%, 0%)",
        },
        "100%": {
          transform: "translate(3%, 3%)",
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      iconOutlined: {
        color: colorPalettes.alpha.black[50],
      },
      icon: {
        top: "calc(50% - 14px)",
        color: colorPalettes.alpha.white[70],
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        "&.MuiOutlinedInput-input": {
          paddingTop: "16.5px",
          paddingBottom: "16.5px",
          fontSize: "0.875rem",
          [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
            paddingTop: "8.5px",
            paddingBottom: "8.5px",
          },
        },
        "&:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 100px ${palette.background.light} inset`,
          WebkitTextFillColor: "#fff",
          borderRadius: "unset",
        },
      },
      root: {
        "& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined": {
          paddingRight: 6,
        },
        "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colorPalettes.primary.main,
        },
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      colorPrimary: {
        fontWeight: "bold",
        lineHeight: "40px",
        fontSize: "0.8125rem",
        background: colorPalettes.alpha.black[5],
        color: colorPalettes.alpha.black[70],
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        marginTop: -5,
        marginBottom: -5,
      },
      title: {
        fontSize: "0.9375rem",
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        borderRadius: "50px",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      colorSecondary: {
        background: colorPalettes.alpha.black[5],
        color: colorPalettes.alpha.black[100],

        "&:hover": {
          background: colorPalettes.alpha.black[10],
        },
      },
      deleteIcon: {
        color: colorPalettes.alpha.black[50],

        "&:hover": {
          color: colorPalettes.alpha.black[70],
        },
      },
      label: {
        fontSize: "0.75rem",
        color: alpha(themeColors.secondaryContrast, 0.87),
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: "none",

        "&.Mui-expanded": {
          margin: 0,
        },
        "&::before": {
          display: "none",
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
      colorDefault: {
        background: colorPalettes.alpha.black[30],
        color: colorPalettes.alpha.trueWhite[100],
      },
    },
  },
  MuiAvatarGroup: {
    styleOverrides: {
      root: {
        alignItems: "center",
      },
      avatar: {
        background: colorPalettes.alpha.black[10],
        fontSize: "0.8125rem",
        color: colorPalettes.alpha.black[70],
        fontWeight: "bold",

        "&:first-of-type": {
          border: 0,
          background: "transparent",
        },
      },
    },
  },
  MuiListItemAvatar: {
    styleOverrides: {
      alignItemsFlexStart: {
        marginTop: 0,
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      page: {
        fontSize: "0.8125rem",
        fontWeight: "bold",
        transition: "all .2s",
      },
      textPrimary: {
        "&.Mui-selected": {
          boxShadow: colorPalettes.shadows.primary,
        },
        "&.MuiButtonBase-root:hover": {
          background: colorPalettes.alpha.black[5],
        },
        "&.Mui-selected.MuiButtonBase-root:hover": {
          background: colorPalettes.primary.main,
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        fontWeight: "bold",
        textTransform: "uppercase",
        paddingLeft: 16,
        paddingRight: 16,

        ".MuiSvgIcon-root": {
          transition: "all .2s",
        },
      },
      endIcon: {
        marginRight: -8,
      },
      containedSecondary: {
        backgroundColor: colorPalettes.secondary.main,
        color: colorPalettes.alpha.white[100],
        border: `1px solid ${colorPalettes.alpha.black[30]}`,
      },
      outlinedSecondary: {
        backgroundColor: colorPalettes.alpha.white[100],

        "&:hover, &.MuiSelected": {
          backgroundColor: colorPalettes.alpha.black[5],
          color: colorPalettes.alpha.black[100],
        },
      },
      sizeSmall: {
        padding: "6px 16px",
        lineHeight: 1.5,
      },
      sizeMedium: {
        padding: "8px 20px",
      },
      sizeLarge: {
        padding: "11px 24px",
      },
      textSizeSmall: {
        padding: "7px 12px",
      },
      textSizeMedium: {
        padding: "9px 16px",
      },
      textSizeLarge: {
        padding: "12px 16px",
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: false,
    },
    styleOverrides: {
      root: {
        borderRadius: 6,
        "&.Mui-disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.12)!important",
        },
        "&.MuiSpeedDialAction-fab": {
          minWidth: "160px",
          borderRadius: "30px",
          padding: "0 20px",
          backgroundColor: themeColors.backgroundAlt,
          textTransform: "inherit",
          "&:hover": {
            backgroundColor: alpha(themeColors.backgroundAlt, 0.9),
          },
        },
        "&.MuiSwitch-switchBase .MuiSwitch-input": {
          left: "-10px",
          width: "385%",
        },
        "&.MuiIconButton-root.Mui-disabled": {
          backgroundColor: "transparent!important",
        },
        "&.MuiChip-deleteIcon": {
          marginLeft: "4px !important",
        },
      },
    },
  },
  MuiToggleButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        color: colorPalettes.primary.main,
        background: colorPalettes.alpha.white[100],
        transition: "all .2s",

        "&:hover, &.Mui-selected, &.Mui-selected:hover": {
          color: themeColors.trueWhite,
          background: colorPalettes.primary.main,
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: 8,

        "& .MuiTouchRipple-root": {
          borderRadius: 8,
        },
      },
      sizeSmall: {
        padding: 4,
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        margin: 0,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        "& .MuiTouchRipple-root": {
          opacity: 0.3,
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        background: colorPalettes.alpha.black[10],
        border: 0,
        height: 1,
      },
      vertical: {
        height: "auto",
        width: 1,

        "&.MuiDivider-flexItem.MuiDivider-fullWidth": {
          height: "auto",
        },
        "&.MuiDivider-absolute.MuiDivider-fullWidth": {
          height: "100%",
        },
      },
      withChildren: {
        "&:before, &:after": {
          border: 0,
        },
      },
      wrapper: {
        background: colorPalettes.alpha.white[100],
        fontWeight: "bold",
        height: 24,
        lineHeight: "24px",
        marginTop: -12,
        color: "inherit",
        textTransform: "uppercase",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        padding: 0,
        "&.MuiCard-root": {
          borderRadius: 0,
          marginTop: 16,
        },
      },
      elevation0: {
        boxShadow: "none",
      },
      elevation: {
        boxShadow: "none",
      },
      elevation2: {
        boxShadow: colorPalettes.shadows.cardSm,
      },
      elevation24: {
        boxShadow: colorPalettes.shadows.cardLg,
      },
      outlined: {
        boxShadow: colorPalettes.shadows.card,
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: "hover",
      color: alpha(themeColors.active, 0.56),
      fontSize: "0.8125rem",
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        height: 6,
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        "& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel": {
          transform: "none",
        },
        "& .MuiSlider-valueLabel": {
          borderRadius: 6,
          background: colorPalettes.alpha.black[100],
          color: colorPalettes.alpha.white[100],
        },
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,

        "& .MuiListItem-button": {
          transition: "all .2s",

          "& > .MuiSvgIcon-root": {
            minWidth: 34,
          },

          "& .MuiTouchRipple-root": {
            opacity: 0.2,
          },
        },
        "& .MuiListItem-root .MuiButton-root": {
          fontSize: "1.125rem !important",
          fontWeight: 400,
        },
        "& .MuiListItem-root .MuiButton-root.active": {
          backgroundColor: `${colorPalettes.primary.light}!important`,
        },
        "& .MuiListItem-root .MuiButton-root .MuiButton-startIcon": {
          color: `${themeColors.primary}!important`,
          marginRight: "16px",
        },
        "& .MuiListItem-root .MuiButton-root.active .MuiButton-startIcon": {
          color: `${themeColors.white}!important`,
        },
        "& .MuiListItem-root .MuiButtonBase-root.Mui-selected": {
          backgroundColor: colorPalettes.alpha.black[10],
        },
        "& .MuiMenuItem-root.MuiButtonBase-root .MuiTouchRipple-root": {
          opacity: 0.2,
        },
        "& .MuiMenuItem-root .MuiButtonBase-root": {
          display: "block",
          padding: 0,
          fontSize: "0.875rem",
        },
      },
      padding: {
        padding: 10,

        "& .MuiListItem-button": {
          borderRadius: 6,
          margin: "1px 0",
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        height: 38,
        minHeight: 38,
        overflow: "visible",
      },
      indicator: {
        height: 38,
        minHeight: 38,
        borderRadius: 6,
        border: `1px solid ${colorPalettes.primary.dark}`,
        boxShadow: `0px 2px 10px ${colorPalettes.primary.light}`,
      },
      scrollableX: {
        overflow: "visible !important",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: 0,
        height: 38,
        minHeight: 38,
        borderRadius: 6,
        transition: "color .2s",
        textTransform: "capitalize",

        "&.MuiButtonBase-root": {
          minWidth: "auto",
          paddingLeft: 20,
          paddingRight: 20,
          marginRight: 4,
        },
        "&.Mui-selected, &.Mui-selected:hover": {
          color: colorPalettes.alpha.trueWhite[100],
          zIndex: 5,
        },
        "&:hover": {
          color: colorPalettes.alpha.trueWhite[70],
        },
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        padding: 12,
        backgroundColor: `${themeColors.elevation}!important`,
      },
      list: {
        padding: 12,
        "& .MuiMenuItem-root.MuiButtonBase-root": {
          fontSize: 14,
          marginTop: 1,
          marginBottom: 1,
          transition: "all .2s",
          color: themeColors.textPrimary,

          "& .MuiTouchRipple-root": {
            opacity: 0.2,
          },

          "&:hover, &:active, &.active, &.Mui-selected": {
            color: colorPalettes.alpha.white[100],
            background: alpha(colorPalettes.primary.lighter, 0.2),
          },
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        background: "transparent",
        transition: "all .2s",

        "&:hover, &:active, &.active, &.Mui-selected": {
          color: colorPalettes.alpha.black[100],
          background: alpha(colorPalettes.primary.lighter, 0.2),
        },
        "&.Mui-selected:hover": {
          background: alpha(colorPalettes.primary.lighter, 0.2),
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        "&.MuiButtonBase-root": {
          color: colorPalettes.secondary.main,

          "&:hover, &:active, &.active, &.Mui-selected": {
            color: colorPalettes.alpha.black[100],
            background: alpha(colorPalettes.primary.lighter, 0.2),
          },
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        "&.MuiOutlinedInput-root.Mui-disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.12)",
        },
        "&.Mui-error ~ p": {
          color: themeColors.error,
        },
      },
      input: {
        "&.MuiInputBase-inputMultiline": {
          paddingTop: "2.5px!important",
          paddingBottom: "2.5px!important",
        },
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 3px #060A2D",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: themeColors.primary,
          borderRadius: "40px",
          outline: `1px solid ${themeColors.primary}`,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: "1rem",
        color: alpha(themeColors.textSecondary, 0.7),
        lineHeight: "inherit",
        "&.MuiInputLabel-root#search-label": {
          top: 0,
        },
      },
      shrink: {
        [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
          top: 0,
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      tag: {
        margin: 1,
      },
      root: {
        ".MuiAutocomplete-inputRoot.MuiOutlinedInput-root .MuiAutocomplete-endAdornment":
          {
            right: 14,
          },
      },
      clearIndicator: {
        background: alpha(colorPalettes.error.lighter, 0.2),
        color: colorPalettes.error.main,
        marginRight: 8,

        "&:hover": {
          background: alpha(colorPalettes.error.lighter, 0.3),
        },
      },
      popupIndicator: {
        color: colorPalettes.alpha.black[70],

        "&:hover": {
          background: alpha(colorPalettes.primary.lighter, 0.2),
        },
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      root: {
        "& .MuiTablePagination-selectLabel": {
          color: alpha(themeColors.textSecondary, 0.7),
        },
      },
      toolbar: {
        "& .MuiIconButton-root": {
          padding: 8,
        },
      },
      select: {
        fontSize: "0.875rem",
        "&:focus": {
          backgroundColor: "transparent",
          color: themeColors.trueWhite,
        },
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: "0 !important",
        padding: "0 !important",
        "& > span": {
          display: "none",
        },
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        borderCollapse: "inherit",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      head: {
        background: colorPalettes.alpha.black[5],
        "& .RaDatagrid-headerCell": {
          backgroundColor: `${palette.background.light}!important`,
        },
      },
      root: {
        transition: "background-color .2s",
        backgroundColor: palette.background.light,
        "&.MuiTableRow-hover:hover": {
          backgroundColor: alpha(colorPalettes.primary.main, 0.5),
          color: themeColors.trueWhite,
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${colorPalettes.alpha.white[5]}`,
        fontSize: "0.875rem",
        textOverflow: "ellipsis",
        "& .MuiIconButton-root": {
          borderRadius: "50%",
        },
      },
      head: {
        fontSize: "0.875rem",
        fontWeight: 400,
        color: alpha(themeColors.textSecondary, 0.7),
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      message: {
        lineHeight: 1.5,
        fontSize: 14,
      },
      standardInfo: {
        color: colorPalettes.info.main,
      },
      action: {
        color: colorPalettes.alpha.black[70],
      },
    },
  },
  MuiTimelineDot: {
    styleOverrides: {
      root: {
        margin: 0,
        zIndex: 5,
        position: "absolute",
        top: "50%",
        marginTop: -6,
        left: -6,
      },
      outlined: {
        backgroundColor: colorPalettes.alpha.white[100],
        boxShadow: `0 0 0 6px ${colorPalettes.alpha.white[100]}`,
      },
      outlinedPrimary: {
        backgroundColor: colorPalettes.alpha.white[100],
        boxShadow: `0 0 0 6px ${colorPalettes.alpha.white[100]}`,
      },
    },
  },
  MuiTimelineConnector: {
    styleOverrides: {
      root: {
        position: "absolute",
        height: "100%",
        top: 0,
        borderRadius: 50,
        backgroundColor: colorPalettes.alpha.black[10],
      },
    },
  },
  MuiTimelineItem: {
    styleOverrides: {
      root: {
        minHeight: 0,
        padding: "8px 0",

        "&:before": {
          display: "none",
        },
      },
      missingOppositeContent: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: alpha(colorPalettes.alpha.black["100"], 0.95),
        padding: "8px 16px",
        fontSize: 13,
      },
      arrow: {
        color: alpha(colorPalettes.alpha.black["100"], 0.95),
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        height: 33,
        width: 53,
        overflow: "visible",
        padding: "10px",
        "& .MuiButtonBase-root": {
          position: "absolute",
          padding: 6,
          transition:
            "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "& .MuiIconButton-root": {
          borderRadius: 100,
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          opacity: 0.3,
        },
      },
      thumb: {
        border: `1px solid ${colorPalettes.alpha.black[30]}`,
        boxShadow: `0px 9px 14px ${colorPalettes.alpha.black[10]}, 0px 2px 2px ${colorPalettes.alpha.black[10]}`,
      },
      track: {
        backgroundColor: colorPalettes.alpha.white[30],
        border: `1px solid ${colorPalettes.alpha.black[10]}`,
        boxShadow: `inset 0px 1px 1px ${colorPalettes.alpha.black[10]}`,
        opacity: 1,
      },
      colorPrimary: {
        "& .MuiSwitch-thumb": {
          backgroundColor: colorPalettes.alpha.white[100],
        },

        "&.Mui-checked .MuiSwitch-thumb": {
          backgroundColor: colorPalettes.primary.main,
        },
      },
    },
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        paddingTop: 20,
        paddingBottom: 20,
        background: colorPalettes.alpha.black[5],
      },
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        "&.MuiStepIcon-completed": {
          color: colorPalettes.success.main,
        },
      },
    },
  },
  MuiSpeedDial: {
    styleOverrides: {
      root: {
        "& .MuiSpeedDial-actions": {
          marginBottom: 0,
          paddingBottom: 0,
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        subtitle1: "div",
        subtitle2: "div",
        body1: "div",
        body2: "div",
      },
    },
    styleOverrides: {
      gutterBottom: {
        marginBottom: 4,
      },
      paragraph: {
        fontSize: 17,
        lineHeight: 1.7,
      },
      root: {
        "&.MuiLink-root:hover": {
          textDecoration: "initial",
        },
      },
    },
  },
  RaFilterFormInput: {
    styleOverrides: {
      root: {
        marginTop: 40,
        marginLeft: 16,
        "& .MuiInputBase-root": {
          minWidth: 300,
        },
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        zIndex: 140000,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "&.MuiSelect-icon": {
          color: alpha(themeColors.active, 0.56),
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        marginBottom: 20,
      },
    },
  },
  RaResettableTextField: {
    styleOverrides: {
      root: {
        "& .MuiSelect-select": {
          paddingTop: "14px!important",
          paddingBottom: "14px!important",
        },
      },
    },
  },
  RaListToolbar: {
    styleOverrides: {
      root: {
        "& .MuiFormControl-root": {
          width: 300,
        },
        "& .MuiInputBase-root": {
          height: "42px!important",
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        "&.error .MuiFormLabel-root, &.error .MuiFormHelperText-root": {
          color: themeColors.error,
        },
        "&.error .MuiOutlinedInput-notchedOutline": {
          borderColor: themeColors.error,
        },
      },
    },
  },
};
