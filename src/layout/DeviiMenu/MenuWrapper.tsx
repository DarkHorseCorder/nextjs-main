import { styled, alpha } from "@mui/material";
import { Box } from "@mui/system";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      padding: ${theme.spacing(1, 1, 1, 0.5)};

      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      },
    }

    .MuiListSubheader-root {
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${alpha(theme.palette.common.white, 0.7)};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;

      &.menuHeading {
        line-height: 1;
        padding: ${theme.spacing(0, 2.5)};
        margin: ${theme.spacing(1.6, 0, -1.6, -1.5)};
        color: ${alpha(theme.palette.common.white, 0.5)};
        font-size: ${theme.typography.pxToRem(18)};
      }
    }
  `
);

export default MenuWrapper;
