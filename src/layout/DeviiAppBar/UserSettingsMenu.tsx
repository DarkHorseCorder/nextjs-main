/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDataProvider, useLogout } from "react-admin";
import { Link as RouterLink } from "react-router-dom";
import Link from "next/link";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Stack,
  styled,
  Divider,
  // Link,
} from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
// ICONS
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { Theme, useTheme } from "@mui/system";
import {
  ProcessRulesIcon,
  AdminSettingsIcon,
  ProfileIcon,
  DiscordIcon,
  DocumentationIcon,
  SupportIcon,
  LogoutIcon,
} from "components/icons";
import { User } from "../../types";
import { getStorageItem } from "utils/auth";
import { ROLE_ID } from "../../constants";
import { DeviiTooltip, NextMenuItem } from "components/base";

type TSettings = {
  id: number;
  title: string;
  path: string;
  target?: string;
  navigate?: boolean; // able to navigate to the other pages
};
// User Setting Link Array
let settings: Array<TSettings> = [
  { id: 2, title: "Profile", path: "/#/profile", target: "_self" },
  { id: 3, title: "Divider", path: ", target: " },
  {
    id: 4,
    title: "Discord",
    path: "https://discord.com/channels/992078939218509914/992083263944413295",
    target: "_blank",
  },
  {
    id: 5,
    title: "Documentation",
    path: "https://www.devii.io/documentation/design-purpose",
    target: "_blank",
  },
  {
    id: 6,
    title: "Support",
    path: "mailto:support@devii.io?subject=I need help with…",
    target: "_blank",
  },
  { id: 7, title: "Divider", path: ", target: " },
];

// User Setting Link Array
const admin_settings: Array<TSettings> = [
  {
    id: 1,
    title: "Admin",
    path: "/admin#/users",
    target: "_self",
    navigate: true,
  },
  { id: 2, title: "Profile", path: "/#/profile", target: "_self" },
  { id: 3, title: "Divider", path: ", target: " },
  {
    id: 4,
    title: "Discord",
    path: "https://discord.com/channels/992078939218509914/992083263944413295",
    target: "_blank",
  },
  {
    id: 5,
    title: "Documentation",
    path: "https://www.devii.io/documentation/design-purpose",
    target: "_blank",
  },
  {
    id: 6,
    title: "Support",
    path: "mailto:support@devii.io?subject=I need help with…",
    target: "_blank",
  },
  { id: 7, title: "Divider", path: ", target: " },
];

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.action.active,
  textTransform: "inherit",
}));

const UserSettingsMenu = React.forwardRef(() => {
  const dataProvider = useDataProvider();
  const logout = useLogout();
  const theme: Theme = useTheme();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminPage = window.location.href.includes("admin");
  const handleLogoutClick = () => logout();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const iconSwitch = (param: string) => {
    switch (param) {
      case "Admin":
        return <AdminSettingsIcon sx={{ width: "20px" }} />;
      case "Profile":
        return <ProfileIcon sx={{ width: "20px" }} />;
      case "Discord":
        return <DiscordIcon sx={{ width: "20px" }} />;
      case "Documentation":
        return <DocumentationIcon sx={{ width: "20px" }} />;
      case "Support":
        return <SupportIcon sx={{ width: "20px" }} />;
      case "Logout":
        return <LogoutIcon sx={{ width: "20px" }} />;
      default:
        return <ProcessRulesIcon sx={{ width: "20px" }} />;
    }
  };

  const roleid = getStorageItem(ROLE_ID);
  useEffect(() => {
    dataProvider
      .getOne("users", { id: roleid })
      .then(({ data }) => {
        setUser(data);
        setIsAdmin(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setIsAdmin(false);
      });
  }, []);

  // if (loading) return null;

  if (isAdmin) {
    settings = admin_settings;
  }

  return (
    <Stack spacing={2} direction="row">
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
          },
        }}
      >
        <ColorButton
          size="small"
          startIcon={<BugReportOutlinedIcon />}
          color="primary"
          sx={{ fontSize: "0.875rem" }}
        >
          Bug Report
        </ColorButton>
      </Box>

      <DeviiTooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, borderRadius: "50%" }}
          aria-controls="endpoint-menu"
        >
          <Avatar alt="Remy Sharp" src="avatar.svg" />
        </IconButton>
      </DeviiTooltip>

      <Menu
        sx={{
          mt: "45px",
        }}
        id="endpoint-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user ? (
          <div>
            <Typography
              color="primary"
              align="left"
              variant="body1"
              gutterBottom
            >
              {user.first_name} {user.last_name}
            </Typography>
            <Typography
              align="left"
              variant="body2"
              paddingBottom={2}
              sx={{ color: `${theme.palette.text.secondary}70` }}
            >
              {user.email}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography
              color="primary"
              align="left"
              variant="body1"
              gutterBottom
            >
              John Doe
            </Typography>
            <Typography
              align="left"
              variant="body2"
              paddingBottom={2}
              sx={{ color: `${theme.palette.text.secondary}70` }}
            >
              john.doe@devii.com
            </Typography>
          </div>
        )}
        {settings.map((setting: TSettings) =>
          setting.title === "Divider" ? (
            <Divider key={setting.id} sx={{ background: "#A4A4C2" }} />
          ) : setting.navigate || isAdminPage ? (
            <Link
              href={setting.path}
              key={setting.title}
              passHref
              legacyBehavior
            >
              <NextMenuItem
                onClick={handleCloseUserMenu}
                sx={{ pt: 1, pb: 0.5 }}
              >
                {iconSwitch(setting.title)}
                <Typography
                  variant="body2"
                  sx={{
                    ml: 2.5,
                    mb: 0.5,
                  }}
                >
                  <Link href={setting.path}>{setting.title}</Link>
                </Typography>
              </NextMenuItem>
            </Link>
          ) : (
            <MenuItem
              key={setting.title}
              component={RouterLink}
              to={setting.path.replace("/#/", "")}
              target={setting.target}
              onClick={handleCloseUserMenu}
              sx={{ pt: 1, pb: 0.5 }}
            >
              {iconSwitch(setting.title)}

              <Typography
                variant="body2"
                sx={{
                  ml: 2.5,
                  mb: 0.5,
                }}
              >
                {setting.title}
              </Typography>
            </MenuItem>
          )
        )}
        <MenuItem
          key="logout"
          component="a"
          onClick={handleLogoutClick}
          sx={{ pt: 1, pb: 0.5 }}
        >
          {iconSwitch("Logout")}

          <Typography
            variant="body2"
            sx={{
              ml: 2.5,
              mb: 0.5,
            }}
          >
            Logout
          </Typography>
        </MenuItem>

        <Stack
          spacing={1}
          direction="row"
          paddingTop={3}
          justifyContent="center"
        >
          <Typography
            component="a"
            align="left"
            variant="caption"
            target="_blank"
            href="https://www.devii.io/privacy-policy"
            sx={{
              textDecoration: "underline",
              color: `${theme.palette.text.secondary}70`,
            }}
          >
            Privacy Policy
          </Typography>
          <Typography align="left" variant="caption">
            |
          </Typography>
          <Typography
            component="a"
            align="left"
            variant="caption"
            target="_blank"
            href="https://www.devii.io/privacy-policy"
            sx={{
              textDecoration: "underline",
              color: `${theme.palette.text.secondary}70`,
            }}
          >
            Terms of Service
          </Typography>
        </Stack>
      </Menu>
    </Stack>
  );
});

export default UserSettingsMenu;
