import React from "react";
import {
  EditProps,
  EditBase,
  Form,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { Typography, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeviiRoundBox, DeviiActionButtonGroup } from "components/base";
import { Role } from "types";

interface RoleProps extends EditProps<Role> {
  onCancel: () => void;
}

const RoleEdit = ({ onCancel, ...props }: RoleProps) => {
  return (
    <EditBase resource="role">
      <Stack sx={{ marginTop: "40px" }} direction="column" p={1}>
        <DeviiRoundBox>
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
          <Typography color="primary" component="h5" variant="h5" align="left">
            Edit Role
          </Typography>
          <Form>
            <TextInput
              label="Name"
              margin="normal"
              source="name"
              required
              fullWidth
            />
            <TextInput
              label="Login"
              margin="normal"
              source="login"
              required
              fullWidth
              disabled
            />
            <ReferenceArrayInput
              margin="normal"
              source="classes.classid"
              reference="role_class"
            >
              <SelectArrayInput
                margin="normal"
                label="Role Classes"
                optionText="name"
                fullWidth
              />
            </ReferenceArrayInput>
            <DeviiActionButtonGroup onCancel={onCancel} />
          </Form>
        </DeviiRoundBox>
      </Stack>
    </EditBase>
  );
};

export default RoleEdit;
