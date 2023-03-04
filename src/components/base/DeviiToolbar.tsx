// eslint-disable-next-line jsx-a11y/media-has-caption
import React from "react";
import { SaveButton, Toolbar, useRedirect } from "react-admin";

import { styled, Button, Typography } from "@mui/material";

const CustomSaveButton = styled(SaveButton)(({ theme }) => ({
  borderRadius: "20px",
  fontFamily: "Nunito",
  fontWeight: 700,
  padding: "8px 22px",
  color: theme.palette.primary.contrastText,
  letterSpacing: "0.5px",
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeviiToolbar = (props: any): JSX.Element => {
  const redirect = useRedirect();
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "27px",
        backgroundColor: "transparent",
        minHeight: "auto",
      }}
    >
      <Button onClick={() => redirect("list", props.list)}>
        <Typography variant="button" color="white">
          Cancel
        </Typography>
      </Button>
      <CustomSaveButton label={props.title} icon={<></>} />
    </Toolbar>
  );
};
export default DeviiToolbar;
