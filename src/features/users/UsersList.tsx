/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Button,
  CreateButton,
  ListContextProvider,
  useGetList,
  useList,
} from "react-admin";

import { Box, Drawer, Typography } from "@mui/material";

import UserEdit from "./UserEdit";
import {
  DeviiListActions,
  DeviiProgress,
  DeviiRoundBox,
  ListPagination,
} from "components/base";
import UserListRowMenu from "./UserListRowMenu";

const UsersList = (props: any) => {
  const { data, isLoading } = useGetList("users");
  const listContext = useList({ data, isLoading });
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = useCallback(() => {
    navigate("/users");
  }, [navigate]);

  const match = matchPath("/users/:id", location.pathname);

  const Empty = () => (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        No Users available or Query issue
      </Typography>
      <Typography variant="body1">Clear Filters</Typography>
      <Button label="Clear Filters"></Button>

      <Typography variant="body1">Create one</Typography>
      <CreateButton />
    </Box>
  );

  return (
    <ListContextProvider value={listContext}>
      {!isLoading ? (
        <DeviiRoundBox sx={{ p: 4 }}>
          <Typography
            color="primary"
            component="p"
            variant="h5"
            align="left"
            display="block"
            gutterBottom
          >
            Users
          </Typography>
          <List
            {...props}
            pagination={<ListPagination />}
            empty={<Empty />}
            actions={
              <DeviiListActions
                title="User"
                filters={{
                  main: "search",
                }}
              />
            }
            sx={{
              ".RaList-content": {
                backgroundColor: "#02254e",
                boxShadow: "none",
              },
            }}
          >
            <Datagrid bulkActionButtons={false}>
              {/* <TextField label="Role ID" source="id" /> */}
              <TextField label="First Name" source="first_name" />
              <TextField label="Last Name" source="last_name" />
              <TextField label="Email" source="email" />
              <TextField label="Phone" source="phone" />
              <TextField label="Company Name" source="company_name" />
              <ReferenceField
                label="Company Size"
                source="company_size_id"
                reference="company_size"
                link={false}
              >
                <TextField source="value" />
              </ReferenceField>
              <ReferenceField
                label="Referred By"
                source="referred_by_id"
                reference="referred_by"
                link={false}
              >
                <TextField source="value" />
              </ReferenceField>
              <UserListRowMenu />
            </Datagrid>
          </List>
        </DeviiRoundBox>
      ) : (
        <DeviiProgress />
      )}
      <Drawer
        PaperProps={{
          sx: { width: "20%" },
        }}
        variant="persistent"
        open={!!match}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 100, width: 100 }}
      >
        {/* To avoid any errors if the route does not match, we don"t render at all the component in this case */}
        {!!match && (
          <UserEdit
            id={(match as any).params.id}
            onCancel={handleClose}
            {...props}
          />
        )}
      </Drawer>
    </ListContextProvider>
  );
};

export default UsersList;
