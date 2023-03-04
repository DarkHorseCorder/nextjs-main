/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  useRecordContext,
  useDelete,
  Confirm,
  useNotify,
  useCreate,
  useRefresh,
} from "react-admin";
import { messageHandler } from "utils";
import { DeviiRowMenu } from "components/base";

const UserListRowMenu = () => {
  const navigate = useNavigate();
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const onCloseDeleteDialog = () => setDeleteDialogOpen(false);
  const [isResetDialogOpen, setResetDialogOpen] = useState<boolean>(false);
  const onCloseResetDialog = () => setResetDialogOpen(false);
  const [deleteOne, { isLoading: isDeleteLoading }] = useDelete(
    undefined,
    undefined,
    {
      onError: () =>
        messageHandler(
          notify,
          "Failed to delete",
          "error",
          onCloseDeleteDialog
        ),
      onSuccess: () => {
        refresh();
        messageHandler(
          notify,
          "Successfully deleted",
          "success",
          onCloseDeleteDialog
        );
      },
    }
  );

  const [create, { isLoading: isResetLoading }] = useCreate(
    undefined,
    undefined,
    {
      onError: () =>
        messageHandler(
          notify,
          "Failed to reset password",
          "error",
          onCloseResetDialog
        ),
      onSuccess: () => {
        messageHandler(
          notify,
          "Successfully reset password",
          "success",
          onCloseResetDialog
        );
      },
    }
  );

  const options: Array<{ [key in string]: any }> = [
    {
      action: () => setResetDialogOpen(true),
      title: "Reset Password",
    },
    {
      action: () => navigate(`${record.id}`, { replace: true }),
      title: "Edit User",
    },
    {
      action: () => setDeleteDialogOpen(true),
      title: "Delete User",
    },
  ];

  const handleDeleteConfirm = async () => {
    deleteOne(record.__typename, {
      id: record.id,
      previousData: record,
    });
    deleteOne("role", {
      id: record.id,
    });
  };

  const handleResetConfirm = async () => {
    const password_reset = { email: record.email };
    create("user_password_reset_requests", { data: password_reset });
  };

  return (
    <>
      <DeviiRowMenu options={options} />
      <Confirm
        isOpen={isDeleteDialogOpen}
        loading={isDeleteLoading}
        title={`Delete user`}
        content={`Are you sure you want to delete ${record.first_name} ${record.last_name}?`}
        confirm="Delete"
        ConfirmIcon={DeleteIcon}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <Confirm
        isOpen={isResetDialogOpen}
        loading={isResetLoading}
        title={`Reset Password`}
        content={`Are you sure you want to reset ${record.first_name} ${record.last_name}’s password?`}
        confirm="Yes"
        onConfirm={handleResetConfirm}
        onClose={() => setResetDialogOpen(false)}
      />
    </>
  );
};

export default UserListRowMenu;
