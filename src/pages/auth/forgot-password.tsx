import * as React from "react";
import {
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import DeviiLogo from "components/icons/DeviiLogo";
import DeviiRoundBox from "components/base/DeviiRoundBox";
import {
  ForgotPassword as ForgotPasswordForm,
  DeviiAuthFooter,
} from "components/auth";
import { Theme, useTheme } from "@mui/system";

const ForgotPassword = () => {
  //const minWidth: boolean = example as boolean;
  const theme: Theme = useTheme();
  return (
    <>
      <Container component="div" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DeviiLogo
            sx={{
              mb: 1,
              mt: 3,
              display: "block",
              position: "relative",
              mr: "auto",
              ml: "auto",
              height: "auto",
              width: {
                xs: 150,
                sm: 150,
                md: 200,
                lg: 250,
                xl: 250,
              },
            }}
          />
          <DeviiRoundBox
            sx={{
              width: {
                xs: 300,
                sm: 450,
                md: 500,
                lg: 600,
                xl: 600,
              },
            }}
          >
            <Typography
              component="h5"
              variant="h5"
              align="left"
              sx={{ padding: 2 }}
            >
              Forgot Password
            </Typography>
            <Box sx={{ mt: 1 }}>
              <ForgotPasswordForm />
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    RETURN TO LOGIN
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </DeviiRoundBox>
        </Box>
      </Container>
      <DeviiAuthFooter />
    </>
  );
};

export default ForgotPassword;
