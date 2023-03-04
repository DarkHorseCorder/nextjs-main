import React, { ReactNode, useMemo } from "react";
import { Box, List, ListItem } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Link from "next/link";
import MenuWrapper from "./MenuWrapper";
import SubMenuWrapper from "./SubMenuWrapper";
import DeviiButton from "../../components/base/DeviiButton";
import { databaseRoutes, dbPath, MenuItem, menuItems } from "./menuItems";
import { DeviiTooltip } from "components/base";
import { useSidebarState } from "react-admin";
import { getSubPath } from "utils";

interface Props {
  component: string;
  startIcon: any;
  className: any;
  children?: ReactNode;
  pill: string;
}

export type Ref = HTMLButtonElement;

// eslint-disable-next-line react/display-name
const NextDeviiButton = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <DeviiButton {...props} ref={ref}>
      {props.children}
    </DeviiButton>
  );
});

const DeviiMenu = () => {
  const [open] = useSidebarState();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = window.location.href.includes("admin");
  const isDatabasePage = location.pathname.includes(databaseRoutes[0]);
  console.log("location.pathname====>", location.pathname);
  console.log("databaseRoutes[0]====>", databaseRoutes[0]);
  console.log("isDatabasepage", isDatabasePage);
  const mItems = useMemo(() => {
    return menuItems(location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div" sx={{ mb: 2 }}>
              <ListItem
                key="dashboard"
                component="div"
                sx={{
                  width: "220px",
                }}
              >
                <DeviiTooltip
                  title={open ? "" : "dashboard"}
                  placement={open ? "bottom" : "bottom-start"}
                >
                  {isAdmin ? (
                    <Link href="/#/project">
                      <NextDeviiButton
                        component="button"
                        startIcon={<DashboardIcon />}
                        pill="true"
                      >
                        Databases
                      </NextDeviiButton>
                    </Link>
                  ) : (
                    <DeviiButton
                      component="button"
                      startIcon={<DashboardIcon />}
                      pill="true"
                      onClick={() => {
                        navigate(
                          `${
                            isDatabasePage
                              ? getSubPath(location.pathname, dbPath)
                              : "project"
                          }`
                        );
                      }}
                      className={
                        matchPath("/project", location.pathname) ||
                        matchPath("/project/database/:id", location.pathname)
                          ? "active"
                          : ""
                      }
                    >
                      {isDatabasePage ? "Dashboard" : "Databases"}
                    </DeviiButton>
                  )}
                </DeviiTooltip>
              </ListItem>
            </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            {mItems.map((mItem: MenuItem) => {
              return mItem.group.some((route) =>
                location.pathname.includes(route)
              ) ? (
                <List key={mItem.id} component="div">
                  <ListItem component="div">
                    <DeviiTooltip
                      title={open ? "" : mItem.name}
                      placement={open ? "bottom" : "bottom-start"}
                    >
                      <DeviiButton
                        component={RouterLink}
                        to={mItem.link}
                        startIcon={mItem.icon}
                        pill="true"
                      >
                        {mItem.name}
                      </DeviiButton>
                    </DeviiTooltip>
                  </ListItem>
                </List>
              ) : (
                <span key={mItem.id} />
              );
            })}
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </Box>
  );
};

export default DeviiMenu;
