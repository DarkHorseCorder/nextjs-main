import React, { useState } from "react";
import {
  EditProps,
  EditBase,
  Form,
  TextInput,
  SelectInput,
  ReferenceInput,
  email,
  useUpdate,
  useNotify,
  useDataProvider,
  useRefresh,
} from "react-admin";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DeviiRoundBox, DeviiActionButtonGroup } from "components/base";
import { User } from "types";
import { formRequired } from "utils/dataProvider";
import { messageHandler } from "utils";
interface Props extends EditProps<User> {
  onCancel: () => void;
}

const UserEdit = ({ onCancel, ...props }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const [update, { isLoading: isUpdating }] = useUpdate();
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
      phone,
      id,
    } = event;

    //Get user_type's role class
    const { data: user_type_record } = await dataProvider.getOne("user_types", {
      id: user_typeid,
    });
    setLoading(false);

    //Save to the database
    const user_data = {
      id,
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
    update(
      "role",
      { data: role_data, id },
      {
        onError: () =>
          messageHandler(notify, "Failed to update the role", "error"),
        onSuccess: () =>
          messageHandler(notify, "Successfully updated role", "success"),
      }
    );
    update(
      "users",
      { data: user_data, id },
      {
        onError: () =>
          messageHandler(notify, "Failed to update the user", "error"),
        onSuccess: () => {
          refresh();
          messageHandler(
            notify,
            "Successfully updated the user",
            "success",
            onCancel
          );
        },
      }
    );
    setLoading(false);
  };

  return (
    <EditBase {...props}>
      <Stack sx={{ marginTop: 8 }} direction="column" p={1}>
        <DeviiRoundBox>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={onCancel} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography color="primary" component="h5" variant="h5" align="left">
            Edit Devii User
          </Typography>
          <Form onSubmit={handleSubmit}>
            <ReferenceInput source="user_typeid" reference="user_types">
              <SelectInput
                margin="normal"
                label="User Type"
                optionText="typename"
                fullWidth
              />
            </ReferenceInput>
            <TextInput
              margin="normal"
              source="first_name"
              validate={formRequired("First Name")}
              fullWidth
            />
            <TextInput
              margin="normal"
              source="last_name"
              validate={formRequired("First Name")}
              fullWidth
            />
            <TextInput
              margin="normal"
              source="email"
              validate={[formRequired("Email"), email()]}
              fullWidth
            />
            <TextInput margin="normal" source="company_name" fullWidth />
            <ReferenceInput
              margin="normal"
              source="company_size_id"
              reference="company_size"
            >
              <SelectInput
                margin="normal"
                label="Company Size"
                optionText="value"
                fullWidth
              />
            </ReferenceInput>
            <TextInput margin="normal" source="phone" fullWidth />
            <ReferenceInput
              margin="normal"
              source="referred_by_id"
              reference="referred_by"
            >
              <SelectInput
                margin="normal"
                label="Referred By"
                optionText="value"
                fullWidth
              />
            </ReferenceInput>

            <DeviiActionButtonGroup
              onCancel={onCancel}
              isLoading={isLoading || isUpdating}
            />
          </Form>
        </DeviiRoundBox>
      </Stack>
    </EditBase>
  );
};

export default UserEdit;
