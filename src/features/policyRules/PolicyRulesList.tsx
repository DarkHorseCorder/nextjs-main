import React from "react";
import {
  ListContextProvider,
  useList,
  useGetList,
  Datagrid,
  List,
  TextField,
  FunctionField,
} from "react-admin";
import {
  DeviiRoundBox,
  DeviiProgress,
  DeviiListActions,
} from "components/base";
import { Typography } from "@mui/material";
import { PolicyTags } from "components/policyRules";
import PolicyRuleListRowMenu from "./PolicyRuleListRowMenu";

const PolicyRulesList = () => {
  const { data, isLoading } = useGetList("policy_rule");
  const listContext = useList({ data, isLoading });
  return (
    <ListContextProvider value={listContext}>
      {!isLoading ? (
        <DeviiRoundBox sx={{ p: 4 }}>
          <Typography variant="h5" color="primary">
            Policy Rules
          </Typography>
          <List
            actions={
              <DeviiListActions
                refresh={false}
                export={false}
                title="Policy Rule"
                filters={{
                  main: "name",
                }}
              />
            }
            resource="policy_rule"
          >
            <Datagrid
              optimized
              bulkActionButtons={false}
              sx={{
                "& .RaDatagrid-thead": {
                  display: "none",
                },
              }}
            >
              <TextField
                source="name"
                label="Name"
                sx={{ whiteSpace: "nowrap" }}
              />
              <FunctionField
                label=""
                render={(record: any) => {
                  return <PolicyTags record={record} />;
                }}
              />
              <PolicyRuleListRowMenu />
            </Datagrid>
          </List>
        </DeviiRoundBox>
      ) : (
        <DeviiProgress />
      )}
    </ListContextProvider>
  );
};

export default PolicyRulesList;
