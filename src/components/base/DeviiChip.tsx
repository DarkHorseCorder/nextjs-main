import { Chip } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const DeviiChip = styled(Chip)(({ theme }) => ({
  height: 25.87,
  "&.MuiChip-filledInfo": {
    backgroundColor: alpha(theme.palette.info.main, 0.75),
  },
  "&.MuiChip-filledSuccess": {
    backgroundColor: alpha(theme.palette.success.main, 0.5),
  },
  "&.MuiChip-filledWarning": {
    backgroundColor: alpha(theme.palette.warning.main, 0.5),
  },
  "&.MuiChip-filledError": {
    backgroundColor: theme.palette.error.shades,
  },
  "&.MuiChip-filledSecondary": {
    backgroundColor: alpha(theme.palette.text.primary, 0.42),
  },
  "& .MuiChip-label": {
    color: alpha(theme.palette.text.primary, 0.8),
    paddingTop: 2,
    paddingRight: 4,
    "& .MuiButtonBase-root": {
      fontSize: "0.8125rem",
      fontFamily: "Nunito",
      color: alpha(theme.palette.text.primary, 0.8),
      height: 18,
      width: 18,
      marginBottom: 2,
      marginLeft: 2,
      backgroundColor: alpha("#ffffff", 0.3),
    },
  },
  "&.Mui-disabled": {
    opacity: 1,
    backgroundColor: alpha(theme.palette.text.disabled, 0.5),
  },
}));

export default DeviiChip;
