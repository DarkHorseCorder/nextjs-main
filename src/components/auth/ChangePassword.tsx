import React, { useState } from "react";
import {
  TextInput,
  Form,
  useUpdate,
  useDataProvider,
  useNotify,
} from "react-admin";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import { DeviiActionButtonGroup } from "components/base";
import {
  confirmPasswordValidation,
  formRequired,
  newPasswordValidation,
} from "utils/dataProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { BASE_URL } from "../../constants";
import { messageHandler } from "utils";

type TVisibility = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

const ChangePassword = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [update] = useUpdate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const handleSubmit = (event: any) => {
    const { current_password, new_password } = event;
    // Check if current password matches
    const { email, user_typeid, first_name, last_name, id } = props.user;
    const request = new Request(`${BASE_URL}/auth`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        login: email,
        password: current_password,
        tenantid: 14,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    setIsLoading(true);
    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then(async (responseJSON) => {
        // Response.
        const { status, error } = responseJSON;

        if (status < 200 || status >= 300) {
          throw new Error(error);
        }
        setErrorMsg("");
        //Get user_type's role class
        const { data: user_type_record } = await dataProvider.getOne(
          "user_types",
          {
            id: user_typeid,
          }
        );
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
          password: new_password,
        };
        update(
          "role",
          { data: role_data, id },
          {
            onError: () =>
              messageHandler(notify, "Failed to change password", "error"),
            onSuccess: () =>
              messageHandler(
                notify,
                "Successfully changed password",
                "success",
                props.onCancel
              ),
          }
        );
      })
      .catch((error) => {
        setErrorMsg("Current Password is Invalid");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [showValues, setShowValues] = useState<TVisibility>({
    current: false,
    new: false,
    confirm: false,
  });

  const handleVisibility = (type: any, value: boolean) => {
    setShowValues((prev: TVisibility) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <TextInput
            className={errorMsg ? "error" : ""}
            label="Current password"
            type={showValues.current ? "text" : "password"}
            autoComplete="new-password"
            source="current_password"
            validate={formRequired("Current Password")}
            fullWidth
            helperText={errorMsg}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="current password visibility"
                    name="current"
                    onMouseDown={() => handleVisibility("current", true)}
                    onMouseUp={() => handleVisibility("current", false)}
                  >
                    {showValues.current ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextInput
            label="New password"
            type={showValues.new ? "text" : "password"}
            autoComplete="new-password"
            source="new_password"
            validate={newPasswordValidation}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="new password visibility"
                    name="new"
                    onMouseDown={() => handleVisibility("new", true)}
                    onMouseUp={() => handleVisibility("new", false)}
                  >
                    {showValues.new ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextInput
            label="Confirm new password"
            type={showValues.confirm ? "text" : "password"}
            autoComplete="new-password"
            source="confirm_password"
            validate={confirmPasswordValidation}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="confirm password visibility"
                    name="confirm"
                    onMouseDown={() => handleVisibility("confirm", true)}
                    onMouseUp={() => handleVisibility("confirm", false)}
                  >
                    {showValues.confirm ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
      </Grid>

      <DeviiActionButtonGroup onCancel={props.onCancel} isLoading={isLoading} />
    </Form>
  );
};

export default ChangePassword;
