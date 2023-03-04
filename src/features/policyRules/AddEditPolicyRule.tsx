import React, { useMemo } from "react";
import { DeviiProgress, DeviiRoundBox } from "components/base";
import {
  Create,
  Edit,
  useCreate,
  useNotify,
  useRedirect,
  useRefresh,
  useUpdate,
} from "react-admin";
import { useLocation, matchPath } from "react-router-dom";
import { Typography } from "@mui/material";
import { getStorageItem } from "utils/auth";
import { SCHEMA } from "../../constants";
import { messageHandler } from "utils";
import PolicyRuleForm from "components/policyRules/PolicyRuleForm";
import { menuItems } from "layout/DeviiMenu/menuItems";
import routes from "routes";

const databaseTables = () => {
  const query = JSON.parse(getStorageItem(SCHEMA));
  if (!query) return [];
  const tables = query?.types
    .filter((type: any) => type.name === "Query")[0]
    .fields.filter((field: any) => field.type.kind === "LIST")
    .map((field: { name: string }) => ({
      id: field.name,
      name: field.name,
    }));
  return tables;
};

export const AddPolicyRule = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const location = useLocation();
  const onCancel = () => {
    redirect(
      menuItems(location.pathname).filter(({ name }) => name === "Policy")[0]
        .link
    );
  };
  const [create, { isLoading: isCreateLoading }] = useCreate(
    undefined,
    undefined,
    {
      onError: () =>
        messageHandler(notify, "Failed to create policy rule", "error"),
      onSuccess: () => {
        refresh();
        messageHandler(notify, "Successfully created", "success", onCancel);
      },
    }
  );

  return (
    <DeviiRoundBox sx={{ p: 4 }}>
      <Typography color="primary" component="h5" variant="h5" align="left">
        Add Policy Rule
      </Typography>
      <Create resource="policy_rule">
        <PolicyRuleForm
          action={create}
          isLoading={isCreateLoading}
          onCancel={onCancel}
          databaseTables={databaseTables()}
        />
      </Create>
      {isCreateLoading && <DeviiProgress />}
    </DeviiRoundBox>
  );
};

export const EditPolicyRule = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const location = useLocation();
  const onCancel = () => {
    redirect(
      menuItems(location.pathname).filter(({ name }) => name === "Policy")[0]
        .link
    );
  };
  const id = useMemo(() => {
    return matchPath(
      routes.filter(({ name }) => name === "Edit Policy Rule")[0].path,
      location.pathname
    )?.params.id;
  }, [location.pathname]);
  const [update, { isLoading: isUpdateLoading }] = useUpdate(
    undefined,
    undefined,
    {
      onError: () =>
        messageHandler(notify, "Failed to update policy rule", "error"),
      onSuccess: () => {
        refresh();
        messageHandler(notify, "Successfully updated", "success", onCancel);
      },
    }
  );

  return (
    <DeviiRoundBox sx={{ p: 4 }}>
      <Typography color="primary" component="h5" variant="h5" align="left">
        Edit Policy Rule
      </Typography>
      <Edit resource="policy_rule" id={id}>
        <PolicyRuleForm
          action={update}
          isLoading={isUpdateLoading}
          onCancel={onCancel}
          databaseTables={databaseTables()}
        />
      </Edit>
      {isUpdateLoading && <DeviiProgress />}
    </DeviiRoundBox>
  );
};
