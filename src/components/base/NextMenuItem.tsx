import React, { ReactNode } from "react";
import { MenuItem } from "@mui/material";

interface Props {
  key: string;
  onClick?: Function;
  sx?: any;
  children?: ReactNode;
}

export type Ref = HTMLButtonElement;

// eslint-disable-next-line react/display-name
const NextMenuItem = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <MenuItem {...props} ref={ref}>
      {props.children}
    </MenuItem>
  );
});

export default NextMenuItem;
