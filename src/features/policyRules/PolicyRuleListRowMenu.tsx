/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecordContext, useDelete, Confirm, useNotify } from "react-admin";
import { messageHandler } from "utils";
import { DeviiRowMenu } from "components/base";

const PolicyRuleListRowMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = useRecordContext();
  const notify = useNotify();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const onCloseDeleteDialog = () => setDeleteDialogOpen(false);
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
      onSuccess: () =>
        messageHandler(
          notify,
          "Successfully deleted",
          "success",
          onCloseDeleteDialog
        ),
    }
  );

  const options: Array<{ [key in string]: any }> = [
    {
      action: () => navigate(`${record.id}`, { replace: true }),
      title: "Edit Policy Rule",
    },
    {
      action: () => setDeleteDialogOpen(true),
      title: "Delete Policy Rule",
    },
  ];

  const handleDeleteConfirm = async () => {
    deleteOne(record.__typename, {
      id: record.id,
      previousData: record,
    });
  };

  return (
    <>
      <DeviiRowMenu options={options} />
      <Confirm
        isOpen={isDeleteDialogOpen}
        loading={isDeleteLoading}
        title={`Delete Policy Rule`}
        content={`Are you sure you want to delete this Policy Rule?`}
        confirm="Delete"
        ConfirmIcon={DeleteIcon}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default PolicyRuleListRowMenu;
