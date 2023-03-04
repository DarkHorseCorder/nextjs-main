import React from "react";
import { EditProps, EditBase, Form, TextInput } from "react-admin";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { DeviiRoundBox, DeviiActionButtonGroup } from "components/base";

import { RoleClass } from "types";

interface RoleClassProps extends EditProps<RoleClass> {
  onCancel: () => void;
}

const RoleClassEdit = ({ onCancel, ...props }: RoleClassProps) => {
  return (
    <EditBase resource="role_class">
      <Stack sx={{ marginTop: "40px" }} direction="column" p={1}>
        <DeviiRoundBox>
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
          <Typography color="primary" component="h5" variant="h5" align="left">
            Edit Role Class
          </Typography>
          <Form>
            <TextInput
              label="Class Name"
              margin="normal"
              source="name"
              required
              fullWidth
            />
            {/* <ReferenceInput
              margin="normal"
              source="referred_by_id"
              reference="referred_by">
              <SelectInput
              margin="normal"
              label="Referred By"
              optionText="value"
              fullWidth
              />
            </ReferenceInput> */}
            <DeviiActionButtonGroup onCancel={onCancel} />
          </Form>
        </DeviiRoundBox>
      </Stack>
    </EditBase>
  );
};

export default RoleClassEdit;
