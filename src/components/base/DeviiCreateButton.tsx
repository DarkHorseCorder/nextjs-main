/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CreateButton } from "react-admin";
import { styled, IconButton } from "@mui/material";

const DeviiCreateButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}`,
  minWidth: "auto!important",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  position: "absolute",
  top: "-95px",
  right: 0,
  "&:hover": {
    backgroundColor: `${theme.palette.primary.main}`,
  },
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  color: "black",
}));

export default DeviiCreateButton;
