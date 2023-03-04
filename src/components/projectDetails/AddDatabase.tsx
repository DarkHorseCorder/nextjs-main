import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const withLink = (to: string, children: React.ReactElement) => (
  <Link to={to}>{children}</Link>
);

const AddButton = (props: { name: string }) => {
  return (
    <Stack
      direction="row"
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{ minWidth: "140px " }}
    >
      <AddIcon />
      <Typography variant="subtitle1">{props.name}</Typography>
    </Stack>
  );
};

const actions = [
  {
    icon: withLink(
      "/project/create/internal",
      <AddButton name="Devii-hosted" />
    ),
    name: "Devii-hosted",
    operation: "internal",
  },
  {
    icon: withLink(
      "/project/create/external",
      <AddButton name="Externally-hosted" />
    ),
    name: "Externally-hosted",
    operation: "external",
  },
];

const AddDatabase = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <SpeedDial
      ariaLabel="Create Database"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              fontSize: "0.875rem",
            },
          }}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
};

export default AddDatabase;
