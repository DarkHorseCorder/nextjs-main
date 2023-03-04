import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";

const DeviiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    placement="bottom-start"
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.elevation,
    color: theme.palette.text.primary,
    fontSize: 11,
  },
}));

export default DeviiTooltip;
