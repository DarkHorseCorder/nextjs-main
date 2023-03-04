import React, { useState } from "react";

import { Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/system";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DeviiButton from "components/base/DeviiButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [requestSuccessful, setRequestSuccessful] = useState(false);
  const theme: Theme = useTheme();

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // your submit logic
    const data = new FormData(event.target);
    console.log(" FORGOT PASSWORD SUBMIT! ");
    const email_address = data.get("email");
    if (email_address) {
      //Initialize variables
      let myHeaders = new Headers();
      let formdata = new FormData();

      formdata.append("login", "devii_nobody");
      formdata.append("password", `jBAxInLcmwJxYs`);
      formdata.append("tenantid", "14");

      // Set any request options
      let requestOptions = {
        method: "POST",
        body: formdata,
      };

      // Login to the ToDo Devii database
      fetch("https://pxdbdev.devii.io/auth", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const result_json = JSON.parse(result);
          const { roleid, access_token } = result_json;
          const query_url = result_json.routes.query;

          // Set the authorization and content type in the header
          myHeaders.append("Authorization", `Bearer ${access_token}`);
          myHeaders.append("Content-Type", "application/json");

          // Create graphql query
          const graphql = JSON.stringify({
            query: `mutation {
            create_user_password_reset_requests(input: { email: "${email_address}" }) {
              email
            }}
          `,
            variables: {},
          });

          // Set any request options
          let queryRequestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
          };

          // Fetch tasks using the query url
          fetch(query_url, queryRequestOptions)
            .then((response) => response.text())
            .then((result) => {
              //Review the results
              const result_json = JSON.parse(result);
              console.log(result_json);
              // window.location.href = "/";
              setRequestSuccessful(true);

            })
            .catch((error) => {
              console.log("error", error);
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return !requestSuccessful ? (
    <>
      <Typography
        component="div"
        variant="body2"
        align="left"
        sx={{
          paddingLeft: 2,
          color: `${theme.palette.text.secondary}70`,
        }}
      >
        Enter the email associated with your account.
      </Typography>
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          margin="normal"
          fullWidth
          onChange={handleChange}
          id="email"
          label="Email Address"
          name="email"
          validators={["isEmail", "required"]}
          errorMessages={[
            "must be a valid Email address",
            "this field is required",
          ]}
          value={email}
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
      </ValidatorForm>
    </>
  ) : (
    <div>
      {" "}
      If there is an account associated with this email address, we will send
      you an email to reset your password. You may need to check your spam or
      junk folder.
    </div>
  );
};

export default ForgotPassword;
