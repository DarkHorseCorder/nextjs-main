import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

type DeviiStepperProps = {
  steps: Array<string>;
  activeStep: number;
};

const DeviiStepper = ({ steps, activeStep }: DeviiStepperProps) => {
  const isStepOptional = (step: number) => {
    return step === 1;
  };
  return (
    <Box sx={{ width: { xs: "100%", md: 450 } }}>
      <Stepper activeStep={activeStep} sx={{ pt: 0 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default DeviiStepper;
