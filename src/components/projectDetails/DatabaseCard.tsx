/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  Chip,
  Typography,
  Grid,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DeviiTooltip, DeviiRoundBox } from "components/base";
import { CopyIcon, EditIcon } from "components/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL_PRODUCTION, QUERY_URL, ROLES_PBAC } from "../../constants";
import copy from "copy-to-clipboard";
import { useNotify } from "react-admin";

const editHandler = (e: any) => {
  // e.preventDefault()
  console.log(e);
  console.log("editHandler");
};

const chipPlatformSwitch = (param: number) => {
  switch (param) {
    case 1:
      return <Chip label="Internal" color="success" />;
    default:
      return <Chip label="External" color="info" />;
  }
};
const chipEnvironmentSwitch = (param: number) => {
  switch (param) {
    case 1:
      return <Chip label="Staging" color="warning" />;
    default:
      return <Chip label="Production" color="primary" />;
  }
};

const DatabaseCard = ({
  database,
  doubleClick,
  platform,
  environment,
  copyable,
}: any): JSX.Element => {
  const theme = useTheme();
  const notify = useNotify();
  const [anchorEndpoint, setAnchorEndpoint] =
    React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const openEndpointMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEndpoint(event.currentTarget);
  };

  const closeEndpointMenu = () => {
    setAnchorEndpoint(null);
  };

  const copyEndpoint = (suffix: string) => {
    closeEndpointMenu();
    const endpoint = `${BASE_URL_PRODUCTION}/tenant${database.tenantid}/${suffix}`;
    copy(endpoint);
    const message = "Successfully copied to clipboard";
    notify(message, {
      type: "success",
    });
  };

  const handleClick = (event: any) => {
    if (!doubleClick) return;
    if (event.detail === 2) {
      navigate(`${location.pathname}/database/${database.id}`);
    }
  };

  return (
    <Grid key={database.id} item>
      <DeviiRoundBox
        height="270px"
        width="270px"
        onClick={handleClick}
        sx={{
          p: 3.75,
          position: "relative",
          cursor: doubleClick ? "pointer" : "inherit",
        }}
      >
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={1}
        >
          <Typography
            color="primary"
            component="h5"
            variant="h5"
            align="left"
            display="block"
            gutterBottom
          >
            {database.name}
          </Typography>
          <DeviiTooltip title="Configure" placement="bottom">
            <IconButton
              sx={{
                p: 0,
                color: "background.light",
                "&.MuiIconButton-root": {
                  background: "transparent",
                },
              }}
              onClick={() => editHandler(database.id)}
            >
              <EditIcon
                value={database.id}
                align="right"
                sx={{ color: "text.secondary", cursor: "pointer" }}
              />
            </IconButton>
          </DeviiTooltip>
        </Stack>
        <Stack sx={{ minHeight: "40px", mb: theme.spacing(1) }}>
          <Typography
            component="p"
            variant="body2"
            align="left"
            display="block"
            gutterBottom
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
          >
            {database.description}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {platform && (
            <Box component="div">
              {chipPlatformSwitch(database.database_platform_id)}
            </Box>
          )}
          {environment && (
            <Box component="div">
              {chipEnvironmentSwitch(database.database_env_id)}
            </Box>
          )}
        </Stack>
        {copyable && (
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            sx={{
              position: "absolute",
              bottom: theme.spacing(1),
              right: theme.spacing(1),
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={openEndpointMenu}
          >
            <Typography
              color="primary"
              component="p"
              variant="subtitle1"
              align="right"
              display="block"
            >
              ENDPOINTS
            </Typography>
            <CopyIcon
              component="a"
              sx={{ ml: 1, cursor: "pointer" }}
              color="primary"
            />
          </Stack>
        )}
      </DeviiRoundBox>
      <Menu
        anchorEl={anchorEndpoint}
        open={Boolean(anchorEndpoint)}
        onClose={closeEndpointMenu}
      >
        <MenuItem onClick={() => copyEndpoint(QUERY_URL)}>Query</MenuItem>
        <MenuItem onClick={() => copyEndpoint(ROLES_PBAC)}>Roles_PBAC</MenuItem>
      </Menu>
    </Grid>
  );
};

DatabaseCard.defaultProps = {
  database: {},
  doubleClick: true,
  platform: true,
  environment: true,
  copyable: true,
};

export default DatabaseCard;
