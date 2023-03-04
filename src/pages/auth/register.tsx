import React from "react";

import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { DeviiButton, DeviiRoundBox } from "components/base";
import { DeviiAuthFooter } from "components/auth";
import DeviiLogo from "components/icons/DeviiLogo";

const Register = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          width: {
            xs: 300, // theme.breakpoints.up('xs')
            sm: 450, // theme.breakpoints.up('sm')
            md: 600, // theme.breakpoints.up('md')
            lg: 600, // theme.breakpoints.up('lg')
            xl: 600, // theme.breakpoints.up('xl')
          },
          height: {
            xs: "120vh",
          },
        }}
      >
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
                xs: 150, // theme.breakpoints.up('xs')
                sm: 150, // theme.breakpoints.up('sm')
                md: 200, // theme.breakpoints.up('md')
                lg: 250, // theme.breakpoints.up('lg')
                xl: 250, // theme.breakpoints.up('xl')
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
              Create your Devii Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="firstname"
                    label="First Name"
                    name="fname"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="lastname"
                    label="Last Name"
                    name="lname"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />

              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="company"
                    label="Company"
                    name="company"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="companysize"
                    label="Company Size"
                    name="companysize"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="state"
                    label="State"
                    name="state"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    id="zipcode"
                    label="Zipcode"
                    name="zipcode"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="I Accept the Terms of Service and Privacy Policy"
                sx={{ paddingLeft: 1.5, mt: 1.5 }}
              />
              <DeviiButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1.5, mb: 1 }}
                pill="true"
              >
                Submit
              </DeviiButton>
              <Grid container sx={{ mt: 1, mb: 0.5 }}>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/" variant="body2" sx={{ fontWeight: 500 }}>
                    BACK TO LOGIN
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

export default Register;
