import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Form,
  TextInput,
  SelectInput,
  ReferenceInput,
  FormDataConsumer,
  useGetOne,
} from "react-admin";
import { Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { DeviiRoundBox, DeviiButton, DeviiStepper, DeviiActionButtonGroup } from "components/base";
import { DatabaseType } from "types";
import { formRequired, databaseValidate } from "utils";
import { v4 as uuidv4 } from "uuid";

const steps = ["Credentials", "Whitelist Table"];

const ParameterForm: FunctionComponent<{ id: string; onDelete: Function }> = ({
  id,
  onDelete,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <Grid container spacing={2} sx={{ width: { xs: "90%", md: "70%" } }}>
        <Grid item xs={12} md={6}>
          <TextInput
            margin="normal"
            label="Parameter name"
            source={`parameterName${id}`}
            fullWidth
            sx={{ my: { xs: 0, md: 1 } }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            margin="normal"
            label="Parameter value"
            source={`parameterValue${id}`}
            fullWidth
            sx={{ my: { xs: 0, md: 1 } }}
          />
        </Grid>
      </Grid>
      <IconButton
        sx={{
          mt: {
            xs: "0px!important",
            sm: "6px!important",
            md: "14px!important",
          },
        }}
        onClick={() => onDelete(id)}
      >
        <DeleteIcon
          sx={{ color: "error.shades", width: { xs: "20px", sm: "30px" } }}
        />
      </IconButton>
    </Stack>
  );
};

const CustomPortInput: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useGetOne("database_platforms", { id });
  const [port, setPort] = useState<string>("");
  console.log("data", data.default_port);
  useEffect(() => {
    setPort(data.default_port);
  }, [data]);

  return (
    <TextInput
      margin="normal"
      label="Port"
      source="port"
      fullWidth
      sx={{ my: { xs: 0, md: 1 } }}
      parse={(value: string) => {
        const float = parseFloat(value);
        if (isNaN(float)) return null;
        return float;
      }}
    />
  );
};

const CreateDatabase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [parameters, setParameters] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const handleSubmit = (event: DatabaseType) => {
    console.log("event", event);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onCancel = () => {
    if (activeStep === 0) {
      navigate("/", { replace: true });
    } else {
      handleBack();
    }
  };

  const deleteParameter = (id: string) => {
    const newParameters = parameters.filter(
      (parameter: string) => parameter !== id
    );
    setParameters(newParameters);
  };

  const addParameters = () => {
    setParameters([...parameters, uuidv4()]);
  };

  return (
    <DeviiRoundBox sx={{ p: 4 }}>
      <Stack direction="row" spacing={{ xs: 0, md: 8 }} flexWrap="wrap">
        <Typography color="primary" component="h5" variant="h5" align="left">
          Configure Database
        </Typography>
        <DeviiStepper steps={steps} activeStep={activeStep} />
      </Stack>
      <Form onSubmit={handleSubmit}>
        <Stack direction="column" sx={{ px: 2 }}>
          <Grid container spacing={2} sx={{ width: "90%" }}>
            <Grid item xs={12} md={6}>
              <TextInput
                margin="normal"
                label="Database Name"
                source="name"
                helperText="Letters, numbers, and underscores only"
                fullWidth
                validate={databaseValidate}
                sx={{ my: { xs: 0, md: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                margin="normal"
                label="IP address or URL"
                source="url"
                fullWidth
                validate={formRequired("Database Name")}
                sx={{ my: { xs: 0, md: 1 } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: { xs: "90%", md: "70%" } }}>
            <Grid item xs={12} md={6}>
              <ReferenceInput
                source="database_platform_id"
                reference="database_platforms"
                sx={{ my: { xs: 0, md: 1 }, py: 1.7 }}
                onCHange
              >
                <SelectInput
                  margin="normal"
                  label="Platform"
                  optionText="platform"
                  fullWidth
                  sx={{ my: { xs: 0, md: 1 } }}
                />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormDataConsumer>
                {({ formData, ...rest }) => {
                  const { database_platform_id } = formData;
                  if (!database_platform_id) {
                    return (
                      <TextInput
                        margin="normal"
                        label="Port"
                        source="port"
                        fullWidth
                        sx={{ my: { xs: 0, md: 1 } }}
                        parse={(value: string) => {
                          const float = parseFloat(value);
                          if (isNaN(float)) return null;
                          return float;
                        }}
                      />
                    );
                  }

                  return <CustomPortInput id={database_platform_id} />;
                }}
              </FormDataConsumer>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: { xs: "90%", md: "70%" } }}>
            <Grid item xs={12} md={6}>
              <TextInput
                margin="normal"
                label="Login"
                source="login"
                fullWidth
                sx={{ my: { xs: 0, md: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                type="password"
                margin="normal"
                label="Password"
                source="password"
                fullWidth
                sx={{ my: { xs: 0, md: 1 } }}
              />
            </Grid>
          </Grid>
        </Stack>
        <DeviiButton
          variant="outlined"
          sx={{
            my: 1,
            ml: 2,
            padding: "4px 16px 4px 12px",
            fontSize: "0.875rem",
            letterSpacing: "1px",
          }}
          size="large"
          pill="false"
          onClick={addParameters}
        >
          <AddIcon sx={{ width: 20, mr: 1 }} /> Parameter
        </DeviiButton>
        <Stack direction="column" sx={{ px: 2 }}>
          {parameters.map((parameter: string) => (
            <ParameterForm
              key={parameter}
              id={parameter}
              onDelete={deleteParameter}
            />
          ))}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap={"wrap"}
        >
          <Button onClick={onCancel}>
            <Typography variant="button" color="white">
              Cancel
            </Typography>
          </Button>
          <Typography align="right">
            <DeviiButton
              type="submit"
              variant="outlined"
              sx={{ my: 2, ml: 2, padding: "8px 22px" }}
              size="large"
              pill="false"
            >
              Test Connection
            </DeviiButton>
            <DeviiButton
              onClick={handleNext}
              variant="contained"
              sx={{ my: 2, ml: 2, padding: "8px 22px" }}
              size="large"
              pill="false"
            >
              Next
            </DeviiButton>
          </Typography>
        </Stack>
      </Form>
    </DeviiRoundBox>
  );
};

export default CreateDatabase;
