/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useGetList } from "react-admin";
import { Grid } from "@mui/material";
import { AddDatabase, DatabaseCard } from "components/projectDetails";
import { DeviiProgress } from "components/base";

const ProjectDetails = () => {
  const { data, total, isLoading, error } = useGetList("database", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "published_at", order: "DESC" },
  });

  if (isLoading) {
    return <DeviiProgress />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ pt: 1.5, justifyContent: { xs: "center", sm: "flex-start" } }}
    >
      {data?.map((database: any) => (
        <DatabaseCard database={database} key={database.id} />
      ))}
      <Grid key="create_database" item sx={{ width: "270px", height: "270px" }}>
        <AddDatabase />
      </Grid>
    </Grid>
  );
};

export default ProjectDetails;
