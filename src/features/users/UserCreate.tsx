import React, { useState } from "react";
import {
  Create,
  CreateProps,
  TextInput,
  Form,
  SelectInput,
  ReferenceInput,
  useDataProvider,
  email,
  useNotify,
  useCreate,
  useRefresh,
} from "react-admin";

import { useNavigate } from "react-router-dom";

import { Typography, Grid } from "@mui/material";

import { DeviiRoundBox, DeviiActionButtonGroup } from "components/base";
import { User } from "types";

import { formRequired } from "utils/dataProvider";
import { messageHandler } from "utils";
interface ICreateProps extends CreateProps<User> {
  onCancel: () => void;
}

const UserCreate = ({ ...props }: ICreateProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const onCancel = () => {
    navigate("/users", { replace: true });
  };
  const [create] = useCreate();

  const handleSubmit = async (event: any) => {
    setLoading(true);
    const {
      first_name,
      last_name,
      email,
      company_name,
      company_size_id,
      referred_by_id,
      user_typeid,
      password,
      phone,
    } = event;

    //Get user_type's role class
    const { data: user_type_record } = await dataProvider.getOne("user_types", {
      id: user_typeid,
    });

    //Save to the database
    const user_data = {
      roleid: 0,
      first_name: first_name,
      last_name: last_name,
      email: email,
      company_name: company_name,
      company_size_id: company_size_id ? Number(company_size_id) : null,
      referred_by_id: referred_by_id ? Number(referred_by_id) : null,
      user_typeid: user_typeid,
      phone: phone,
    };

    const role_data = {
      tenantid: 14,
      login: email,
      name: `${first_name} ${last_name}`,
      password: password,
      capabilities:
        user_typeid === 2
          ? ["admin"]
          : [
              "delete",
              "download",
              "insert",
              "login",
              "select",
              "update",
              "upload",
            ],
      classes: [user_type_record.role_classid],
    };

    // Save Role first to get the roleid to save the user record
    create("role", { data: role_data }, { returnPromise: true })
      .then((result) => {
        //Save new roleid to user data
        user_data.roleid = Number(result.id);
        //Save User record
        create("users", { data: user_data }, { returnPromise: true }).then(
          () => {
            // Back to users list
            messageHandler(notify, "Successfully created", "success", onCancel);
          }
        );
      })
      .catch(() => {
        messageHandler(notify, "Failed to create a user", "error");
      })
      .finally(() => {
        refresh();
        setLoading(false);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <DeviiRoundBox sx={{ p: 4 }}>
          <Typography color="primary" component="h5" variant="h5" align="left">
            Create User
          </Typography>
          <Create>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                  <ReferenceInput source="user_typeid" reference="user_types">
                    <SelectInput
                      margin="normal"
                      label="User Type"
                      optionText="typename"
                      fullWidth
                    />
                  </ReferenceInput>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="First Name"
                    source="first_name"
                    validate={formRequired("First Name")}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="Last Name"
                    source="last_name"
                    validate={formRequired("Last Name")}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="Login/Email"
                    source="email"
                    validate={[formRequired("Email"), email()]}
                    autoComplete="off"
                    fullWidth
                    sx={{ mr: 1 }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="Password"
                    source="password"
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="Company Name"
                    source="company_name"
                    fullWidth
                    sx={{ mr: 1 }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <ReferenceInput
                    source="company_size_id"
                    reference="company_size"
                  >
                    <SelectInput
                      margin="normal"
                      label="Company Size"
                      optionText="value"
                      sx={{
                        width: "100%",
                        ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                      }}
                    />
                  </ReferenceInput>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextInput
                    margin="normal"
                    label="Phone"
                    source="phone"
                    sx={{ width: "100%", mr: 1 }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <ReferenceInput
                    source="referred_by_id"
                    reference="referred_by"
                  >
                    <SelectInput
                      margin="normal"
                      label="Referred By"
                      optionText="value"
                      sx={{
                        width: "100%",
                        ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                      }}
                    />
                  </ReferenceInput>
                </Grid>
              </Grid>
              <DeviiActionButtonGroup
                onCancel={onCancel}
                isLoading={isLoading}
              />
            </Form>
          </Create>
        </DeviiRoundBox>
      </Grid>
    </Grid>
  );
};

export default UserCreate;
