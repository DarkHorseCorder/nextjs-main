/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type DeviiButtonProps = ButtonProps & {
  pill?: string;
  component?: any;
  to?: string;
};
const DeviiButton = styled(Button)<DeviiButtonProps>(
  ({ theme }) =>
    (props) => ({
      borderRadius: props.pill ? 50 : 4,
      padding: theme.spacing(1, 0),
      fontWeight: 600,
      fontSize: "0.9375rem",
    })
);

export default DeviiButton;
