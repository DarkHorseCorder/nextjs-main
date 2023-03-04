import { styled, alpha } from "@mui/material";
import { Box } from "@mui/system";

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      .MuiListItem-root {
        padding: 1px 0;

        .MuiButton-root {
          display: flex;
          padding-top: ${theme.spacing(1.5)};
          padding-right: ${theme.spacing(3)};
          padding-bottom: ${theme.spacing(1.5)};
          padding-left: ${theme.spacing(3)};
          margin-bottom: ${theme.spacing(1)};
          color: ${alpha(theme.palette.common.white, 0.9)};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          text-transform: none !important;
          font-size: ${theme.typography.pxToRem(20)};
          line-height: 1.25

          .MuiButton-startIcon {
            color: ${alpha(theme.palette.primary.main, 0.7)};
            font-size: ${theme.typography.pxToRem(20)};
            width: 20px;
            height: 20px;
            margin-right: ${theme.spacing(2)};
            margin-top: -5px;

            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
            }
          }

          &.active,
          &:hover {
            color: ${alpha(theme.palette.common.white, 1)};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${alpha(theme.palette.primary.main, 1.0)};
            }
          }

          &:hover {
            background-color: ${alpha(theme.palette.common.white, 0.2)};
          }

          &.active {
            background-color: ${alpha(theme.palette.primary.main, 0.2)};
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }
      }
    }
  `
);

export default SubMenuWrapper;
