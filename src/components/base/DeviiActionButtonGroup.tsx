import React, { FunctionComponent } from "react";
import { Typography, Button } from "@mui/material";
import DeviiButton from "./DeviiButton";

type DeviiActionButtonGroupProps = {
  onCancel: Function;
  isLoading?: boolean;
};

const DeviiActionButtonGroup: FunctionComponent<
  DeviiActionButtonGroupProps
> = ({ onCancel, isLoading }) => (
  <Typography align="right">
    <Button onClick={onCancel} disabled={isLoading}>
      <Typography variant="button" color="white">
        Cancel
      </Typography>
    </Button>
    <DeviiButton
      type="submit"
      variant="contained"
      sx={{ mt: 2, mb: 2, ml: 2, padding: "8px 22px" }}
      size="large"
      pill="false"
      disabled={isLoading}
    >
      Save
    </DeviiButton>
  </Typography>
);

DeviiActionButtonGroup.defaultProps = {
  isLoading: false,
};

export default DeviiActionButtonGroup;
