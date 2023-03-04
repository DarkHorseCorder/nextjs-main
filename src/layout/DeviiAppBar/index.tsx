import React, { useMemo } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Breadcrumbs,
} from "@mui/material";
import { useSidebarState } from "react-admin";
import HomeIcon from "@mui/icons-material/Home";
import ToggleSidebar from "./ToggleSidebar";
import UserSettingsMenu from "./UserSettingsMenu";
import DeviiLogo from "../../../public/DeviiLogo.svg";
import DeviiLogoCollapse from "../../../public/DeviiLogoCollapse.svg";
import { DeviiTooltip } from "components/base";
import routes from "routes";
import { capitalizeFirstLetter, getSubPath } from "utils";

type TBreadCrumb = {
  item: React.ReactElement | string;
  to: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeviiAppBar = (props: any) => {
  const breadCrumbs: Array<TBreadCrumb> = [
    {
      item: (
        <DeviiTooltip title="Home">
          <HomeIcon sx={{ fontSize: "1rem", mt: 1 }} />
        </DeviiTooltip>
      ),
      to: "/",
    },
  ];
  const handleBreadClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  const [open] = useSidebarState();
  const location = useLocation();
  if (window.location.pathname != "/") {
    breadCrumbs.push({
      item: capitalizeFirstLetter(window.location.pathname.replace("/", "")),
      to: "/",
    });
  }
  const crumbs = useMemo(() => {
    const matchRoute = routes.filter(({ path }) => {
      const match = matchPath(path, location.pathname);
      return !!match;
    })[0];
    return routes
      .filter(({ path }) => matchRoute?.path?.includes(path))
      .map(({ path, ...rest }) => {
        const matchParams = matchPath(
          path,
          getSubPath(location.pathname, path)
        )?.params;
        return {
          path: Object.keys(matchParams ?? {}).length
            ? Object.keys(matchParams).reduce(
                (path, param) => path.replace(`:${param}`, matchParams[param]),
                path
              )
            : path,
          ...rest,
        };
      });
  }, [location.pathname]);
  return (
    <AppBar
      {...props}
      color="secondary"
      enableColorOnDark
      elevation={1}
      position="fixed"
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          {open ? (
            <Box // The Logo
              sx={{
                width: {
                  xs: 150, // theme.breakpoints.up('xs')
                  sm: 215, // theme.breakpoints.up('sm')
                },
                height: {
                  xs: 25, // theme.breakpoints.up('xs')
                  sm: 25, // theme.breakpoints.up('sm')
                  md: 25, // theme.breakpoints.up('md')
                  lg: 25, // theme.breakpoints.up('lg')
                  xl: 25, // theme.breakpoints.up('xl')
                },
                ml: 2,
                mr: 1,
                display: {
                  xs: "flex",
                },
              }}
            >
              <DeviiLogo />
            </Box>
          ) : (
            <Box // The Logo
              sx={{
                width: 30,
                height: 25,
                ml: 2,
                mr: 1,
                display: {
                  xs: "flex",
                },
              }}
            >
              <DeviiLogoCollapse />
            </Box>
          )}

          <Box sx={{ mr: 0, ml: 0, display: { xs: "flex" } }}>
            <ToggleSidebar />
          </Box>

          <Box
            sx={{
              mr: 0,
              ml: 1,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <div role="presentation" onClick={handleBreadClick}>
              <Breadcrumbs aria-label="breadcrumb">
                {breadCrumbs.map((page: TBreadCrumb) => (
                  <Link key="home_link" color="text.light" to={page.to}>
                    {page.item}
                  </Link>
                ))}
                {crumbs.map(({ name, path }, key) =>
                  key + 1 === crumbs.length ? (
                    <Typography
                      key={key}
                      sx={{
                        flex: 1,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                      color="text.light"
                    >
                      {name}
                    </Typography>
                  ) : (
                    <Link key={key} to={path}>
                      {name}
                    </Link>
                  )
                )}
              </Breadcrumbs>
            </div>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }} />

          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <UserSettingsMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DeviiAppBar;
