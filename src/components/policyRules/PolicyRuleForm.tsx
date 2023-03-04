import React, { useEffect, useState } from "react";
import { DeviiActionButtonGroup, DeviiSelectArrayInput } from "components/base";
import {
  TextInput,
  Form,
  ReferenceArrayInput,
  Link,
  useRecordContext,
} from "react-admin";
import {
  Typography,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Stack,
  InputLabel,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { formRequired, expressionValidation, roleCalssesValidate } from "utils";

const MAX_LENGTH = 2048;

type PolicyRuleFormProps = {
  action: any;
  onCancel: any;
  isLoading: boolean;
  databaseTables: any;
};

const PolicyRuleForm = ({
  action,
  isLoading,
  databaseTables,
  onCancel,
}: PolicyRuleFormProps) => {
  const record = useRecordContext();
  const [values, setValues] = useState({
    name: "",
    global: false,
  });
  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      if (name === "global") {
        setValues((prev: any) => ({
          ...prev,
          [name]: checked,
        }));
      } else {
        setValues((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

  const handleSubmit = (event: any) => {
    const { filter, capabilities, classes, roles, targets, name, id } = event;
    action("policy_rule", {
      data: {
        name,
        targets,
        roles: values.global ? [] : roles || [],
        classes: values.global ? [] : classes || [],
        capabilities,
        filter: filter ? filter.trim() : null,
      },
      id,
    });
  };
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      global: record ? !record.classes.length && !record.roles.length : false,
    }));
  }, [record]);
  return (
    <Form onSubmit={handleSubmit}>
      <Box component="div" sx={{ px: 2 }}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={7}>
            <TextInput
              label="Description"
              source="name"
              fullWidth
              multiline
              maxRows={4}
              validate={[formRequired("Description")]}
              inputProps={{
                maxLength: MAX_LENGTH,
              }}
              helperText={
                values.name.length
                  ? `${
                      MAX_LENGTH - values.name.length
                    }/${MAX_LENGTH} characters remaining`
                  : ""
              }
              disabled={isLoading}
              onChange={handleChange("name")}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={6}>
          <Typography variant="h5">Logic</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={values.global}
                disabled={isLoading}
                onChange={handleChange("global")}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Global"
          />
        </Stack>
        <Grid
          container
          spacing={{
            xs: 0,
            md: 5,
          }}
        >
          <Grid item xs={12} md={6}>
            <Stack direction="row" alignItems="center" spacing={5}>
              <ReferenceArrayInput source="classes" reference="role_class">
                <DeviiSelectArrayInput
                  disabled={values.global || isLoading}
                  margin="normal"
                  label="Role Classes"
                  sx={{
                    width: "100%",
                    ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                  }}
                  color="info"
                  {...(values.global
                    ? {}
                    : {
                        validate: roleCalssesValidate,
                      })}
                />
              </ReferenceArrayInput>
              <InputLabel sx={{ color: "common.white", minWidth: 70 }}>
                <Typography variant="h6">and / or</Typography>
              </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <ReferenceArrayInput source="roles" reference="role">
              <DeviiSelectArrayInput
                disabled={values.global || isLoading}
                margin="normal"
                label="Roles"
                optionText="name"
                sx={{
                  width: "100%",
                  ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                }}
                color="success"
              />
            </ReferenceArrayInput>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <InputLabel sx={{ color: "common.white", width: 50 }}>
                <Typography variant="h6">may</Typography>
              </InputLabel>
              <ReferenceArrayInput
                source="capabilities"
                reference="capability"
                filter={{ defaultFilter: "subset = 'crud'" }}
              >
                <DeviiSelectArrayInput
                  disabled={isLoading}
                  margin="normal"
                  label="Operations"
                  optionText="id"
                  sx={{
                    width: "100%",
                    ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                  }}
                  color="warning"
                  validate={[formRequired("Operations")]}
                />
              </ReferenceArrayInput>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack direction="row" alignItems="center" spacing={5}>
              <InputLabel sx={{ color: "common.white", width: 50 }}>
                <Typography variant="h6">on</Typography>
              </InputLabel>
              <DeviiSelectArrayInput
                disabled={isLoading}
                margin="normal"
                label="Targets"
                source="targets"
                optionText="name"
                sx={{
                  width: "100%",
                  ".MuiSelect-select": { pt: "16.5px", pb: "16.5px" },
                }}
                choices={databaseTables}
                color="error"
                validate={[formRequired("Targets")]}
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "common.white" }}>
            <Typography variant="h6">if</Typography>
          </InputLabel>
          <TextInput
            disabled={isLoading}
            label="Filter Expression"
            source="filter"
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            validate={expressionValidation("Filter expression")}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent={{
            xs: "center",
            sm: "space-between",
          }}
          alignItems="center"
          flexWrap={"wrap"}
        >
          <Link
            to={"/expression"}
            target="blank"
            sx={{ textDecoration: "underline!important" }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Expression language documentation
              <OpenInNewIcon sx={{ width: 16, ml: 0.4, mb: 0.1 }} />
            </Typography>
          </Link>
          <DeviiActionButtonGroup onCancel={onCancel} isLoading={isLoading} />
        </Stack>
      </Box>
    </Form>
  );
};

export default PolicyRuleForm;
