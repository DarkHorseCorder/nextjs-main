import { DeviiProgress } from "components/base";
import React from "react";
import { useGetOne } from "react-admin";
import { Grid } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import { DatabaseCard } from "components/projectDetails";

const DatabasePage = () => {
  const location = useLocation();
  const databaseId = matchPath("project/database/:id", location.pathname)
    ?.params.id;
  const { data, isLoading } = useGetOne("database", { id: databaseId });
  if (isLoading) {
    return <DeviiProgress />;
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{ pt: 1.5, justifyContent: { xs: "center", sm: "flex-start" } }}
    >
      <DatabaseCard database={data} doubleClick={false} />
    </Grid>
  );
};

export default DatabasePage;
