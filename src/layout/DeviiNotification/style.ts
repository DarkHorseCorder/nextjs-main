export const styles = (theme: any) => ({
  left: `${theme.spacing(1)}!important`,
  bottom: `${theme.spacing(1)}!important`,
  transform: "inherit!important",
  width: {
    xs: `calc(100vw - ${theme.spacing(4)})`,
    sm: "230px",
  },
  "& .MuiAlert-root": {
    width: "100%",
    minWidth: "initial",
    minHeight: "76px",
    backgroundColor: "#011541",
    border: `1px solid ${theme.palette.info.dark}`,
    svg: {
      fill: theme.palette.info.dark,
    },
    color: theme.palette.text.light,
    "& .MuiAlert-icon": {
      paddingTop: theme.spacing(1.2),
      marginRight: 1,
    },
    "&.MuiAlert-filledError": {
      backgroundColor: "#2F0A35",
      border: `1px solid ${theme.palette.error.dark}`,
      svg: {
        fill: theme.palette.error.dark,
      },
    },
    "&.MuiAlert-filledWarning": {
      backgroundColor: "#35292F",
      border: `1px solid ${theme.palette.warning.dark}`,
      svg: {
        fill: theme.palette.warning.dark,
      },
    },
    "&.MuiAlert-filledSuccess": {
      backgroundColor: "#012743",
      border: `1px solid ${theme.palette.success.dark}`,
      svg: {
        fill: theme.palette.success.dark,
      },
    },
    "& .MuiAlert-action": {
      paddingLeft: 0,
      "& .MuiSvgIcon-root": {
        fill: theme.palette.text.light,
      },
    },
    "& .MuiAlert-message": {
      overflow: "inherit",
    },
  },
});
