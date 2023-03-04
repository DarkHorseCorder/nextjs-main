import * as React from "react";
import { Box } from "@mui/material";
import DeviiSVG from "../../../public/DeviiLogo.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeviiLogo = (props: any) => {
  return (
    <Box {...props}>
      <DeviiSVG />
    </Box>
  );
};

export default DeviiLogo;
