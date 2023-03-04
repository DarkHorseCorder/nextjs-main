import { createTheme, Theme } from "@mui/material/styles";
import { components } from "./components";
import { palette } from "./palette";
import { breakpoints } from "./breakpoints";
import { typography } from "./typography";

const theme: Theme = createTheme({
  palette,
  shape: {
    borderRadius: 10,
  },
  breakpoints,
  spacing: 8,
  typography,
  components,
});

export default theme;
