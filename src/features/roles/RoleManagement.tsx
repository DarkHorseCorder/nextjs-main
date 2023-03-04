import React, { useCallback } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  useRecordContext,
  FunctionField,
} from "react-admin";

import {
  Box,
  Drawer,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import {
  DeviiListActions,
  DeviiProgress,
  DeviiRoundBox,
  DeviiRowMenu,
  ListPagination,
  DeviiChip,
} from "components/base";

import TableMenuIcon from "../../../public/icons/TableMenuButton.svg";

import RoleEdit from "./RoleEdit";
import RoleClassEdit from "./RoleClassEdit";

const RoleManagement = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const TestIconButton = (props: any) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const TableMenuItem = (props: any) => {
      const record = useRecordContext();
      const handleClick = () => {
        //console.log(record.id);
        setAnchorElUser(null);
        switch (props.id) {
          case "edit_role":
            navigate(`role/${record.id}`, { replace: true });
            break;
          case "edit_role_class":
            navigate(`role_class/${record.id}`, { replace: true });
            break;
          case "role_class_members":
            //Filter role table by classid
            console.log("Filter role table by classid");
            break;
        }
      };
      return (
        <MenuItem key={props.id} component="a" onClick={handleClick}>
          {props.label}
        </MenuItem>
      );
    };

    const resourceSwitch = (resource: string) => {
      switch (resource) {
        case "role":
          return (
            <div key={resource}>
              <TableMenuItem id="edit_role" component="a" label="Edit Role" />
              <TableMenuItem
                id="reset_password"
                component="a"
                label="Change Password"
              />
              <TableMenuItem
                id="delete_role"
                component="a"
                label="Delete Role"
              />
            </div>
          );
        case "role_class":
          return (
            <div key={resource}>
              <TableMenuItem
                id="role_class_members"
                component="a"
                label="Members"
              />

              <TableMenuItem
                id="edit_role_class"
                component="a"
                label="Edit Class"
              />

              <TableMenuItem
                id="delete_role_class"
                component="a"
                label="Delete Class"
              />
            </div>
          );
      }
    };

    return (
      <>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <TableMenuIcon></TableMenuIcon>
        </IconButton>

        <Menu
          sx={{ mt: "25px" }}
          id="menu_user_actions"
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
          {resourceSwitch(props.resource)}
        </Menu>
      </>
    );
  };

  const handleClose = useCallback(() => {
    navigate("/role_management");
  }, [navigate]);

  const role_match = matchPath("role_management/role/:id", location.pathname);
  const role_class_match = matchPath(
    "role_management/role_class/:id",
    location.pathname
  );

  return (
    <>
      <DeviiRoundBox sx={{ width: "520px", marginBottom: 5, p: 4 }}>
        <Typography
          color="primary"
          component="p"
          variant="h5"
          align="left"
          display="block"
          gutterBottom
        >
          Role Classes
        </Typography>
        <List
          resource="role_class"
          {...props}
          pagination={<ListPagination />}
          actions={
            <DeviiListActions
              refresh={false}
              export={false}
              title="Role Classes"
              filters={{
                main: "name",
              }}
            />
          }
        >
          <Datagrid
            optimized
            bulkActionButtons={false}
            sx={{
              "& .RaDatagrid-thead": {
                display: "none",
              },
            }}
          >
            <TextField label="" source="name" />
            <TestIconButton resource="role_class"></TestIconButton>
          </Datagrid>
        </List>
      </DeviiRoundBox>
      <Drawer
        PaperProps={{
          sx: { width: "20%" },
        }}
        variant="persistent"
        open={!!role_class_match}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 100, width: 100 }}
      >
        {/* To avoid any errors if the route does not match, we don"t render at all the component in this case */}
        {!!role_class_match && (
          <RoleClassEdit
            id={(role_class_match as any).params.id}
            onCancel={handleClose}
            {...props}
          />
        )}
      </Drawer>

      {/* Role List */}
      <DeviiRoundBox sx={{ p: 4 }}>
        <Typography
          color="primary"
          component="p"
          variant="h5"
          align="left"
          display="block"
          gutterBottom
        >
          Roles
        </Typography>
        <List
          resource="role"
          {...props}
          pagination={<ListPagination />}
          actions={
            <DeviiListActions
              refresh={false}
              export={false}
              title="Role Classes"
              filters={{
                main: "name",
              }}
            />
          }
        >
          <Datagrid optimized bulkActionButtons={false}>
            <TextField label="Role ID" source="id" />
            <TextField label="Name" source="name" />
            <TextField label="Login" source="login" />

            <FunctionField
              label=""
              render={(record: any) => {
                return (
                  <DeviiChip
                    label={
                      <span>
                        Role Classes{" "}
                        <IconButton>{record.classes.length}</IconButton>
                      </span>
                    }
                    disabled={!record.classes.length}
                    color="info"
                  />
                );
              }}
            />
            <ReferenceField
              label="Creator"
              source="creatorid"
              reference="role"
              link={false}
            >
              <TextField source="name" />
            </ReferenceField>
            <DateField label="Created" source="createtime" />
            <TestIconButton resource="role"></TestIconButton>
          </Datagrid>
        </List>
      </DeviiRoundBox>
      <Drawer
        PaperProps={{
          sx: { width: "20%" },
        }}
        variant="persistent"
        open={!!role_match}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 100, width: 100 }}
      >
        {/* To avoid any errors if the route does not match, we don"t render at all the component in this case */}
        {!!role_match && (
          <RoleEdit
            id={(role_match as any).params.id}
            onCancel={handleClose}
            {...props}
          />
        )}
      </Drawer>
    </>
  );
};

export default RoleManagement;
