import React, { useState } from "react";
import {
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useLogin, useNotify } from "react-admin";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { DeviiButton, DeviiProgress, DeviiRoundBox } from "components/base";
import DeviiLogo from "components/icons/DeviiLogo";
import { DeviiAuthFooter } from "components/auth";
import { styles } from "./style";

const LoginPage = () => {
  type FormData = { email: string; password: string; remember: boolean };
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  });
  const notify = useNotify();
  const login = useLogin();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (name === "remember") {
      setData((prev: FormData) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setData((prev: FormData) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, remember } = data;
    setIsloading(true);
    await login({
      email,
      password,
      remember,
    }).catch((error: Error) => {
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message.split(": ")[1]
          ? "ra.auth.sign_in_error"
          : error.message.split(": ")[1],
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message.split(": ")[1]
                ? error.message.split(": ")[1]
                : undefined,
          },
        }
      );
    });
    setIsloading(false);
  };

  return (
    <Container component="div" sx={styles.container}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DeviiLogo sx={styles.logo} />
        <DeviiRoundBox
          sx={{
            width: {
              xs: 300,
              sm: 450,
              md: 600,
            },
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            align="left"
            sx={{ pt: 2.75, pb: 1.75, px: 1.75 }}
          >
            Login
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              margin="normal"
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              validators={["isEmail", "required"]}
              onChange={handleChange}
              errorMessages={["Invalid Email address", "Email is required"]}
              value={data.email}
            />
            <TextValidator
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              validators={["required"]}
              errorMessages={["Invalid Password"]}
              onChange={handleChange}
              value={data.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  value="remember"
                  color="primary"
                  onChange={handleChange}
                />
              }
              label="Remember Me"
              sx={{ paddingLeft: 1 }}
            />
            <DeviiButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1.5, mb: 1 }}
              pill="true"
              disabled={isLoading}
            >
              Sign In
            </DeviiButton>
            {isLoading && <DeviiProgress />}
            <Grid container sx={{ mt: 1, mb: 1 }}>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="/auth/forgot-password.html"
                  variant="body2"
                  sx={{ mr: 1.5, fontWeight: 500 }}
                >
                  FORGOT PASSWORD?
                </Link>
                <Link
                  href="/auth/register.html"
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                >
                  CREATE ACCOUNT
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </DeviiRoundBox>
      </Box>
      <DeviiAuthFooter />
    </Container>
  );
};

export default LoginPage;
