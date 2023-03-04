import React, { useState, useEffect } from "react";
import {
  useDataProvider,
  Form,
  TextInput,
  SelectInput,
  ReferenceInput,
  email,
  useUpdate,
  useNotify,
} from "react-admin";

import DeviiRoundBox from "components/base/DeviiRoundBox";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";

import { ChangePassword } from "components/auth";
import { User } from "types";
import { getStorageItem } from "utils/auth";
import { ROLE_ID } from "../../constants";
import { formRequired } from "utils/dataProvider";
import { UpdateProfileImage } from "components/profile";
import { messageHandler } from "utils";
import { omit } from "underscore";

const roleid = getStorageItem(ROLE_ID);

const Profile = () => {
  const dataProvider = useDataProvider();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const notify = useNotify();
  const [isEditable, setIsEditable] = useState(false);
  const [update, { isLoading: isUpdateLoading }] = useUpdate(
    undefined,
    undefined,
    {
      onError: () =>
        messageHandler(notify, "Failed to update user profile", "error"),
      onSuccess: () =>
        messageHandler(notify, "Successfully updated user profile", "success"),
    }
  );
  const [error, setError] = useState();
  const [openChangePassword, setOpenChangePassword] = useState(false); // Controls modal
  const [openProfileImageUpload, setOpenProfileImageUpload] = useState(false); // Controls modal

  useEffect(() => {
    dataProvider
      .getOne("users", { id: roleid })
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const onCancel = () => {
    setOpenChangePassword(false);
  };

  const handleSubmit = async (event: any) => {
    const { referred_by_id, first_name, last_name, id, email } = event;
    const eventData = omit(event, [
      "__typename",
      "id",
      "createtime",
      "referred_by_other",
      "state",
      "zipcode",
    ]);
    const role_data = {
      tenantid: 14,
      login: email,
      name: `${first_name} ${last_name}`,
    };
    update(
      "role",
      { data: role_data, id },
      {
        onError: () =>
          messageHandler(notify, "Failed to update the role", "error"),
        onSuccess: () =>
          messageHandler(notify, "Successfully updated role", "success"),
      }
    );
    update("users", {
      data: {
        ...eventData,
        id: roleid,
        referred_by_id: referred_by_id || null,
      },
      id: roleid,
    });
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      setIsEditable(true);
    }, 0);
  };

  if (loading) return null;
  //   if (loading) return <Loading />;
  //   if (error) return <Error />;
  if (!user) return null;

  return (
    <>
      <Dialog
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" sx={{ p: 3.75, pb: 2 }}>
          Change Password
        </DialogTitle>
        <DialogContent sx={{ p: "16px!important" }}>
          <ChangePassword onCancel={onCancel} user={user} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openProfileImageUpload}
        onClose={() => setOpenProfileImageUpload(false)}
        aria-labelledby="profile-image-upload"
      >
        <DialogTitle id="profile-image-upload">
          Update Profile Image
        </DialogTitle>
        <DialogContent>
          <UpdateProfileImage
            onCancel={() => setOpenProfileImageUpload(false)}
          />
        </DialogContent>
      </Dialog>

      <DeviiRoundBox
        sx={{
          width: {
            xs: 300,
            sm: 450,
            md: 500,
            lg: 600,
            xl: 600,
          },
          p: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color="primary" component="h5" variant="h5" align="left">
            Profile
          </Typography>
          <IconButton
            sx={{
              p: 0,
              position: "relative",
              "& .MuiAvatar-img": {
                filter: "grayscale(0) blur(0)",
                transition: ".3s ease-in-out",
              },
              "& .MuiTypography-root": {
                opacity: 0,
              },
              "&:hover .MuiTypography-root": {
                opacity: 1,
              },
              "&:hover .MuiAvatar-img": {
                filter: "grayscale(100%) blur(1px)",
                opacity: 0.8,
              },
              borderRadius: "50%",
            }}
            aria-controls="endpoint-menu"
            onClick={() => setOpenProfileImageUpload(true)}
          >
            <Avatar
              alt="Remy Sharp"
              src="avatar.svg"
              sx={{ width: 67, height: 67 }}
            />
            <Typography
              variant="caption"
              color="common.white"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "500",
              }}
            >
              Change
            </Typography>
          </IconButton>
        </Stack>
        <Form record={user} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextInput
                margin="normal"
                source="first_name"
                validate={formRequired("First Name")}
                fullWidth
                disabled={!isEditable}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextInput
                margin="normal"
                source="last_name"
                validate={formRequired("Last Name")}
                fullWidth
                disabled={!isEditable}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={7}>
              <TextInput
                margin="normal"
                source="email"
                fullWidth
                validate={[formRequired("Email"), email()]}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item sm={5}>
              <TextInput
                margin="normal"
                source="phone"
                fullWidth
                disabled={!isEditable}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={12} md={7}>
              <TextInput
                margin="normal"
                source="company_name"
                fullWidth
                disabled={!isEditable}
              />
            </Grid>
            <Grid item sm={12} md={5}>
              <ReferenceInput
                margin="normal"
                source="company_size_id"
                reference="company_size"
              >
                <SelectInput
                  margin="normal"
                  label="Company Size"
                  optionText="value"
                  disabled={!isEditable}
                  fullWidth
                />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Typography align="right">
              {isEditable ? (
                <Button
                  type="submit"
                  color="primary"
                  aria-label="edit_profile"
                  sx={{ letterSpacing: "0.5px", mr: 1 }}
                  disabled={isUpdateLoading || loading}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  type="button"
                  color="primary"
                  aria-label="edit_profile"
                  sx={{ letterSpacing: "0.5px", mr: 1 }}
                  onClick={handleButtonClick}
                >
                  Edit Profile
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                aria-label="change_password"
                onClick={() => setOpenChangePassword(true)}
                sx={{ borderRadius: 3.75, py: 0.5, letterSpacing: "0.5px" }}
              >
                Change Password
              </Button>
            </Typography>
          </Stack>
        </Form>
      </DeviiRoundBox>
    </>
  );
};

export default Profile;
